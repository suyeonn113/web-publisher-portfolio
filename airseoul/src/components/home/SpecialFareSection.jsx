import { getSpecialFareCards } from '../../services/specialFares';
import SpecialFareCard from './SpecialFareCard';

function SpecialFareSection({ onSelectFare }) {
  const fares = getSpecialFareCards();

  return (
    <section className="special-fare-section" aria-labelledby="special-fare-title">
      <div className="special-fare-section__inner">
        <header className="special-fare-section__header">
          <h2 id="special-fare-title">특가 항공권</h2>
        </header>

        <div className="special-fare-section__grid">
          {fares.map((fare) => (
            <SpecialFareCard
              fare={fare}
              key={fare.id}
              onSelect={() => onSelectFare?.(fare.searchParams)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialFareSection;
