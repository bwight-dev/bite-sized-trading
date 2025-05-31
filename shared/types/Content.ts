 /**
 * Represents a content card in the system.
 */
export interface Card {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Represents an ebook in the system.
   */
  export interface Ebook {
    id: string;
    title: string;
    content: string;
    status: EbookStatus;
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Enum representing the status of an ebook.
   */
  export enum EbookStatus {
    Draft = 'Draft',
    Published = 'Published',
    Archived = 'Archived',
  }
  
  /**
   * Represents a quiz question in the system.
   */
  export interface Question {
    id: string;
    question: string;
    options: string[];
    correctOption: number;
  }
  
  /**
   * Represents a quiz in the system.
   */
  export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
    createdAt: Date;
    updatedAt: Date;
  }
  