/**
 * This file contains schemas for verifying API responses
 */

export const AuthTokenSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  },
  required: ['token'],
};

export const NewBookingShema = {
  type: 'object',
  properties: {
    bookingid: {
      type: 'integer',
    },
    booking: {
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
        },
        lastname: {
          type: 'string',
        },
        totalprice: {
          type: 'integer',
        },
        depositpaid: {
          type: 'boolean',
        },
        bookingdates: {
          type: 'object',
          properties: {
            checkin: {
              type: 'string',
            },
            checkout: {
              type: 'string',
            },
          },
          required: ['checkin', 'checkout'],
        },
        additionalneeds: {
          type: 'string',
        },
      },
      required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates', 'additionalneeds'],
    },
  },
  required: ['bookingid', 'booking'],
};

export const CreatedBookingShema = {
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
    },
    lastname: {
      type: 'string',
    },
    totalprice: {
      type: 'integer',
    },
    depositpaid: {
      type: 'boolean',
    },
    bookingdates: {
      type: 'object',
      properties: {
        checkin: {
          type: 'string',
        },
        checkout: {
          type: 'string',
        },
      },
      required: ['checkin', 'checkout'],
    },
    additionalneeds: {
      type: 'string',
    },
  },
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates', 'additionalneeds'],
};
