import fs from "fs";
import { parse } from "csv-parse/sync";

// Declare Live Data Pathways
const LIVE_TRIP_DATA = "trip_updates.json";
const LIVE_VEHICLE_DATA = "vehicle_positions.json";

/** Loads static data from CSV files.
 *
 * @return {Promise<Object>} An object containing the parsed data from various CSV files.
 *
 * @example
 *     loadStaticData().then(data => console.log(data));
 */
export async function fetchStaticData() {
  /** Loads CSV data from a specified file.
   *
   * @param {string} fileName - The name of the CSV file to load.
   * @return {Array<Object>} Parsed data from the CSV file.
   *
   * @example
   *    loadCSVData("routes.txt");
   */
  function loadCSVData(fileName) {
    const data = fs.readFileSync(`./static-data/${fileName}`);
    return parse(data, { columns: true });
  }

  return {
    routes: loadCSVData("routes.txt"),
    trips: loadCSVData("trips.txt"),
    calendar: loadCSVData("calendar.txt"),
    calendar_dates: loadCSVData("calendar_dates.txt"),
    stops: loadCSVData("stops.txt"),
    stop_times: loadCSVData("stop_times.txt"),
  };
}

/** Loads live data by fetching it from predefined URLs.
 *
 * @return {Promise<Object>} An object containing the fetched live data.
 *
 * @example
 *
 *     loadLiveData().then(data => console.log(data));
 */
export async function fetchLiveData() {
  /** Fetches live data from a specified URL.
   *
   * @param {string} url_path - The path to the URL to fetch data from.
   * @return {Promise<Object|null>} The fetched data or null if there was an error.
   *
   * @example
   *     fetchLiveData("trip_updates.json");
   */
  async function fetchLiveData(url_path) {
    try {
      const response = await fetch(
        `http://127.0.0.1:5343/gtfs/seq/${url_path}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  }

  return {
    timestamp: new Date(Date.now() + 5 * 60000).toISOString(),
    vehicles: await fetchLiveData(LIVE_VEHICLE_DATA),
    trips: await fetchLiveData(LIVE_TRIP_DATA),
  };
}
