 /**
 * Represents a user in the system.
 */
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  /**
   * Represents the progress of a user in the system.
   */
  export interface UserProgress {
    userId: string;
    completedCards: string[];
    completedEbooks: string[];
    quizScores: Record<string, number>;
    lastActive: Date;
  }
  
  /**
   * Represents the authentication data for a user.
   */
  export interface AuthData {
    token: string;
    user: User;
  }
  