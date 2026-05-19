import FlightBookingSection from '../components/flight/flight-service/FlightServiceSection';
import HomeMobileQuickBar from '../components/home/HomeMobileQuickBar';
import HeroSection from '../components/home/hero/HeroSection';
import HomeInfoSection from '../components/home/info/HomeInfoSection';
import ServiceShortcutSection from '../components/home/service-shortcut/ServiceShortcutSection';

export default function Home({ defaultSearchParams, onSearch }) {
  return (
    <main className="home">
      <HeroSection />
      <FlightBookingSection defaultValues={defaultSearchParams} onSearch={onSearch} />
      <ServiceShortcutSection />
      <HomeInfoSection />
      <HomeMobileQuickBar />
    </main>
  );
}
