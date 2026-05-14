export const flights = [
  {
    id: 'rs715-icn-kix-20260514',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS715',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'KIX',
        city: '오사카',
        airport: '간사이',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-14',
      departureTime: '15:20',
      arrivalDate: '2026-05-14',
      arrivalTime: '17:00',
      durationMinutes: 100,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 123500,
        seatsLeft: 1,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 178500,
        seatsLeft: 2,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 378500,
        seatsLeft: 4,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 7,
    },
  },
  {
    id: 'rs716-kix-icn-20260521',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS716',

    route: {
      from: {
        code: 'KIX',
        city: '오사카',
        airport: '간사이',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-21',
      departureTime: '18:10',
      arrivalDate: '2026-05-21',
      arrivalTime: '20:05',
      durationMinutes: 115,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 152500,
        seatsLeft: 1,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 192500,
        seatsLeft: 2,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 414700,
        seatsLeft: 3,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 6,
    },
  },
];
