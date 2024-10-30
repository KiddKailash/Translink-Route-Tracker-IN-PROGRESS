import promptSync from "prompt-sync";
import { getRouteDetails, getViableTrips } from "./data-joins.js";
import { fetchStaticData, fetchLiveData } from "./data-loading.js";
import {
  promptUserInput,
  validateStartStop,
  validateDate,
  validateTime,
  validateSearchAgain,
  validateBusRoute,
} from "./validation-functions.js";
import { stat } from "fs";

// Initialize Prompt Sync
const prompt = promptSync();

// Load Static Data
const staticData = await fetchStaticData();
console.log("Static Data Loaded.");

// Load Live Data
let liveData = await fetchLiveData();
console.log("Live Data Loaded.");

// Welcome message
console.log("\nWelcome to the South East Queensland Route Planner!");

/** Handles the user interface and interactions.
 *
 * @return {boolean} - Returns true if the user wants to search again, false otherwise.
 */
const handleUserInterface = () => {
  const selectedRoute = promptUserInput(
    "What Bus Route would you like to take? ",
    staticData.routes,
    validateBusRoute
  );

  const routeDetails = getRouteDetails(staticData, selectedRoute);
  routeDetails.route_stop_locations.forEach((stop) =>
    console.log(`${stop[0]}. ${stop[1]}`)
  );

  const startStop = promptUserInput(
    "What is your start and end stop on the route? ",
    routeDetails.route_stop_locations,
    validateStartStop
  ).split(" - ");

  const selectedDate = promptUserInput(
    "What date will you take the route? ",
    null,
    validateDate
  );

  const selectedTime = promptUserInput(
    "What time will you leave? ",
    null,
    validateTime
  );

  const viableTrips = getViableTrips(
    staticData,
    selectedRoute,
    startStop,
    selectedDate,
    selectedTime
  );

  console.table(viableTrips, [
    "Route Short Name",
    "Route Long Name",
    "Service ID",
    "Heading Sign",
    "Scheduled Arrival Time",
    "Live Arrival Time",
    "Live Position",
    "Estimated Travel Time",
  ]);

  const searchAgain = promptUserInput(
    "Would you like to search again? (y/n) ",
    null,
    validateSearchAgain
  );

  return searchAgain === "y";
};

/**
 * Runs the main program loop.
 */
const startProgram = () => {
  // Check whether Live Data must be reloaded.
  const refreshLiveDataIfStale = (timestamp, fetchData) =>
    new Date(timestamp) < new Date() ? fetchData() : liveData;

  liveData = refreshLiveDataIfStale(liveData.timestamp, fetchLiveData);

  if (handleUserInterface()) {
    startProgram(); // Recursively call the function if user wants to search again
  } else {
    console.log("Thanks for using the Route tracker!");
    process.exit(); // Exit the program when the user inputs 'n'
  }
};

// Start the program
startProgram();