import FlightBookingSection from '../components/flight/booking/FlightBookingSection';
import HomeMobileQuickBar from '../components/home/HomeMobileQuickBar';
import SpecialFareSection from '../components/home/SpecialFareSection';

export default function Home({ defaultSearchParams, onSearch }) {
  return (
    <main className="home">
      <SpecialFareSection onSelectFare={onSearch} />
      <FlightBookingSection defaultValues={defaultSearchParams} onSearch={onSearch} />
      <HomeMobileQuickBar />
    </main>
  );
}
