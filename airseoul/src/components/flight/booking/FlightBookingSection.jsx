import { useMemo, useState } from 'react';
import ArrowRightLeftIcon from '../../icons/ArrowRightLeftIcon';
import CircleQuestionMarkIcon from '../../icons/CircleQuestionMarkIcon';
import ClockIcon from '../../icons/ClockIcon';
import PlaneIcon from '../../icons/PlaneIcon';
import TicketIcon from '../../icons/TicketIcon';
import UserIcon from '../../icons/UserIcon';
import { TRIP_TYPES } from '../../../constants/tripType';
import { airportGroups, airports } from '../../../data/airports';
import { formatKoreanMonthDay } from '../../../utils/date';
import {
  createSearchParamsFromCalendar,
  sortSelectedDates,
} from '../../../utils/searchParams';
import FlightDatePicker from './FlightDatePicker';

const PANEL_TYPES = {
  FROM: 'from',
  TO: 'to',
  DATE: 'date',
  PASSENGERS: 'passengers',
  SEAT: 'seat',
};

const getAirport = (code) => airports.find((airport) => airport.code === code);

function FlightBookingSection({ defaultValues, onSearch, variant = 'home' }) {
  const [tripType, setTripType] = useState(defaultValues?.tripType ?? TRIP_TYPES.ROUND_TRIP);
  const [from, setFrom] = useState(defaultValues?.from ?? 'ICN');
  const [to, setTo] = useState(defaultValues?.to ?? 'KIX');
  const [firstDate, setFirstDate] = useState(defaultValues?.departureDate ?? '');
  const [secondDate, setSecondDate] = useState(defaultValues?.returnDate ?? '');
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, infant: 0 });
  const [promotionCode, setPromotionCode] = useState('');
  const [seatClass, setSeatClass] = useState('일반석');
  const [activePanel, setActivePanel] = useState(null);

  const selectedDates = useMemo(() => {
    const dates = tripType === TRIP_TYPES.ONE_WAY ? [firstDate] : [firstDate, secondDate];
    return sortSelectedDates(dates.filter(Boolean));
  }, [firstDate, secondDate, tripType]);

  const departureDate = selectedDates[0] ?? firstDate;
  const returnDate = tripType === TRIP_TYPES.ROUND_TRIP ? selectedDates[1] : '';
  const fromAirport = getAirport(from);
  const toAirport = getAirport(to);
  const dateLabel = returnDate
    ? `${formatKoreanMonthDay(departureDate)} ~ ${formatKoreanMonthDay(returnDate)}`
    : formatKoreanMonthDay(departureDate);
  const passengerLabel = `성인 ${passengers.adult} 소아 ${passengers.child} 유아 ${passengers.infant}`;

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch?.(
      createSearchParamsFromCalendar({
        tripType,
        from,
        to,
        selectedDates,
      })
    );
  };

  const handleTripTypeClick = (nextTripType) => {
    setTripType(nextTripType);

    if (nextTripType === TRIP_TYPES.ONE_WAY) {
      setSecondDate('');
    }

    setActivePanel(PANEL_TYPES.DATE);
  };

  const handleDateChange = (nextFirstDate, nextSecondDate) => {
    setFirstDate(nextFirstDate);
    setSecondDate(nextSecondDate);
  };

  const handlePassengerChange = (key, value) => {
    const minValue = key === 'adult' ? 1 : 0;
    const nextValue = Math.max(minValue, Number(value));
    setPassengers((currentPassengers) => ({
      ...currentPassengers,
      [key]: nextValue,
    }));
  };

  const handleAirportSelect = (panelType, code) => {
    if (panelType === PANEL_TYPES.FROM) {
      setFrom(code);
    } else {
      setTo(code);
    }

    setActivePanel(null);
  };

  const handleSwapRoute = () => {
    setFrom(to);
    setTo(from);
  };

  const renderAirportPanel = (panelType) => (
    <div className="flight-booking-popup__airports">
      {airportGroups.map((group) => (
        <section key={group.region}>
          <h3>{group.region}</h3>
          <div>
            {group.airports.map((airport) => (
              <button
                className={
                  (panelType === PANEL_TYPES.FROM ? from : to) === airport.code ? 'is-active' : ''
                }
                key={airport.code}
                type="button"
                onClick={() => handleAirportSelect(panelType, airport.code)}
              >
                <strong>{airport.code}</strong>
                <span>
                  {airport.city}/{airport.airport}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const renderPassengersPanel = () => (
    <div className="flight-booking-popup__passengers">
      {[
        ['adult', '성인'],
        ['child', '소아'],
        ['infant', '유아'],
      ].map(([key, label]) => (
        <label key={key}>
          <span>{label}</span>
          <input
            min={key === 'adult' ? 1 : 0}
            type="number"
            value={passengers[key]}
            onChange={(event) => handlePassengerChange(key, event.target.value)}
          />
        </label>
      ))}
    </div>
  );

  const renderSeatPanel = () => (
    <div className="flight-booking-popup__seats">
      {['일반석'].map((seat) => (
        <button
          className={seatClass === seat ? 'is-active' : ''}
          key={seat}
          type="button"
          onClick={() => {
            setSeatClass(seat);
            setActivePanel(null);
          }}
        >
          {seat}
        </button>
      ))}
    </div>
  );

  const getPanelTitle = () => {
    if (activePanel === PANEL_TYPES.FROM) return '출발지';
    if (activePanel === PANEL_TYPES.TO) return '도착지';
    if (activePanel === PANEL_TYPES.DATE) return '출발일';
    if (activePanel === PANEL_TYPES.PASSENGERS) return '탑승객';
    if (activePanel === PANEL_TYPES.SEAT) return '좌석 등급';
    return '';
  };

  const renderActivePanel = () => {
    if (activePanel === PANEL_TYPES.FROM || activePanel === PANEL_TYPES.TO) {
      return renderAirportPanel(activePanel);
    }

    if (activePanel === PANEL_TYPES.DATE) {
      return (
        <FlightDatePicker
          firstDate={firstDate}
          secondDate={secondDate}
          tripType={tripType}
          onClose={() => setActivePanel(null)}
          onDateChange={handleDateChange}
          onTripTypeChange={setTripType}
        />
      );
    }

    if (activePanel === PANEL_TYPES.PASSENGERS) {
      return renderPassengersPanel();
    }

    if (activePanel === PANEL_TYPES.SEAT) {
      return renderSeatPanel();
    }

    return null;
  };

  return (
    <section
      className={`flight-booking-section flight-booking-section--${variant}`}
      aria-labelledby="flight-booking-title"
    >
      <div className="flight-booking-section__inner">
        <form className="flight-booking-panel" onSubmit={handleSubmit}>
          <nav className="flight-booking-panel__tabs" aria-label="항공 서비스">
            <button className="is-active" type="button">
              <PlaneIcon size={22} />
              항공권 예매
            </button>
            <button type="button">
              <UserIcon size={22} />
              나의 여행
            </button>
            <button type="button">
              <TicketIcon size={22} />
              체크인
            </button>
            <button type="button">
              <ClockIcon size={22} />
              출도착/스케줄
            </button>
          </nav>

          <div className="flight-booking-panel__body">
            <div className="flight-booking-panel__options">
              <div className="flight-booking-panel__chips" role="group" aria-label="여정 유형">
                <button
                  className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
                  type="button"
                  onClick={() => handleTripTypeClick(TRIP_TYPES.ROUND_TRIP)}
                >
                  왕복
                </button>
                <button
                  className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
                  type="button"
                  onClick={() => handleTripTypeClick(TRIP_TYPES.ONE_WAY)}
                >
                  편도
                </button>
              </div>
            </div>

            <div className="flight-booking-panel__search">
              <div className="flight-booking-panel__route">
                <button type="button" onClick={() => setActivePanel(PANEL_TYPES.FROM)}>
                  <span>출발지</span>
                  <strong>{fromAirport?.code}</strong>
                  <em>
                    {fromAirport?.city}/{fromAirport?.airport} 공항
                  </em>
                </button>

                <button
                  className="flight-booking-panel__swap"
                  type="button"
                  aria-label="출발지와 도착지 바꾸기"
                  onClick={handleSwapRoute}
                >
                  <ArrowRightLeftIcon size={24} />
                </button>

                <button type="button" onClick={() => setActivePanel(PANEL_TYPES.TO)}>
                  <span>도착지</span>
                  <strong>{toAirport?.code}</strong>
                  <em>{toAirport?.city}</em>
                </button>
              </div>

              <button
                className="flight-booking-panel__field flight-booking-panel__date"
                type="button"
                onClick={() => setActivePanel(PANEL_TYPES.DATE)}
              >
                <span>출발일</span>
                <strong>{dateLabel}</strong>
              </button>

              <button
                className="flight-booking-panel__field"
                type="button"
                onClick={() => setActivePanel(PANEL_TYPES.PASSENGERS)}
              >
                <span>탑승객</span>
                <strong>{passengerLabel}</strong>
              </button>

              <label className="flight-booking-panel__field flight-booking-panel__promo">
                <span>
                  프로모션 코드
                  <button
                    className="flight-booking-panel__help"
                    type="button"
                    aria-label="프로모션 코드 안내"
                  >
                    <CircleQuestionMarkIcon size={16} />
                    <span role="tooltip">
                      프로모션 코드를 입력하시면 할인된 금액이 조회됩니다.
                    </span>
                  </button>
                </span>
                <input
                  type="text"
                  value={promotionCode}
                  placeholder="코드 입력"
                  onChange={(event) => setPromotionCode(event.target.value)}
                />
              </label>

              <button
                className="flight-booking-panel__field"
                type="button"
                onClick={() => setActivePanel(PANEL_TYPES.SEAT)}
              >
                <span>좌석 등급</span>
                <strong>{seatClass}</strong>
              </button>

              <button className="flight-booking-panel__submit" type="submit">
                항공편 검색
              </button>
            </div>
          </div>

          {activePanel && (
            <div className="flight-booking-popup" role="dialog" aria-modal="false">
              <header className="flight-booking-popup__header">
                <strong>{getPanelTitle()}</strong>
                <button type="button" aria-label="선택 창 닫기" onClick={() => setActivePanel(null)}>
                  ×
                </button>
              </header>
              {renderActivePanel()}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default FlightBookingSection;
