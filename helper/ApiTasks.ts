/**
 * This file contains variables, data and headers used for API tests
 */

import { expect, request } from '@playwright/test';
import { BASE_URL, contentTypeHeaders, generateCookieHeaders } from '../data/apiConstants';
import Ajv from 'ajv';
import { AuthTokenSchema, CreatedBookingShema, NewBookingShema } from '../data/jsonSchemas';
import { Helper } from './Helper';
import { authPayload } from '../data/apiPayloads';
const ajv = new Ajv();

let response, jsonResponse, URL, payload;

export class ApiTasks extends Helper {
  /**
   * Method validates if JSON response meets defined schema
   * @param response - JSON response provided by api request
   * @param schema - Defined schema
   */
  async validateJsonSchema(response: object, schema: object) {
    const valid = ajv.validate(schema, response);

    // Output the errors text
    if (!valid) {
      console.error('AJV Validation Errors:', ajv.errorsText());
    }
    // If the JSON is valid, the variable is "true"
    expect(valid).toBe(true);
  }

  //Method prints json response and checks if response fulfills set criteria
  async validateResponse() {
    jsonResponse = await response.json();
    console.log(jsonResponse);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  }

  /**
   * Method generates user auth token based on provided username and password
   * @param username - user's username
   * @param password - user's password
   * @returns - returns auth token
   */
  async generateAuthToken(username: string, password: string) {
    URL = `${BASE_URL}/auth`;
    payload = await authPayload(username, password);
    response = await (await request.newContext()).post(URL, { data: payload, headers: contentTypeHeaders });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, AuthTokenSchema);

    return jsonResponse.token;
  }

  /**
   * Method validates response when username or/and password are incorrect
   * @param username - user's username
   * @param password - user's password
   */
  async validateBadCredentials(username: string, password: string) {
    URL = `${BASE_URL}/auth`;
    payload = await authPayload(username, password);
    response = await (await request.newContext()).post(URL, { data: payload, headers: contentTypeHeaders });
    jsonResponse = await response.json();
    console.log(jsonResponse);
    expect(jsonResponse.reason).toEqual('Bad credentials');
  }

  /**
   * Method validates response when username or/and password are incorrect
   * @param payload - booking payload with all details
   * @param token - auth token
   */
  async createNewBooking(payload: object, token: string) {
    URL = `${BASE_URL}/booking`;
    response = await (await request.newContext()).post(URL, { data: payload, headers: await generateCookieHeaders(token) });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, NewBookingShema);

    return jsonResponse.bookingid;
  }

  /**
   * Method gets booking details by provided bookingId
   * @param bookingId - Desired BookingID
   * @param token - auth token
   * @returns - booking details: firstName and lastName
   */
  async getBookingById(bookingId: number, token: string) {
    URL = `${BASE_URL}/booking/${bookingId}`;
    response = await (await request.newContext()).get(URL, { headers: await generateCookieHeaders(token) });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, CreatedBookingShema);

    return {
      firstName: jsonResponse.firstname,
      lastName: jsonResponse.lastname,
    };
  }

  /**
   * Method for updating booking details
   * @param bookingId - ID of booking
   * @param payload - desired updates
   * @returns - booking updated details: firstName, lastName and totalPrice
   */
  async updateBooking(bookingId: object, payload: object, token: string) {
    URL = `${BASE_URL}/booking/${bookingId}`;
    response = await (await request.newContext()).put(URL, { data: payload, headers: await generateCookieHeaders(token) });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, CreatedBookingShema);

    return {
      firstName: jsonResponse.firstname,
      lastName: jsonResponse.lastname,
      totalPrice: jsonResponse.totalprice,
    };
  }

  /**
   * Method for patching/updating booking details
   * @param bookingId - ID of booking
   * @param payload - desired updates
   * @param token - auth token
   * @returns - booking updated details: firstName and lastName
   */
  async patchBooking(bookingId: object, payload: object, token: string) {
    URL = `${BASE_URL}/booking/${bookingId}`;
    response = await (
      await request.newContext()
    ).patch(URL, {
      data: payload,
      headers: await generateCookieHeaders(token),
    });
    await this.validateResponse();
    await this.validateJsonSchema(jsonResponse, CreatedBookingShema);

    return {
      firstName: jsonResponse.firstname,
      lastName: jsonResponse.lastname,
    };
  }

  /**
   * Method deletes pet by provided PetId
   * @param petId - Desired PetId
   */
  async deleteBookingById(bookingId: number, token: string) {
    URL = `${BASE_URL}/booking/${bookingId}`;
    response = await (await request.newContext()).delete(URL, { headers: await generateCookieHeaders(token) });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    console.log('Booking successfully deleted!');
  }
}
