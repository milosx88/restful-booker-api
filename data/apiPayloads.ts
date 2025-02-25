/**
 * This file contains functions for generating payloads used for API tests
 */

export async function authPayload(username: string, password: string) {
  return {
    username: username,
    password: password,
  };
}

export async function bookingPayload(
  firstName: string,
  lastName: string,
  totalPrice: number,
  depositpaid: boolean,
  checkin: string,
  checkout: string,
  additionalneeds: string,
) {
  return {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalPrice,
    depositpaid: depositpaid,
    bookingdates: {
      checkin: checkin,
      checkout: checkout,
    },
    additionalneeds: additionalneeds,
  };
}
