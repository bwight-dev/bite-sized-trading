import { User } from '@prisma/client';

declare module 'express' {
  export interface Request {
    user?: { id: string; }; // Define the structure of the user object added by middleware
  }
}
