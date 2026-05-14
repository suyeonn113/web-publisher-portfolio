import { useState } from 'react';
import Header from './components/layout/header/Header';
import { APP_BASE_DATE } from './constants/appDate';
import Home from './pages/Home';
import FlightSearchResults from './pages/FlightSearchResults';
import { createFixedRoundTripSearchParams } from './utils/searchParams';

function App() {
  const [searchParams, setSearchParams] = useState(null);
  const defaultSearchParams = createFixedRoundTripSearchParams({
    from: 'ICN',
    to: 'KIX',
    baseDate: APP_BASE_DATE,
  });

  return (
    <>
      <Header />
      {searchParams ? (
        <FlightSearchResults searchParams={searchParams} />
      ) : (
        <Home defaultSearchParams={defaultSearchParams} onSearch={setSearchParams} />
      )}
    </>
  );
}

export default App;
