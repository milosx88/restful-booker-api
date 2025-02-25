/**
 * This file includes some useful methods to generate testing data
 */

import { faker } from '@faker-js/faker';
import { animals, names, uniqueNamesGenerator } from 'unique-names-generator';

export class Helper {
  /**
   * Method generates number between provided min and max numbers
   * @param min - provided min
   * @param max - provided max
   * @returns - number within range
   */
  async getRandomNumberInRange(min: number, max: number): Promise<number> {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
  }

  /* Method generates date in past based on provided month and day in a month
   * @param months - months before current month (1 means next month, 0 means the current month)
   * @param day - day in a month
   * @returns
   */
  async generateDateInFuture(months: number, day: number) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    date.setDate(day);
    return date.toISOString().split('T')[0];
  }

  /**
   * Method generates random name
   * @returns - generated name
   */
  async generateFirstAndLastName() {
    return uniqueNamesGenerator({
      dictionaries: [names],
    });
  }

  /**
   * Method generates random animal
   * @returns - generated animal
   */
  async generateRandomAnimal() {
    return uniqueNamesGenerator({
      dictionaries: [animals],
    });
  }
}
