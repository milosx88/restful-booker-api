/**
 * I created one test which includes all CRUD operations in order to create full flow from create to delete phase
 * Note that the whole flow can be splitted into smaller tests (test for each CRUD operation) with a little effort, if needed
 */

import { expect, test } from '@playwright/test';
import { USER_CREDS } from '../../data/apiConstants';
import { ApiTasks } from '../../helper/ApiTasks';
import { bookingPayload } from '../../data/apiPayloads';

let apiTasks: ApiTasks;
let authToken, bookingId, bookingResponse;

test.describe('Pet CRUD operations', () => {
  test.beforeAll('Generate auth token', async () => {
    apiTasks = new ApiTasks();

    //POST Request for generation auth token based on provided username and password
    authToken = await apiTasks.generateAuthToken(USER_CREDS.USERNAME, USER_CREDS.PASSWORD);
  });

  test('Validates incorrect username or/and password', async () => {
    await apiTasks.validateBadCredentials(USER_CREDS.WRONG_USERNAME, USER_CREDS.WRONG_PASSWORD);
  });

  test('Booking CRUD operations', async () => {
    //generage bookingPayload
    let bookingDetails = await bookingPayload(
      await apiTasks.generateFirstAndLastName(), //firstName
      await apiTasks.generateFirstAndLastName(), //lastName
      await apiTasks.getRandomNumberInRange(100, 1000), //totalPrice
      true, //depositpaid
      await apiTasks.generateDateInFuture(1, 1), //checkin
      await apiTasks.generateDateInFuture(1, 10), //checkout
      `A house for my ${await apiTasks.generateRandomAnimal()}`, //additionalneeds
    );

    //POST request for creating new booking
    console.log('------- Create New Booking response -------');
    bookingId = await apiTasks.createNewBooking(bookingDetails, authToken);

    //GET request for getting booking details by provided previously created bookingId
    console.log('------- Getting Booking Details response and validation -------');
    bookingResponse = await apiTasks.getBookingById(bookingId, authToken);
    //Additional validation of fetched data, just as an example
    expect(bookingResponse.firstName).toEqual(bookingDetails.firstname);
    expect(bookingResponse.lastName).toEqual(bookingDetails.lastname);

    //PUT request for updating booking details by provided previously created and edited payload
    console.log('------- Updating Booking Details response and validation -------');
    //Let's edit some details and update the created booking...
    bookingDetails.firstname = `${bookingDetails.firstname}_updated`;
    bookingDetails.lastname = `${bookingDetails.lastname}_updated`;
    bookingDetails.totalprice = bookingDetails.totalprice + 100;

    bookingResponse = await apiTasks.updateBooking(bookingId, bookingDetails, authToken);
    //Additional validation of fetched data, for updated details
    expect(bookingResponse.firstName).toEqual(bookingDetails.firstname);
    expect(bookingResponse.lastName).toEqual(bookingDetails.lastname);
    expect(bookingResponse.totalPrice).toEqual(bookingDetails.totalprice);

    //PATCH request for updating specified booking details (first and last name)
    console.log('------- Patching Booking Details response and validation -------');
    const newFirstLastName = {
      firstname: await apiTasks.generateFirstAndLastName(),
      lastname: await apiTasks.generateFirstAndLastName(),
    };
    bookingResponse = await apiTasks.patchBooking(bookingId, newFirstLastName, authToken);
    expect(bookingResponse.firstName).toEqual(newFirstLastName.firstname);
    expect(bookingResponse.lastName).toEqual(newFirstLastName.lastname);

    //DELETE request for removing previously created booking
    console.log('------- Deleting created booking -------');
    await apiTasks.deleteBookingById(bookingId, authToken);
    await apiTasks.validateBookingDeletion(bookingId, authToken);
  });
});
