import { flights } from '../data/flights';

export const searchFlights = ({ from, to, departureDate }) =>
  flights.filter((flight) => {
    const matchesFrom = !from || flight.route.from.code === from;
    const matchesTo = !to || flight.route.to.code === to;
    const matchesDepartureDate =
      !departureDate || flight.schedule.departureDate === departureDate;

    return matchesFrom && matchesTo && matchesDepartureDate;
  });

export const searchRoundTripFlights = ({ from, to, departureDate, returnDate }) => ({
  outboundFlights: searchFlights({ from, to, departureDate }),
  inboundFlights: searchFlights({
    from: to,
    to: from,
    departureDate: returnDate,
  }),
});
