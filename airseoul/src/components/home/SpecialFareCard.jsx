import { formatKRW } from '../../utils/price';

function SpecialFareCard({ fare, onSelect }) {
  return (
    <button className="special-fare-card" type="button" onClick={() => onSelect(fare)}>
      <span
        className="special-fare-card__image"
        style={{ backgroundImage: `url(${fare.image})` }}
        aria-hidden="true"
      />
      <span className="special-fare-card__route">
        {fare.from.city} - {fare.to.city}
      </span>
      <span className="special-fare-card__price">{formatKRW(fare.price)}~</span>
    </button>
  );
}

export default SpecialFareCard;
