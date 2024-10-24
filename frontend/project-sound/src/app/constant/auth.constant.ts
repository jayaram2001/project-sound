/**
 * Interface representing the data required for a sign-in request.
 */
export interface Signin {
    /**
     * The email of the user attempting to sign in.
     * @type {string}
     */
    email: string;
  
    /**
     * The password of the user attempting to sign in.
     * @type {string}
     */
    password: string;
  }

  /**
 * URL for the sign-in API endpoint.
 * @type {string}
 */
export const SIGNIN_API_URL = 'auth/signin';

/**
 * Interface representing the structure of an API response.
 * @template T - The type of the response data.
 */
export interface ApiResponse<T> {
    /**
     * The actual response data.
     * @type {T}
     */
    response: T;
  
    /**
     * A message accompanying the response, typically used for conveying additional information or errors.
     * @type {string}
     */
    message: string;
  
    /**
     * The status code of the response, typically used for identifying the result of the request.
     * @type {string}
     */
    statusCode: string;
  
    /**
     * A boolean indicating whether the request was successful.
     * @type {boolean}
     */
    success: boolean;
  }

/**
 * Interface representing the token data received after authentication.
 */
export interface TokenData {
    /**
     * The authentication token provided to the user.
     * @type {string}
     */
    token?: string;
  }