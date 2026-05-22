import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';

dotenv.config({ path: 'server/.env' });

const app = express();
const port = Number(process.env.PORT) || 4000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
});

const flightSearchSql = `
  SELECT
    f.flight_id,
    f.airline_code,
    f.airline_name,
    f.flight_no,
    f.origin_code,
    f.origin_city,
    f.origin_airport,
    f.origin_terminal,
    f.destination_code,
    f.destination_city,
    f.destination_airport,
    f.destination_terminal,
    DATE_FORMAT(f.departure_date, '%Y-%m-%d') AS departure_date,
    TIME_FORMAT(f.departure_time, '%H:%i') AS departure_time,
    DATE_FORMAT(f.arrival_date, '%Y-%m-%d') AS arrival_date,
    TIME_FORMAT(f.arrival_time, '%H:%i') AS arrival_time,
    f.duration_minutes,
    f.availability_status,
    f.seats_left AS flight_seats_left,
    ff.fare_type,
    ff.currency,
    ff.fare_label,
    ff.price,
    ff.seats_left AS fare_seats_left,
    ff.baggage_included
  FROM airseoul_flights f
  JOIN airseoul_flight_fares ff
    ON ff.flight_id = f.flight_id
  WHERE f.origin_code = ?
    AND f.destination_code = ?
    AND f.departure_date = ?
  ORDER BY f.departure_time, ff.price
`;

function buildFlights(rows) {
  const flightsById = new Map();

  rows.forEach((row) => {
    if (!flightsById.has(row.flight_id)) {
      flightsById.set(row.flight_id, {
        id: row.flight_id,
        airline: {
          code: row.airline_code,
          name: row.airline_name,
        },
        flightNo: row.flight_no,
        route: {
          from: {
            code: row.origin_code,
            city: row.origin_city,
            airport: row.origin_airport,
            terminal: row.origin_terminal,
          },
          to: {
            code: row.destination_code,
            city: row.destination_city,
            airport: row.destination_airport,
            terminal: row.destination_terminal,
          },
        },
        schedule: {
          departureDate: row.departure_date,
          departureTime: row.departure_time,
          arrivalDate: row.arrival_date,
          arrivalTime: row.arrival_time,
          durationMinutes: row.duration_minutes,
        },
        fares: {
          currency: row.currency,
        },
        availability: {
          status: row.availability_status,
          seatsLeft: row.flight_seats_left,
        },
      });
    }

    const flight = flightsById.get(row.flight_id);

    flight.fares[row.fare_type] = {
      label: row.fare_label,
      price: row.price,
      seatsLeft: row.fare_seats_left,
      baggageIncluded: Boolean(row.baggage_included),
    };
  });

  return Array.from(flightsById.values());
}

app.get('/api/flights', async (req, res) => {
  const { departureDate, from, to } = req.query;

  if (!from || !to || !departureDate) {
    res.status(400).json({ message: 'from, to, departureDate are required.' });
    return;
  }

  try {
    const [rows] = await pool.execute(flightSearchSql, [from, to, departureDate]);

    res.json(buildFlights(rows));
  } catch (error) {
    console.error('Flight search failed.', error);
    res.status(500).json({ message: 'Failed to search flights.' });
  }
});

app.listen(port, () => {
  console.log(`Air Seoul API server is running on http://localhost:${port}`);
});
