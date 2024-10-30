# South East Queensland Route Planner

## Overview
The South East Queensland Route Planner is a command-line application that allows users to plan their bus routes efficiently using both static GTFS data and live vehicle/trip updates. Users can search for bus routes, view stop details, and get real-time trip predictions, improving their public transportation experience.

---

## Features
- **Live Data Integration:** Fetches real-time trip and vehicle data.
- **Static Data Handling:** Loads essential route and schedule information from GTFS static files.
- **Route and Stop Details:** Displays route-specific information with stops listed in order.
- **User Input Validation:** Ensures correct input for routes, stops, dates, and times.
- **Recursive Search:** Users can search for multiple trips without restarting the program.

---

## File Structure
- **`data-loading.js`**  
  Handles loading static GTFS data from CSV files and fetching live trip updates from the server.

- **`data-joins.js`**  
  Provides functions for retrieving route details and finding viable trips based on user input.

- **`validation-functions.js`**  
  Contains input validation functions to ensure data consistency and correct user input formats.

- **`translink-parser.js`**  
  The main entry point for the application, managing the user interface, interactions, and program flow.

---

## Setup and Installation
### Prerequisites
- Node.js (v14+)
- Internet connection for live data fetching

### Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Usage
1. Start the program:
    ```bash
    node translink-parser.js
    ```
2. Follow the on-screen prompts to:
    - Select a bus route.
    - Choose start and end stops.
    - Specify the travel date and time.
    - View viable trips, including real-time arrival estimates.
    - Search for more trips or exit the program when done.

## Example
**Welcome to the South East Queensland Route Planner!**
**What Bus Route would you like to take?** 66
1. Roma Street Station
2. King George Square Station
3. Boggo Road station, platform 5
4. {...}
**What is your start and end stop on the route? (Start Num. - Stop Num.)** 1 - 2
**What date will you take the route? (YYYY-MM-DD)** 2024-10-30
**What time will you leave? (HH:mm)** 08:30

| Route Short Name | Route Long Name    | Service ID | Heading Sign | Scheduled Arrival Time | Live Arrival Time | Live Position    | Estimated Travel Time |
|------------------|--------------------|------------|--------------|------------------------|------------------|------------------|-----------------------|
| 66               | CityGlider         | 12345      | Outbound     | 08:45 AM               | 08:47 AM         | (27.4705, 153.025) | 12 min                |
**Would you like to search again? (y/n)** N
**Thanks for using the route tracker!**


## Future Improvements
- Add a graphical user interface (GUI) for easier interaction.
- Integrate map-based stop selection.
- Expand support for other transportation modes like trains and ferries.

## References 
- **GTFS Data** provided by TransLink.