/** Retrieves route information given route-short-name.
 *
 * @param {Object} file - The object containing all relevant data files (routes, trips, stops, etc.).
 * @param {string} route - The route number to retrieve details for.
 * @return {Object} An object containing the stop locations for the trips on the route.
 */
export function getRouteDetails(file, route) {
  const routeInformation = file.routes.find(
    (dbEntry) => dbEntry.route_short_name === route
  );

  const routeTrips = file.trips.filter(
    (dbEntry) => dbEntry.route_id === routeInformation.route_id
  );

  const [inboundTrip, outboundTrip] = [
    routeTrips.find((dbEntry) => dbEntry.direction_id === "0"),
    routeTrips.find((dbEntry) => dbEntry.direction_id === "1"),
  ];

  const inboundStopTimes = inboundTrip
    ? file.stop_times.filter(
        (dbEntry) => dbEntry.trip_id === inboundTrip.trip_id
      )
    : [];

  const outboundStopTimes = outboundTrip
    ? file.stop_times.filter(
        (dbEntry) => dbEntry.trip_id === outboundTrip.trip_id
      )
    : [];

  const allRouteStops = [...inboundStopTimes, ...outboundStopTimes];

  const tripStopLocations = allRouteStops.map((dbEntry, index) => [
    index + 1,
    file.stops.find((stopDbEntry) => stopDbEntry.stop_id === dbEntry.stop_id)
      .stop_name,
  ]);

  return {
    route_information: routeInformation,
    route_trips: routeTrips,
    route_stop_locations: tripStopLocations,
  };
}

/** Gets viable trips for a specific route, start stop, date, and time, 
 * and checks if they're arriving in the next 10 minutes.
 *
 * @param {Object} staticData - The static data including routes, trips, stops, etc.
 * @param {string} route - The route number selected by the user.
 * @param {string} startStop - The start stop selected by the user.
 * @param {string} date - The selected date.
 * @param {string} time - The selected time.
 * @return {Array<Object>} An array of viable trips arriving in the next 10 minutes.
 */
export function getViableTrips(staticData, route, startStop, date, time) {
  const trips = [];
  const current_date = new Date(Date.now());

  // Get route info
  const route_information = staticData.routes.find((dbEntry) => dbEntry.route_short_name === route);

  // Get route trips
  const all_route_trips = staticData.trips.filter((dbEntry) => dbEntry.route_id === route_information.route_id);
  console.log(all_route_trips);

// Filter all_route_trips to get only those that have a matching service_id in staticData.calendar
const all_route_trips_on_date = all_route_trips.filter(trip => staticData.calendar_dates.any(calendarEntry => calendarEntry.service_id === trip.service_id));
  console.log(all_route_trips_on_date);
  

  trips.push({
    "Route Short Name": route_information.route_short_name,
    "Route Long Name": route_information.route_long_name,
    "Service ID": null,
    "Heading Sign": null,
    "Scheduled Arrival Time": null,
    "Live Arrival Time": null,
    "Live Position": null,
    "Estimated Travel Time": null
  });

  return trips;
}