/**
 * This file contains variables, data and headers used for API tests
 */

export const BASE_URL = 'http://localhost:3001';

export const USER_CREDS = {
  USERNAME: 'admin',
  PASSWORD: 'password123',
  WRONG_USERNAME: 'wrong_user',
  WRONG_PASSWORD: 'wrong_password',
};

export const contentTypeHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function generateCookieHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Cookie: `token=${token}`,
  };
}
