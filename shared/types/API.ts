 /**
 * Represents a generic API response.
 */
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  /**
   * Represents an error response from the API.
   */
  export interface ErrorResponse {
    message: string;
    code: number;
  }
  
  /**
   * Represents pagination parameters for API requests.
   */
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  /**
   * Represents a paginated API response.
   */
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }
  