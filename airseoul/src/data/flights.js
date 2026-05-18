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
  {
    id: 'rs705-icn-nrt-20260516',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS705',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-16',
      departureTime: '10:10',
      arrivalDate: '2026-05-16',
      arrivalTime: '12:40',
      durationMinutes: 150,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 129900,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 189900,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 389900,
        seatsLeft: 8,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 15,
    },
  },
  {
    id: 'rs901-gmp-cju-20260517',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS901',

    route: {
      from: {
        code: 'GMP',
        city: '서울',
        airport: '김포',
        terminal: 'Domestic',
      },
      to: {
        code: 'CJU',
        city: '제주',
        airport: '제주',
        terminal: 'Domestic',
      },
    },

    schedule: {
      departureDate: '2026-05-17',
      departureTime: '08:30',
      arrivalDate: '2026-05-17',
      arrivalTime: '09:50',
      durationMinutes: 80,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 39900,
        seatsLeft: 4,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 69900,
        seatsLeft: 8,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 119900,
        seatsLeft: 12,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 24,
    },
  },
  {
    id: 'rs511-icn-dad-20260602',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS511',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'DAD',
        city: '다낭',
        airport: '다낭',
        terminal: 'International',
      },
    },

    schedule: {
      departureDate: '2026-06-02',
      departureTime: '18:45',
      arrivalDate: '2026-06-02',
      arrivalTime: '22:30',
      durationMinutes: 285,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 159900,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 239900,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 489900,
        seatsLeft: 10,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 19,
    },
  },
  {
    id: 'rs527-icn-cxr-20260608',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS527',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'CXR',
        city: '나트랑',
        airport: '깜란',
        terminal: 'International',
      },
    },

    schedule: {
      departureDate: '2026-06-08',
      departureTime: '20:20',
      arrivalDate: '2026-06-09',
      arrivalTime: '00:25',
      durationMinutes: 305,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 169900,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 249900,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 529900,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 16,
    },
  },
];
