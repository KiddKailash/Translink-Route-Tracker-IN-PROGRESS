import promptSync from "prompt-sync";
const prompt = promptSync();

/**Prompts the user for input until a valid input is given.
 *
 * @param {string} message - The prompt message to display to the user.
 * @param {Object} validationObject - An object containing data for validation.
 * @param {Function} validatorFunction - A function to validate the user's input.
 * @return {string} The valid user input.
 */
export const promptUserInput = (message, validationObject, validatorFunction) =>
  (function getValidInput() {
    const userInput = prompt(message);
    return validatorFunction(validationObject, userInput)
      ? userInput
      : getValidInput();
  })();

/** Validates if a given bus route exists in the list of all routes.
 *
 * @param {Array} all_routes - An array of route objects.
 * @param {string} route_number - The bus route number to validate.
 * @return {boolean} True if the route is valid, false otherwise.
 */
export const validateBusRoute = (all_routes, route_number) =>
  all_routes.some((route) => route.route_short_name === route_number) ||
  (console.log("Please enter a valid bus route."), false);

/** Validates that the user input is in the format 'int - int' and that both integers exist as stop indices.
 *
 * @param {Array} trip_stops - An array of trip stop indices.
 * @param {string} user_input - The user input string to validate.
 * @return {boolean} True if the input is valid, false otherwise.
 */
export const validateStartStop = (trip_stops, user_input) =>
  (/^\d+\s*-\s*\d+$/.test(user_input) &&
    user_input
      .split("-")
      .map((num) => parseInt(num.trim(), 10))
      .every((stop) =>
        trip_stops.some((trip_stop) => trip_stop[0] === stop)
      )) ||
  (console.log("Please follow the format and enter valid stop numbers."),
  false);

/** Validates that the user input is in the format 'YYYY-MM-DD' and represents a valid date.
 *
 * @param {string} date - The date string to validate.
 * @return {boolean} True if the date is valid and in the correct format, false otherwise.
 */
export function validateDate(ignore, date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isValidFormat = regex.test(date);

  if (!isValidFormat) {
    console.log("Incorrect date format. Please use YYYY-MM-DD");
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day));

  const isRealDate =
    dateObject.getUTCFullYear() === year &&
    dateObject.getUTCMonth() + 1 === month &&
    dateObject.getUTCDate() === day;

  if (!isRealDate) {
    console.log(
      "Invalid date. Please enter a real date in 'YYYY-MM-DD' format."
    );
    return false;
  }

  return true;
}

/** Validates that the user input is in the format 'HH:mm'.
 *
 * @param {string} time - The time string to validate.
 * @return {boolean} True if the time is valid and in the correct format, false otherwise.
 */
export function validateTime(ignore, time) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const isValidFormat = regex.test(time);

  if (!isValidFormat) {
    console.log("Incorrect time format. Please use HH:mm");
    return false;
  }

  const [hour, minute] = time.split(":").map(Number);
  const timeObject = new Date(Date.UTC(1970, 0, 1, hour, minute));

  const isRealTime =
    timeObject.getUTCHours() === hour && timeObject.getUTCMinutes() === minute;

  if (!isRealTime) {
    console.log("Invalid time. Please enter a real time in 'HH:mm' format.");
    return false;
  }

  return true;
}

/** Validates if the user wants to search again based on their input.
 *
 * @param {string} user_input - The user input to validate ('y' or 'n').
 * @return {boolean} True if the input is valid, false otherwise.
 */
export const validateSearchAgain = (ignore, user_input) =>
  ["y", "n"].includes(user_input.toLowerCase()) ||
  (console.log("Please enter a valid option (y/n)."), false);
