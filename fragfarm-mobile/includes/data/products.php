<?php

$products = [

    [
        'id' => 'top-006-na', // SKU (유일값, URL/이미지 기준)

        'name' => 'Foliage Tee',
        'category' => 'top',

        'price' => 38000,
        'originalPrice' => 38000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'White',
        'rating' => 4.9,
        'reviewCount' => 97,

        'createdAt' => '2024-5-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '14수 고밀도 코튼 원단으로 탄탄한 착용감
                          세미오버 핏으로 편안한 실루엣
                          전면 꽃 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2, 3, 4',
        ],

        // 구매 상태 제어
        'stock' => 12,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-006-na-1.jpg',
                'alt' => 'Foliage Tee 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-006-na-2.jpg',
                'alt' => 'Foliage Tee 정면'
            ],
            [
                'src' => '/assets/images/products/top-006-na-3.jpg',
                'alt' => 'Foliage Tee 뒷면'
            ],
        ],
    ],

    [
        'id' => 'top-008-na', // SKU (유일값, URL/이미지 기준)

        'name' => 'Blooming Short Tee',
        'category' => 'top',

        'price' => 38000,
        'originalPrice' => 38000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Ivory',

        'rating' => 4.8,
        'reviewCount' => 78,

        'createdAt' => '2024-5-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 소재와 여유로운 핏의 티셔츠
                          16수 원단으로 탄탄하고 안정적인 착용감
                          전면 꽃 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 12,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-008-na-1.jpg',
                'alt' => 'Blooming Short Tee 정면'
            ],
            [
                'src' => '/assets/images/products/top-008-na-2.jpg',
                'alt' => 'Blooming Short Tee 뒷면'
            ],
            [
                'src' => '/assets/images/products/top-008-na-3.jpg',
                'alt' => 'Blooming Short Tee 착용 이미지'
            ],
        ],
    ],

    [
        'id' => 'top-007-na', // SKU (유일값, URL/이미지 기준)

        'name' => 'Floral Short Tee',
        'category' => 'top',

        'price' => 38000,
        'originalPrice' => 38000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'Ivory',

        'rating' => 4.9,
        'reviewCount' => 7,

        'createdAt' => '2024-5-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 소재와 여유로운 핏의 티셔츠
                          16수 원단으로 탄탄하고 안정적인 착용감
                          전면 꽃 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-007-na-2.jpg',
                'alt' => 'Floral Short Tee 정면'
            ],
            [
                'src' => '/assets/images/products/top-007-na-1.jpg',
                'alt' => 'Floral Short Tee 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-007-na-3.jpg',
                'alt' => 'Floral Short Tee 뒷면'
            ],
        ],
    ],

    [
        'id' => 'top-001-na', // SKU (유일값, URL/이미지 기준)

        'name' => 'One Lily Flower Hoodie',
        'category' => 'top',

        'price' => 14000,
        'originalPrice' => 28000,
        'discount' => 50,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 7,

        'createdAt' => '2024-11-15',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드럽고 은은한 코튼 소재
                          후드 전면에는 릴리 그래픽 나염
                          넥라인 부분에는 헤리테이핑 처리
                          기모 안감으로 따듯하게 착용 가능',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-001-na-1.jpg',
                'alt' => 'One Lily Flower Hoodie 정면'
            ],
            [
                'src' => '/assets/images/products/top-001-na-2.jpg',
                'alt' => 'One Lily Flower Hoodie 뒷면'
            ]
        ],
    ],

    [
        'id' => 'accessory-002-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Fragfarm Winter Muffler(Black)',
        'category' => 'accessory',

        'price' => 34800,
        'originalPrice' => 58000,
        'discount' => 40,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.9,
        'reviewCount' => 45,

        'createdAt' => '2024-11-15',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 소프트 폴리 원단으로 편안한 착용감
                          간절기부터 한겨울까지 활용 가능한 실용적인 아이템
                          양면 착용이 가능해 다양한 스타일링 연출 가능',
        
        'details' => [
            'material' => 'Soft Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-002-bk-1.jpg',
                'alt' => 'Fragfarm Winter Muffler(Black) 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-002-bk-2.jpg',
                'alt' => 'Fragfarm Winter Muffler(Black) 양면(뒤쪽)'
            ],
            [
                'src' => '/assets/images/products/accessory-002-bk-3.jpg',
                'alt' => 'Fragfarm Winter Muffler(Black) 양면(앞쪽)'
            ]
        ],
    ],

    [
        'id' => 'accessory-002-pk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Fragfarm Winter Muffler(Pink)',
        'category' => 'accessory',

        'price' => 34800,
        'originalPrice' => 58000,
        'discount' => 40,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Pink',

        'rating' => 4.9,
        'reviewCount' => 45,

        'createdAt' => '2024-11-15',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 소프트 폴리 원단으로 편안한 착용감
                          간절기부터 한겨울까지 활용 가능한 실용적인 아이템
                          양면 착용이 가능해 다양한 스타일링 연출 가능',
        
        'details' => [
            'material' => 'Soft Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-002-pk-1.jpg',
                'alt' => 'Fragfarm Winter Muffler(Pink) 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-002-pk-2.jpg',
                'alt' => 'Fragfarm Winter Muffler(Pink) 양면(뒤쪽)'
            ],
            [
                'src' => '/assets/images/products/accessory-002-pk-3.jpg',
                'alt' => 'Fragfarm Winter Muffler(Pink) 양면(앞쪽)'
            ]
        ],
    ],

    [
        'id' => 'accessory-002-bl', // SKU (유일값, URL/이미지 기준)

        'name' => 'Fragfarm Winter Muffler(Blue)',
        'category' => 'accessory',

        'price' => 34800,
        'originalPrice' => 58000,
        'discount' => 40,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Blue',

        'rating' => 4.9,
        'reviewCount' => 45,

        'createdAt' => '2024-11-15',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 소프트 폴리 원단으로 편안한 착용감
                          간절기부터 한겨울까지 활용 가능한 실용적인 아이템
                          양면 착용이 가능해 다양한 스타일링 연출 가능',
        
        'details' => [
            'material' => 'Soft Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-002-bl-1.jpg',
                'alt' => 'Fragfarm Winter Muffler(Blue) 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-002-bl-2.jpg',
                'alt' => 'Fragfarm Winter Muffler(Blue) 양면(뒤쪽)'
            ],
            [
                'src' => '/assets/images/products/accessory-002-bl-3.jpg',
                'alt' => 'Fragfarm Winter Muffler(Blue) 양면(앞쪽)'
            ]
        ],
    ],

    [
        'id' => 'top-009-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Pink Gaura Scarf Set Long Sleeve(Black)',
        'category' => 'top',

        'price' => 43000,
        'originalPrice' => 43000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 5,
        'reviewCount' => 12,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '신축성 있는 폴리 원단 사용
                          스카프와 세트로 연출 가능한 롱슬리브 티셔츠 아이템
                          전면 나비바늘꽃 그래픽 프린팅 디테일
                          스카프 연출을 고려한 디자인 구성
                          동양적인 무드를 반영한 그래픽 표현
                          사계절 및 간절기 착용을 고려한 소재 구성',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-bk-1.jpg',
                'alt' => 'Pink Gaura Scarf Set Long Sleeve(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-009-wh', // SKU (유일값, URL/이미지 기준)

        'name' => 'Pink Gaura Scarf Set Long Sleeve(White)',
        'category' => 'top',

        'price' => 43000,
        'originalPrice' => 43000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 12,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '신축성 있는 폴리 원단 사용
                          스카프와 세트로 연출 가능한 롱슬리브 티셔츠 아이템
                          전면 나비바늘꽃 그래픽 프린팅 디테일
                          스카프 연출을 고려한 디자인 구성
                          동양적인 무드를 반영한 그래픽 표현
                          사계절 및 간절기 착용을 고려한 소재 구성',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-wh-1.jpg',
                'alt' => 'Pink Gaura Scarf Set Long Sleeve(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-009-br', // SKU (유일값, URL/이미지 기준)

        'name' => 'Pink Gaura Scarf Set Long Sleeve(Brown)',
        'category' => 'top',

        'price' => 43000,
        'originalPrice' => 43000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Brown',

        'rating' => 5,
        'reviewCount' => 12,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '신축성 있는 폴리 원단 사용
                          스카프와 세트로 연출 가능한 롱슬리브 티셔츠 아이템
                          전면 나비바늘꽃 그래픽 프린팅 디테일
                          스카프 연출을 고려한 디자인 구성
                          동양적인 무드를 반영한 그래픽 표현
                          사계절 및 간절기 착용을 고려한 소재 구성',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-br-1.jpg',
                'alt' => 'Pink Gaura Scarf Set Long Sleeve(Brown) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-009-cc', // SKU (유일값, URL/이미지 기준)

        'name' => 'Pink Gaura Scarf Set Long Sleeve(Charcoal)',
        'category' => 'top',

        'price' => 43000,
        'originalPrice' => 43000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Charcoal',

        'rating' => 5,
        'reviewCount' => 12,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '신축성 있는 폴리 원단 사용
                          스카프와 세트로 연출 가능한 롱슬리브 티셔츠 아이템
                          전면 나비바늘꽃 그래픽 프린팅 디테일
                          스카프 연출을 고려한 디자인 구성
                          동양적인 무드를 반영한 그래픽 표현
                          사계절 및 간절기 착용을 고려한 소재 구성',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-cc-1.jpg',
                'alt' => 'Pink Gaura Scarf Set Long Sleeve(Charcoal) 정면'
            ]
        ],
    ],

    [
        'id' => 'bottom-004-sb', // SKU (유일값, URL/이미지 기준)

        'name' => 'Iris Bermuda Pants(Sand Blue)',
        'category' => 'bottom',

        'price' => 43000,
        'originalPrice' => 43000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Sand Blue',

        'rating' => 4.9,
        'reviewCount' => 40,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '샌드 컬러 워싱으로 내추럴한 무드의 데님
                          얇고 부드러운 소재로 편안한 착용감
                          데님 뒷면 아이리스 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2, 3, 4',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-004-sb-1.jpg',
                'alt' => 'Iris Bermuda Pants(Sand Blue) 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-004-sb-2.jpg',
                'alt' => 'Iris Bermuda Pants(Sand Blue) 측면'
            ],
            [
                'src' => '/assets/images/products/bottom-004-sb-3.jpg',
                'alt' => 'Iris Bermuda Pants(Sand Blue) 착용 이미지'
            ]
        ],
    ],

    [
        'id' => 'bottom-004-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Iris Bermuda Pants(Black)',
        'category' => 'bottom',

        'price' => 43000,
        'originalPrice' => 43000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.9,
        'reviewCount' => 40,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '샌드 컬러 워싱으로 내추럴한 무드의 데님
                          얇고 부드러운 소재로 편안한 착용감
                          데님 뒷면 아이리스 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2, 3, 4',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-004-bk-1.jpg',
                'alt' => 'Iris Bermuda Pants(Black) 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-004-bk-2.jpg',
                'alt' => 'Iris Bermuda Pants(Black) 측면'
            ],
            [
                'src' => '/assets/images/products/bottom-004-bk-3.jpg',
                'alt' => 'Iris Bermuda Pants(Black) 착용 이미지'
            ]
        ],
    ],

    [
        'id' => 'bottom-003-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Trumpet Flower Wide Pants(Black)',
        'category' => 'bottom',

        'price' => 88000,
        'originalPrice' => 88000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.8,
        'reviewCount' => 28,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '두껍고 탄탄한 코든 소재로 안정적인 착용감
                          팬츠 뒷면 능소화 그래픽 나염으로 포인트 연출
                          와이드 핏으로 체형에 구애 없이 여유로운 실루엣',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-003-bk-1.jpg',
                'alt' => 'Trumpet Flower Wide Pants(Black) 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-003-bk-2.jpg',
                'alt' => 'Trumpet Flower Wide Pants(Black) 착용 이미지 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-003-bk-3.jpg',
                'alt' => 'Trumpet Flower Wide Pants(Black) 착용 이미지 측면'
            ],
            [
                'src' => '/assets/images/products/bottom-003-bk-4.jpg',
                'alt' => 'Trumpet Flower Wide Pants(Black) 착용 이미지 정면'
            ]
        ],
    ],

    [
        'id' => 'bottom-003-wh', // SKU (유일값, URL/이미지 기준)

        'name' => 'Trumpet Flower Wide Pants(White)',
        'category' => 'bottom',

        'price' => 88000,
        'originalPrice' => 88000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 4.8,
        'reviewCount' => 28,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '두껍고 탄탄한 코든 소재로 안정적인 착용감
                          팬츠 뒷면 능소화 그래픽 나염으로 포인트 연출
                          와이드 핏으로 체형에 구애 없이 여유로운 실루엣',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-003-wh-1.jpg',
                'alt' => 'Trumpet Flower Wide Pants(White) 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-003-wh-2.jpg',
                'alt' => 'Trumpet Flower Wide Pants(White) 착용 이미지 측면'
            ],
            [
                'src' => '/assets/images/products/bottom-003-wh-3.jpg',
                'alt' => 'Trumpet Flower Wide Pants(White) 착용 이미지 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-003-wh-4.jpg',
                'alt' => 'Trumpet Flower Wide Pants(White) 착용 이미지 정면'
            ]
        ],
    ],

    [
        'id' => 'skirt-001-na', // SKU (유일값, URL/이미지 기준)

        'name' => 'Magic Lily Midi Skirt',
        'category' => 'skirt',

        'price' => 88000,
        'originalPrice' => 88000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Charcoal',

        'rating' => 5,
        'reviewCount' => 13,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '가볍고 부드러운 소재로 편안한 착용감의 미디 스커트
                          스커트 측면 사상화 그래픽 나염으로 은은한 포인트
                          안감 처리로 비침 걱정 없이 안정적인 착용감',
        
        'details' => [
            'material' => 'Polyester 85%, Rayon 10%, Span 5%',
            'size' => '1, 2',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-001-na-1.jpg',
                'alt' => 'Magic Lily Midi Skirt 정면'
            ],
            [
                'src' => '/assets/images/products/skirt-001-na-2.jpg',
                'alt' => 'Magic Lily Midi Skirt 뒷면'
            ],
            [
                'src' => '/assets/images/products/skirt-001-na-3.jpg',
                'alt' => 'Magic Lily Midi Skirt 착용이미지 측면'
            ],
            [
                'src' => '/assets/images/products/skirt-001-na-4.jpg',
                'alt' => 'Magic Lily Midi Skirt 착용이미지 측면 확대'
            ]
        ],
    ],

    [
        'id' => 'skirt-002-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Angela Rose Unbalanced Skirt(Black)',
        'category' => 'skirt',

        'price' => 83000,
        'originalPrice' => 83000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.9,
        'reviewCount' => 44,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '언발란스 디자인으로 감각적인 실루엣의 미디 스커트
                          스커트 정면 안젤라 로즈 그래픽 나염으로 포인트 연출
                          전체 허리 밴딩과 스트링으로 체형에 구애 없이 편안한 착용감',
        
        'details' => [
            'material' => 'Polyester 85%, Rayon 10%, Span 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-002-bk-1.jpg',
                'alt' => 'Angela Rose Unbalanced Skirt(Black) 정면'
            ],
            [
                'src' => '/assets/images/products/skirt-002-bk-2.jpg',
                'alt' => 'Angela Rose Unbalanced Skirt(Black) 착용이미지 측면'
            ]
        ],
    ],

    [
        'id' => 'skirt-002-gy', // SKU (유일값, URL/이미지 기준)

        'name' => 'Angela Rose Unbalanced Skirt(Grey)',
        'category' => 'skirt',

        'price' => 83000,
        'originalPrice' => 83000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Grey',

        'rating' => 4.9,
        'reviewCount' => 44,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '언발란스 디자인으로 감각적인 실루엣의 미디 스커트
                          스커트 정면 안젤라 로즈 그래픽 나염으로 포인트 연출
                          전체 허리 밴딩과 스트링으로 체형에 구애 없이 편안한 착용감',
        
        'details' => [
            'material' => 'Polyester 85%, Rayon 10%, Span 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-002-gy-1.jpg',
                'alt' => 'Angela Rose Unbalanced Skirt(Grey) 앉은 자세 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/skirt-002-gy-2.jpg',
                'alt' => 'Angela Rose Unbalanced Skirt(Grey) 착용이미지 정면'
            ],
            [
                'src' => '/assets/images/products/skirt-002-gy-3.jpg',
                'alt' => 'Angela Rose Unbalanced Skirt(Grey) 정면'
            ]
        ],
    ],

    [
        'id' => 'bottom-002-gy', // SKU (유일값, URL/이미지 기준)

        'name' => 'Butterfly Floral Pants(Grey)',
        'category' => 'bottom',

        'price' => 68000,
        'originalPrice' => 68000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Grey',

        'rating' => 5,
        'reviewCount' => 3,

        'createdAt' => '2024-11-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '탄탄한 기모 안감으로 따뜻한 착용감의 스웻팬츠
                          팬츠 하단 나비 그래픽 나염으로 포인트 연출
                          우수한 신축성과 허리와 밑단 밴딩으로 편안한 핏',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-002-gy-1.jpg',
                'alt' => 'Butterfly Floral Pants(Grey) 정면'
            ],
            [
                'src' => '/assets/images/products/bottom-002-gy-2.jpg',
                'alt' => 'Butterfly Floral Pants(Grey) 착용이미지 측면'
            ]
        ],
    ],

    [
        'id' => 'bottom-002-wh', // SKU (유일값, URL/이미지 기준)

        'name' => 'Butterfly Floral Pants(White)',
        'category' => 'bottom',

        'price' => 68000,
        'originalPrice' => 68000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 3,

        'createdAt' => '2024-11-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '탄탄한 기모 안감으로 따뜻한 착용감의 스웻팬츠
                          팬츠 하단 나비 그래픽 나염으로 포인트 연출
                          우수한 신축성과 허리와 밑단 밴딩으로 편안한 핏',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-002-wh-1.jpg',
                'alt' => 'Butterfly Floral Pants(White) 정면'
            ],
            [
                'src' => '/assets/images/products/bottom-002-wh-2.jpg',
                'alt' => 'Butterfly Floral Pants(White) 착용이미지 측면'
            ]
        ],
    ],

    [
        'id' => 'bottom-002-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'Butterfly Floral Pants(Black)',
        'category' => 'bottom',

        'price' => 68000,
        'originalPrice' => 68000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 5,
        'reviewCount' => 3,

        'createdAt' => '2024-11-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '탄탄한 기모 안감으로 따뜻한 착용감의 스웻팬츠
                          팬츠 하단 나비 그래픽 나염으로 포인트 연출
                          우수한 신축성과 허리와 밑단 밴딩으로 편안한 핏',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-002-bk-1.jpg',
                'alt' => 'Butterfly Floral Pants(Black) 정면'
            ],
            [
                'src' => '/assets/images/products/bottom-002-bk-2.jpg',
                'alt' => 'Butterfly Floral Pants(Black) 착용이미지 측면'
            ]
        ],
    ],

    [
        'id' => 'top-009-bk', // SKU (유일값, URL/이미지 기준)

        'name' => 'F lettering Cardigan(Black)',
        'category' => 'top',

        'price' => 53000,
        'originalPrice' => 53000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.6,
        'reviewCount' => 13,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 코튼 혼방 소재로 편안한 착용감
                          탄탄한 신축성과 슬림한 핏으로 안정적인 실루엣
                          고밀도·고퀄리티 자수 디테일로 완성도 높은 포인트',
        
        'details' => [
            'material' => 'Cotton 80%, Polyester 20%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-bk-1.jpg',
                'alt' => 'F lettering Cardigan(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-009-wh', // SKU (유일값, URL/이미지 기준)

        'name' => 'F lettering Cardigan(White)',
        'category' => 'top',

        'price' => 53000,
        'originalPrice' => 53000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 4.6,
        'reviewCount' => 13,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 코튼 혼방 소재로 편안한 착용감
                          탄탄한 신축성과 슬림한 핏으로 안정적인 실루엣
                          고밀도·고퀄리티 자수 디테일로 완성도 높은 포인트',
        
        'details' => [
            'material' => 'Cotton 80%, Polyester 20%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-wh-1.jpg',
                'alt' => 'F lettering Cardigan(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-009-cc', // SKU (유일값, URL/이미지 기준)

        'name' => 'F lettering Cardigan(Charcoal)',
        'category' => 'top',

        'price' => 53000,
        'originalPrice' => 53000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'Charcoal',

        'rating' => 4.6,
        'reviewCount' => 13,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드러운 코튼 혼방 소재로 편안한 착용감
                          탄탄한 신축성과 슬림한 핏으로 안정적인 실루엣
                          고밀도·고퀄리티 자수 디테일로 완성도 높은 포인트',
        
        'details' => [
            'material' => 'Cotton 80%, Polyester 20%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-009-cc-1.jpg',
                'alt' => 'F lettering Cardigan(Charcoal) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-005-gy', // SKU (유일값, URL/이미지 기준)

        'name' => 'Seashell Earrings Tee(Grey)',
        'category' => 'top',

        'price' => 38000,
        'originalPrice' => 38000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'Grey',

        'rating' => 5,
        'reviewCount' => 6,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '적당한 두께감과 우수한 신축성의 코튼 소재
                          슬림하게 잡아주는 핏한 실루엣
                          전면 조개 귀걸이 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-005-gy-1.jpg',
                'alt' => 'Seashell Earrings Tee(Grey) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-005-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Seashell Earrings Tee(White)',
        'category' => 'top',

        'price' => 38000,
        'originalPrice' => 38000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 6,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '적당한 두께감과 우수한 신축성의 코튼 소재
                          슬림하게 잡아주는 핏한 실루엣
                          전면 조개 귀걸이 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-005-wh-1.png',
                'alt' => 'Seashell Earrings Tee(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-005-sb', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Seashell Earrings Tee(Sky Blue)',
        'category' => 'top',

        'price' => 38000,
        'originalPrice' => 38000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Sky Blue',

        'rating' => 5,
        'reviewCount' => 6,

        'createdAt' => '2025-09-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '적당한 두께감과 우수한 신축성의 코튼 소재
                          슬림하게 잡아주는 핏한 실루엣
                          전면 조개 귀걸이 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 8,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-005-sb-1.png',
                'alt' => 'Seashell Earrings Tee(Sky Blue) 정면'
            ],
            [
                'src' => '/assets/images/products/top-005-sb-2.jpg',
                'alt' => 'Seashell Earrings Tee(Sky Blue) 그래픽 확대'
            ]
        ],
    ],

    [
        'id' => 'top-004-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Seashell Keyring Sleeveless(White)',
        'category' => 'top',

        'price' => 30000,
        'originalPrice' => 30000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2024-05-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '두툼하고 신축성 좋은 코든 소재의 슬리브리스
                          레귤러 핏으로 편안하고 안정적인 착용감
                          전면 키링 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-004-wh-1.jpg',
                'alt' => 'Seashell Keyring Sleeveless(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-004-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Seashell Keyring Sleeveless(Black)',
        'category' => 'top',

        'price' => 30000,
        'originalPrice' => 30000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2024-05-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '두툼하고 신축성 좋은 코든 소재의 슬리브리스
                          레귤러 핏으로 편안하고 안정적인 착용감
                          전면 키링 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-004-bk-1.jpg',
                'alt' => 'Seashell Keyring Sleeveless(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'bottom-001-na', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Iris Denim Pants',
        'category' => 'bottom',

        'price' => 68000,
        'originalPrice' => 68000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Sand Blue',

        'rating' => 5,
        'reviewCount' => 6,

        'createdAt' => '2025-09-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '샌드 컬러 워싱으로 내추럴한 무드의 데님
                          얇고 부드러운 소재로 편안한 착용감
                          데님 뒷면 아이리스 그래픽 나염으로 포인트 연출',
        
        'details' => [
            'material' => 'Cotton 100%',
            'size' => '1, 2, 3',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/bottom-001-na-1.jpg',
                'alt' => 'Iris Denim Pants(Sand Blue) 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-001-na-2.jpg',
                'alt' => 'Iris Denim Pants(Sand Blue) 정면'
            ],
            [
                'src' => '/assets/images/products/bottom-001-na-3.jpg',
                'alt' => 'Iris Denim Pants(Sand Blue) 착용 이미지 정면'
            ],
            [
                'src' => '/assets/images/products/bottom-001-na-4.jpg',
                'alt' => 'Iris Denim Pants(Sand Blue) 착용 이미지 뒷면'
            ],
            [
                'src' => '/assets/images/products/bottom-001-na-5.jpg',
                'alt' => 'Iris Denim Pants(Sand Blue) 착용 이미지 측면'
            ]
        ],
    ],

    [
        'id' => 'skirt-003-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Skirts(Black)',
        'category' => 'skirt',

        'price' => 88000,
        'originalPrice' => 88000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.8,
        'reviewCount' => 5,

        'createdAt' => '2025-05-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '체크 패턴 원단 사용
                          밑단 프릴 디테일 적용
                          허리 전체 밴딩 구조
                          사이드 스트링 디테일 구성으로 길이 조절 가능
                          내부 안감 포함',
        
        'details' => [
            'material' => 'Cotton 70%, Polyester 30%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-003-bk-1.jpg',
                'alt' => 'Sentimental Rose Skirts(Black) 정면'
            ],
            [
                'src' => '/assets/images/products/skirt-003-bk-2.jpg',
                'alt' => 'Sentimental Rose Skirts(Black) 착용 이미지 측면'
            ],
            [
                'src' => '/assets/images/products/skirt-003-bk-3.jpg',
                'alt' => 'Sentimental Rose Skirts(Black) 그래픽 확대'
            ]
        ],
    ],

    [
        'id' => 'skirt-003-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Skirts(White)',
        'category' => 'skirt',

        'price' => 88000,
        'originalPrice' => 88000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 4.8,
        'reviewCount' => 5,

        'createdAt' => '2025-05-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '체크 패턴 원단 사용
                          밑단 프릴 디테일 적용
                          허리 전체 밴딩 구조
                          사이드 스트링 디테일 구성으로 길이 조절 가능
                          내부 안감 포함',
        
        'details' => [
            'material' => 'Cotton 70%, Polyester 30%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 5,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-003-wh-1.jpg',
                'alt' => 'Sentimental Rose Skirts(White) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/skirt-003-wh-2.jpg',
                'alt' => 'Sentimental Rose Skirts(White) 착용 이미지 확대'
            ],
            [
                'src' => '/assets/images/products/skirt-003-wh-3.jpg',
                'alt' => 'Sentimental Rose Skirts(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-003-na', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Blouse',
        'category' => 'top',

        'price' => 88000,
        'originalPrice' => 88000,
        'discount' => 0,

        'state' => ['soldout'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 2,

        'createdAt' => '2024-05-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '약간의 빳빳함과 스판성이 좋은 폴리 혼방 소재
                          허리와 골반 라인을 자연스럽게 잡아주는 미디 길이 스커트
                          밑단의 프릴과 절개선 디테일
                          허리 라인에 지퍼 부착
                          치마 내부에는 안감이 더해져 비침 걱정 없이 착용 가능',
        
        'details' => [
            'material' => 'Polyester 94%, PU 6%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 0,
        'soldOut' => true,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-003-na-1.jpg',
                'alt' => 'Sentimental Rose Blouse 정면'
            ],
            [
                'src' => '/assets/images/products/top-003-na-2.jpg',
                'alt' => 'Sentimental Rose Blouse 뒷면'
            ]
        ],
    ],

    [
        'id' => 'accessory-001-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Flower Corsage Wool Beanie(Black)',
        'category' => 'accessory',

        'price' => 43000-12900,
        'originalPrice' => 43000,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2025-10-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '꽃 코사지와 레이스 장식으로 포인트를 더한 비니
                          신축성 있는 소재와 레귤러 핏으로 두상에 구애 없이 편안한 착용감',
        
        'details' => [
            'material' => 'Wool 50%, Acrylic 6%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-001-bk-3.jpg',
                'alt' => 'Flower Corsage Wool Beanie(Black) 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-001-bk-1.jpg',
                'alt' => 'Flower Corsage Wool Beanie(Black) 착용 이미지 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-001-bk-2.jpg',
                'alt' => 'Flower Corsage Wool Beanie(Black) 착용 이미지 측면'
            ]
        ],
    ],

    [
        'id' => 'accessory-001-cc', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Flower Corsage Wool Beanie(Charcoal)',
        'category' => 'accessory',

        'price' => 43000-12900,
        'originalPrice' => 43000,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Charcoal',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2025-10-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '꽃 코사지와 레이스 장식으로 포인트를 더한 비니
                          신축성 있는 소재와 레귤러 핏으로 두상에 구애 없이 편안한 착용감',
        
        'details' => [
            'material' => 'Wool 50%, Acrylic 6%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-001-cc-2.jpg',
                'alt' => 'Flower Corsage Wool Beanie(Charcoal) 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-001-cc-1.jpg',
                'alt' => 'Flower Corsage Wool Beanie(Charcoal) 착용 이미지'
            ]
        ],
    ],

    [
        'id' => 'skirt-004-na', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Day Lily Midi Skirt',
        'category' => 'skirt',

        'price' => 118000,
        'originalPrice' => 118000,
        'discount' => 0,

        'state' => [], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2025-10-30',

        // 상세페이지 핵심 콘텐츠
        'description' => '폴리 혼방 소재 사용
                          곡선형 절개 디테일로 자연스러운 플레어 실루엣
                          미디 기장 스커트
                          머메이드 실루엣 헴 라인
                          내부 안감 구성',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => '1, 2',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-004-na-1.jpg',
                'alt' => 'Day Lily Midi Skirt 착용 이미지 측면'
            ],
            [
                'src' => '/assets/images/products/skirt-004-na-2.jpg',
                'alt' => 'Day Lily Midi Skirt 정면'
            ],
            [
                'src' => '/assets/images/products/skirt-004-na-3.jpg',
                'alt' => 'Day Lily Midi Skirt 착용 이미지 정면'
            ],
            [
                'src' => '/assets/images/products/skirt-004-na-4.jpg',
                'alt' => 'Day Lily Midi Skirt 착용 이미지 뒷면'
            ]
        ],
    ],

    [
        'id' => 'accessory-003-bl', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Wool Gloves(Blue)',
        'category' => 'accessory',

        'price' => 19500,
        'originalPrice' => 28500,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Blue',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '울 원단을 베이스로 한 소재 구성
                          센티멘탈 로즈 그래픽 프렌팅 디테일
                          그래픽 실크 스크린 나염 처리
                          전체 디자인에 은은한 플로럴 포인트 적용',
        
        'details' => [
            'material' => 'Wool 40%, Polyester 30%, Spandex 20%, Rubber Yan 10%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-003-bl-1.jpg',
                'alt' => 'Sentimental Rose Wool Gloves(Blue) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-003-br', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Wool Gloves(Brown)',
        'category' => 'accessory',

        'price' => 19500,
        'originalPrice' => 28500,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Brown',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '울 원단을 베이스로 한 소재 구성
                          센티멘탈 로즈 그래픽 프렌팅 디테일
                          그래픽 실크 스크린 나염 처리
                          전체 디자인에 은은한 플로럴 포인트 적용',
        
        'details' => [
            'material' => 'Wool 40%, Polyester 30%, Spandex 20%, Rubber Yan 10%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-003-br-1.jpg',
                'alt' => 'Sentimental Rose Wool Gloves(Brown) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-003-gy', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Wool Gloves(Grey)',
        'category' => 'accessory',

        'price' => 19500,
        'originalPrice' => 28500,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Grey',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '울 원단을 베이스로 한 소재 구성
                          센티멘탈 로즈 그래픽 프렌팅 디테일
                          그래픽 실크 스크린 나염 처리
                          전체 디자인에 은은한 플로럴 포인트 적용',
        
        'details' => [
            'material' => 'Wool 40%, Polyester 30%, Spandex 20%, Rubber Yan 10%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-003-gy-1.jpg',
                'alt' => 'Sentimental Rose Wool Gloves(Grey) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-003-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Wool Gloves(White)',
        'category' => 'accessory',

        'price' => 19950,
        'originalPrice' => 28500,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '울 원단을 베이스로 한 소재 구성
                          센티멘탈 로즈 그래픽 프렌팅 디테일
                          그래픽 실크 스크린 나염 처리
                          전체 디자인에 은은한 플로럴 포인트 적용',
        
        'details' => [
            'material' => 'Wool 40%, Polyester 30%, Spandex 20%, Rubber Yan 10%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-003-wh-1.jpg',
                'alt' => 'Sentimental Rose Wool Gloves(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-003-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Wool Gloves(Black)',
        'category' => 'accessory',

        'price' => 19950,
        'originalPrice' => 28500,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 5,
        'reviewCount' => 1,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '울 원단을 베이스로 한 소재 구성
                          센티멘탈 로즈 그래픽 프렌팅 디테일
                          그래픽 실크 스크린 나염 처리
                          전체 디자인에 은은한 플로럴 포인트 적용',
        
        'details' => [
            'material' => 'Wool 40%, Polyester 30%, Spandex 20%, Rubber Yan 10%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-003-bk-1.jpg',
                'alt' => 'Sentimental Rose Wool Gloves(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-004-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Muffler(Black)',
        'category' => 'accessory',

        'price' => 21000,
        'originalPrice' => 30000,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 4.7,
        'reviewCount' => 7,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드럽고 따뜻한 폴리 소재 텍스처
                          차분한 컬러 베이스 위 센티멘탈 로즈 그래픽 나염 포인트
                          은은한 그래픽 표현을 더한 프린팅 디테일
                          자연스럽게 떨어지는 기장감으로 다양한 연출 가능',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-004-bk-1.jpg',
                'alt' => 'Sentimental Rose Muffler(Black) 연출'
            ],
            [
                'src' => '/assets/images/products/accessory-004-bk-2.jpg',
                'alt' => 'Sentimental Rose Muffler(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-004-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Muffler(White)',
        'category' => 'accessory',

        'price' => 21000,
        'originalPrice' => 30000,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 4.7,
        'reviewCount' => 7,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드럽고 따뜻한 폴리 소재 텍스처
                          차분한 컬러 베이스 위 센티멘탈 로즈 그래픽 나염 포인트
                          은은한 그래픽 표현을 더한 프린팅 디테일
                          자연스럽게 떨어지는 기장감으로 다양한 연출 가능',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-004-wh-1.jpg',
                'alt' => 'Sentimental Rose Muffler(White) 연출'
            ],
            [
                'src' => '/assets/images/products/accessory-004-wh-2.jpg',
                'alt' => 'Sentimental Rose Muffler(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-004-gy', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Sentimental Rose Muffler(Grey)',
        'category' => 'accessory',

        'price' => 21000,
        'originalPrice' => 30000,
        'discount' => 30,

        'state' => ['sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Grey',

        'rating' => 4.7,
        'reviewCount' => 7,

        'createdAt' => '2025-12-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '부드럽고 따뜻한 폴리 소재 텍스처
                          차분한 컬러 베이스 위 센티멘탈 로즈 그래픽 나염 포인트
                          은은한 그래픽 표현을 더한 프린팅 디테일
                          자연스럽게 떨어지는 기장감으로 다양한 연출 가능',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-004-gy-1.jpg',
                'alt' => 'Sentimental Rose Muffler(Grey) 연출'
            ],
            [
                'src' => '/assets/images/products/accessory-004-gy-2.jpg',
                'alt' => 'Sentimental Rose Muffler(Grey) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-005-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Cherry Blossom Embroidered Chiffon Scarf(Black)',
        'category' => 'accessory',

        'price' => 31000,
        'originalPrice' => 33000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '투명한 쉬폰 원단 위 벚꽃 그래픽 자수 디테일
                          프래그팜 특유의 플라워 모티브를 담은 디자인
                          자수를 통해 표현된 섬세한 그래픽 포인트
                          스카프에 함께 구성된 플라워 코사지 디테일',
        
        'details' => [
            'material' => 'Nylon 95%, Polyurethane 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-005-bk-1.jpg',
                'alt' => 'Cherry Blossom Embroidered Chiffon Scarf(Black) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/accessory-005-bk-2.jpg',
                'alt' => 'Cherry Blossom Embroidered Chiffon Scarf(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-005-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Cherry Blossom Embroidered Chiffon Scarf(White)',
        'category' => 'accessory',

        'price' => 31000,
        'originalPrice' => 33000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '투명한 쉬폰 원단 위 벚꽃 그래픽 자수 디테일
                          프래그팜 특유의 플라워 모티브를 담은 디자인
                          자수를 통해 표현된 섬세한 그래픽 포인트
                          스카프에 함께 구성된 플라워 코사지 디테일',
        
        'details' => [
            'material' => 'Nylon 95%, Polyurethane 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-005-wh-1.jpg',
                'alt' => 'Cherry Blossom Embroidered Chiffon Scarf(White) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/accessory-005-wh-2.jpg',
                'alt' => 'Cherry Blossom Embroidered Chiffon Scarf(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-007-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Floral Lace Scarf(Black)',
        'category' => 'accessory',

        'price' => 31000,
        'originalPrice' => 33000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '플로럴 패턴이 섬세하게 표현된 레이스 원단 사용
                          둘러주거나 묶는 방식에 따라 연출 가능한 디자인 구조
                          화이트, 블랙 두 가지 컬러 구성
                          다양한 스타일에 자연스럽게 매치되는 아이템 구성',
        
        'details' => [
            'material' => 'Nylon 95%, Polyurethane 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-007-bk-1.jpg',
                'alt' => 'Floral Lace Scarf(Black) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/accessory-007-bk-2.jpg',
                'alt' => 'Floral Lace Scarf(Black) 착용 이미지 측면'
            ],
            [
                'src' => '/assets/images/products/accessory-007-bk-3.jpg',
                'alt' => 'Floral Lace Scarf(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-007-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Floral Lace Scarf(White)',
        'category' => 'accessory',

        'price' => 31000,
        'originalPrice' => 33000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '플로럴 패턴이 섬세하게 표현된 레이스 원단 사용
                          둘러주거나 묶는 방식에 따라 연출 가능한 디자인 구조
                          화이트, 블랙 두 가지 컬러 구성
                          다양한 스타일에 자연스럽게 매치되는 아이템 구성',
        
        'details' => [
            'material' => 'Nylon 95%, Polyurethane 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-007-wh-2.jpg',
                'alt' => 'Floral Lace Scarf(White) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/accessory-007-wh-1.jpg',
                'alt' => 'Floral Lace Scarf(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'skirt-005-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Floral Lace Wrap Skirt(White)',
        'category' => 'skirt',

        'price' => 68000-3500,
        'originalPrice' => 68000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '플로럴 패턴의 레이스 원단을 사용한 랩 스커트
                          팬츠 위 레이어드 또는 단독 연출 모두 고려한 디자인 구조
                          랩 형식으로 자연스럽게 여며지는 여밈 방식
                          체형에 구애 없이 연출 가능한 실루엣
                          과한 장식 없이 레이스 텍스처 자체로 포인트를 더한 구성',
        
        'details' => [
            'material' => 'Nylon 95%, Polyurethane 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-005-wh-2.jpg',
                'alt' => 'Floral Lace Wrap Skirt(White) 착용 이미지 확대'
            ],
            [
                'src' => '/assets/images/products/skirt-005-wh-1.jpg',
                'alt' => 'Floral Lace Wrap Skirt(White) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/skirt-005-wh-3.jpg',
                'alt' => 'Floral Lace Wrap Skirt(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'skirt-005-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Floral Lace Wrap Skirt(Black)',
        'category' => 'skirt',

        'price' => 68000-3500,
        'originalPrice' => 68000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '플로럴 패턴의 레이스 원단을 사용한 랩 스커트
                          팬츠 위 레이어드 또는 단독 연출 모두 고려한 디자인 구조
                          랩 형식으로 자연스럽게 여며지는 여밈 방식
                          체형에 구애 없이 연출 가능한 실루엣
                          과한 장식 없이 레이스 텍스처 자체로 포인트를 더한 구성',
        
        'details' => [
            'material' => 'Nylon 95%, Polyurethane 5%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/skirt-005-bk-2.jpg',
                'alt' => 'Floral Lace Wrap Skirt(Black) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/skirt-005-bk-1.jpg',
                'alt' => 'Floral Lace Wrap Skirt(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-011-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Peony Flower Wrap T-Shirt(Black)',
        'category' => 'top',

        'price' => 48000-2400,
        'originalPrice' => 48000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '톤온톤 그래픽 나염 디테일
                          랩 형식으로 자연스럽게 여며지는 티셔츠 디자인
                          허리 라인에 더해진 스트링 디테일
                          스트링 조절을 통해 다양한 실루엣 연출 가능
                          슬림한 라인으로 단독 및 레이어드 스타일링에 적합',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-011-bk-1.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(Black) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-011-bk-2.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(Black) 착용 이미지 확대'
            ],
            [
                'src' => '/assets/images/products/top-011-bk-3.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-011-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Peony Flower Wrap T-Shirt(White)',
        'category' => 'top',

        'price' => 48000-2400,
        'originalPrice' => 48000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '톤온톤 그래픽 나염 디테일
                          랩 형식으로 자연스럽게 여며지는 티셔츠 디자인
                          허리 라인에 더해진 스트링 디테일
                          스트링 조절을 통해 다양한 실루엣 연출 가능
                          슬림한 라인으로 단독 및 레이어드 스타일링에 적합',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-011-wh-1.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(White) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-011-wh-2.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-011-cc', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Peony Flower Wrap T-Shirt(Charcoal)',
        'category' => 'top',

        'price' => 48000-2400,
        'originalPrice' => 48000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Charcoal',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '톤온톤 그래픽 나염 디테일
                          랩 형식으로 자연스럽게 여며지는 티셔츠 디자인
                          허리 라인에 더해진 스트링 디테일
                          스트링 조절을 통해 다양한 실루엣 연출 가능
                          슬림한 라인으로 단독 및 레이어드 스타일링에 적합',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-011-cc-1.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(Charcoal) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-011-cc-2.jpg',
                'alt' => 'Peony Flower Wrap T-Shirt(Charcoal) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-010-bk', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Peony Flower Short-Sleeve T-Shirt(Black)',
        'category' => 'top',

        'price' => 38000-2000,
        'originalPrice' => 38000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Black',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '톤온톤 그래픽 나염 디테일
                          숏 기장으로 설계된 티셔츠 실루엣
                          바디에 밀착되는 슬림한 핏 구성
                          단독 착용 및 레이어드 스타일링에 적합',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-010-bk-1.jpg',
                'alt' => 'Peony Flower Short-Sleeve T-Shirt(Black) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-010-bk-2.jpg',
                'alt' => 'Peony Flower Short-Sleeve T-Shirt(Black) 정면'
            ]
        ],
    ],

    [
        'id' => 'top-010-wh', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'Peony Flower Short-Sleeve T-Shirt(White)',
        'category' => 'top',

        'price' => 38000-2000,
        'originalPrice' => 38000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'White',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '톤온톤 그래픽 나염 디테일
                          숏 기장으로 설계된 티셔츠 실루엣
                          바디에 밀착되는 슬림한 핏 구성
                          단독 착용 및 레이어드 스타일링에 적합',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/top-010-wh-1.jpg',
                'alt' => 'Peony Flower Short-Sleeve T-Shirt(White) 착용 이미지'
            ],
            [
                'src' => '/assets/images/products/top-010-wh-2.jpg',
                'alt' => 'Peony Flower Short-Sleeve T-Shirt(White) 정면'
            ]
        ],
    ],

    [
        'id' => 'accessory-006-na', // SKU (유일값, URL/이미지 기준)
    
        'name' => 'FR Angel Graphic Check Shoulder Bag',
        'category' => 'accessory',

        'price' => 43000-2500,
        'originalPrice' => 43000,
        'discount' => 5,

        'state' => ['new', 'sale'], // ['new'], ['sale'], ['soldout']

        'color' => 'Check',

        'rating' => 0,
        'reviewCount' => 0,

        'createdAt' => '2026-02-01',

        // 상세페이지 핵심 콘텐츠
        'description' => '클래식한 체크 패턴으로 포인트를 더한 숄더백
                          넉넉한 사이즈로 데일리 소지품 수납이 용이한 디자인
                          숄더 스트랩으로 편안하게 착용 가능한 실용적인 아이템
                          그래픽 프린트 디테일로 유니크한 무드 연출',
        
        'details' => [
            'material' => 'Polyester 100%',
            'size' => 'One Size',
        ],

        // 구매 상태 제어
        'stock' => 3,
        'soldOut' => false,

        // 이미지 (파일명 규칙 = id 기반)
        'images' => [
            [
                'src' => '/assets/images/products/accessory-006-na-1.jpg',
                'alt' => 'FR Angel Graphic Check Shoulder Bag 착용 이미지 측면'
            ],
            [
                'src' => '/assets/images/products/accessory-006-na-2.jpg',
                'alt' => 'FR Angel Graphic Check Shoulder Bag 착용 이미지 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-006-na-3.jpg',
                'alt' => 'FR Angel Graphic Check Shoulder Bag 정면'
            ],
            [
                'src' => '/assets/images/products/accessory-006-na-4.jpg',
                'alt' => 'FR Angel Graphic Check Shoulder Bag 뒷면'
            ]
        ],
    ]
];