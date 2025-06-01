import OpenAI from 'openai';
import { openaiConfig, OPENAI_MODEL, MAX_RETRIES, RETRY_DELAY } from '../config/openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const openai = new OpenAI(openaiConfig);

interface GeneratedCard {
  title: string;
  content: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

const CARD_GENERATION_PROMPT = `You are an expert educator creating learning cards from text content. 
Generate a learning card with the following structure:
{
  "title": "Concise title summarizing the key concept",
  "content": "Clear explanation of the concept",
  "question": "Multiple choice question testing understanding",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "category": "One of: CONCEPT, DEFINITION, EXAMPLE, APPLICATION",
  "difficulty": "One of: BEGINNER, INTERMEDIATE, ADVANCED"
}

Guidelines:
- Content should be clear and concise
- Question should test understanding, not just recall
- Options should be plausible and well-distinguished
- Category should reflect the type of knowledge
- Difficulty should match the complexity of the concept

Generate the card in valid JSON format.`;

export class AIService {
  private static async validateGeneratedContent(card: GeneratedCard): Promise<boolean> {
    if (!card.title || !card.content || !card.question || !card.options || !card.category || !card.difficulty) {
      return false;
    }

    if (card.options.length !== 4) {
      return false;
    }

    if (card.correctAnswer < 0 || card.correctAnswer > 3) {
      return false;
    }

    const validCategories = ['CONCEPT', 'DEFINITION', 'EXAMPLE', 'APPLICATION'];
    const validDifficulties = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

    if (!validCategories.includes(card.category)) {
      return false;
    }

    if (!validDifficulties.includes(card.difficulty)) {
      return false;
    }

    return true;
  }

  private static async retryFailedGeneration(
    text: string,
    attempt: number = 1
  ): Promise<GeneratedCard | null> {
    if (attempt > MAX_RETRIES) {
      return null;
    }

    try {
      const card = await this.generateCardFromText(text);
      if (card && await this.validateGeneratedContent(card)) {
        return card;
      }
    } catch (error) {
      console.error(`Generation attempt ${attempt} failed:`, error);
    }

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
    return this.retryFailedGeneration(text, attempt + 1);
  }

  static async generateCardFromText(text: string): Promise<GeneratedCard | null> {
    try {
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: CARD_GENERATION_PROMPT },
          { role: 'user', content: text }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const card = JSON.parse(response) as GeneratedCard;
      
      if (await this.validateGeneratedContent(card)) {
        return card;
      }

      return this.retryFailedGeneration(text);
    } catch (error) {
      console.error('Error generating card:', error);
      return this.retryFailedGeneration(text);
    }
  }

  static async generateCardsFromEbook(ebookId: string): Promise<void> {
    try {
      const ebook = await prisma.ebook.findUnique({
        where: { id: ebookId },
        select: { extractedText: true }
      });

      if (!ebook?.extractedText) {
        throw new Error('No extracted text found for ebook');
      }

      // Split text into chunks (reuse the chunking logic from PDFService)
      const chunks = ebook.extractedText.split(/\n\n+/).filter(chunk => chunk.trim().length > 0);

      for (const chunk of chunks) {
        const card = await this.generateCardFromText(chunk);
        if (card) {
          await prisma.card.create({
            data: {
              ...card,
              ebookId
            }
          });
        }
      }
    } catch (error) {
      console.error('Error generating cards from ebook:', error);
      throw error;
    }
  }
} 