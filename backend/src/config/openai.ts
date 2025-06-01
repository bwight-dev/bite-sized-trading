import { Configuration } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

export const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const OPENAI_MODEL = 'gpt-4-turbo-preview';

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 second

export const RATE_LIMIT = {
  requestsPerMinute: 3,
  tokensPerMinute: 40000,
}; 