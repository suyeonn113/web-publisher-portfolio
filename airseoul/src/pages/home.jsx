import FlightBookingSection from '../components/flight/flight-service/FlightServiceSection';
import HomeMobileQuickBar from '../components/home/HomeMobileQuickBar';
import HeroSection from '../components/home/hero/HeroSection';

export default function Home({ defaultSearchParams, onSearch }) {
  return (
    <main className="home">
      <HeroSection />
      <FlightBookingSection defaultValues={defaultSearchParams} onSearch={onSearch} />
      <HomeMobileQuickBar />
    </main>
  );
}
