import pdfParse from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PDFMetadata {
  pageCount: number;
  info: {
    Title?: string;
    Author?: string;
    CreationDate?: string;
  };
}

export class PDFService {
  private static readonly CHUNK_SIZE = 800; // Target words per chunk
  private static readonly MIN_TEXT_LENGTH = 100; // Minimum text length for validation
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  static async extractTextFromPDF(filePath: string): Promise<{ text: string; metadata: PDFMetadata }> {
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error('PDF file not found');
      }

      // Check file size
      const stats = fs.statSync(filePath);
      if (stats.size > this.MAX_FILE_SIZE) {
        throw new Error('PDF file size exceeds maximum limit of 10MB');
      }

      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      
      // Validate extracted data
      if (!data.text || typeof data.text !== 'string') {
        throw new Error('Failed to extract text from PDF');
      }

      if (!data.numpages || data.numpages < 1) {
        throw new Error('Invalid PDF: No pages found');
      }
      
      return {
        text: data.text,
        metadata: {
          pageCount: data.numpages,
          info: {
            Title: data.info.Title,
            Author: data.info.Author,
            CreationDate: data.info.CreationDate
          }
        }
      };
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to extract text from PDF');
    }
  }

  static validatePDFContent(text: string): boolean {
    // Basic validation - ensure we have meaningful content
    const trimmedText = text.trim();
    if (trimmedText.length < this.MIN_TEXT_LENGTH) {
      throw new Error('PDF appears to be empty or contains insufficient text');
    }

    // Check for common PDF extraction issues
    if (trimmedText.includes('') || trimmedText.includes('')) {
      throw new Error('PDF contains invalid characters, may be corrupted or password protected');
    }

    return true;
  }

  static chunkTextContent(text: string): string[] {
    // Clean the text
    const cleanedText = text
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .replace(/\n+/g, ' ')  // Replace newlines with space
      .replace(/[^\S\r\n]+/g, ' ') // Replace all whitespace with single space
      .trim();

    // Split into sentences (basic implementation)
    const sentences = cleanedText.match(/[^.!?]+[.!?]+/g) || [];
    
    const chunks: string[] = [];
    let currentChunk: string[] = [];
    let currentWordCount = 0;

    for (const sentence of sentences) {
      const sentenceWordCount = sentence.split(/\s+/).length;
      
      if (currentWordCount + sentenceWordCount > this.CHUNK_SIZE && currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [];
        currentWordCount = 0;
      }
      
      currentChunk.push(sentence);
      currentWordCount += sentenceWordCount;
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
    }

    return chunks;
  }

  static async processPDF(ebookId: string): Promise<void> {
    try {
      // Get ebook from database
      const ebook = await prisma.ebook.findUnique({
        where: { id: ebookId }
      });

      if (!ebook) {
        throw new Error('Ebook not found');
      }

      // Update status to PROCESSING
      await prisma.ebook.update({
        where: { id: ebookId },
        data: { 
          status: 'PROCESSING',
          error: null // Clear any previous errors
        }
      });

      const filePath = path.join(process.cwd(), 'uploads', ebook.filename);
      
      // Extract text and metadata
      const { text, metadata } = await this.extractTextFromPDF(filePath);
      
      // Validate content
      this.validatePDFContent(text);
      
      // Chunk the text
      const chunks = this.chunkTextContent(text);

      // Update ebook with extracted text and metadata
      await prisma.ebook.update({
        where: { id: ebookId },
        data: {
          status: 'COMPLETED',
          extractedText: text,
          metadata: metadata as any // Type assertion needed due to Prisma's JSON type
        }
      });

    } catch (error) {
      console.error('Error processing PDF:', error);
      
      // Update ebook status to ERROR
      await prisma.ebook.update({
        where: { id: ebookId },
        data: { 
          status: 'ERROR',
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });

      throw error;
    }
  }
} 