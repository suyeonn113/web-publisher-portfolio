<?php

$youthPrograms = [

    // ========================
    // 모집중 (상시)
    // ========================
    [
        'id' => 1, // 모집중(상시)
        'title' => '2026년 청소년 시민참여 기획 워크숍 「로컬체인지 메이커」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/1.png',
            'alt' => '청소년 시민참여 기획 워크숍 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => true,

        // 활동기간
        'activity_start_date' => '2026-04-12',
        'activity_end_date' => null,

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['시민참여', '기획', '후기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['시민참여', '기획활동', '청소년 워크숍', '후기청소년', '상시모집'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'citizen',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기 청소년
        // mid-youth        → 중기 청소년
        // late-youth       → 후기 청소년
        // citizen          → 시민
        'age_group_codes' => ['late-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 1,
    ],
    [
        'id' => 2, // 모집중(상시)
        'title' => '2026학년도 우리동네 참여 프로젝트 「청소년 체인지업 메이킹」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/2.png',
            'alt' => '우리동네 참여 프로젝트 메이킹 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => true,

        // 활동기간
        'activity_start_date' => '2026-04-18',
        'activity_end_date' => null,

        // 비용 (0이면 무료)
        'price' => 10000,

        // 해시태그 (UI 표시용)
        'hashtags' => ['시민참여', '프로젝트', '중기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['시민참여', '프로젝트 활동', '동네 참여', '중기청소년', '상시모집'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'citizen',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['mid-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 2,
    ],

    // ========================
    // 모집중
    // ========================
    [
        'id' => 3, // 모집중
        'title' => '2026년 청소년 공공캠페인 기획단 「우리동네 체인지메이커 3기」 단원 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/3.png',
            'alt' => '청소년 공공캠페인 기획단 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-03-20',
        'recruitment_end_date' => '2126-04-11',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-19',
        'activity_end_date' => '2026-06-28',

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['캠페인', '시민참여', '초기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['공공캠페인', '기획단', '시민참여', '초기청소년', '중기청소년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'citizen',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['early-youth', 'mid-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 3,
    ],
    [
        'id' => 4, // 모집중
        'title' => '2026년 청소년 성장역량 부트캠프 「스스로 업 프로젝트」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/4.png',
            'alt' => '성장 역량 부트캠프 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-03-24',
        'recruitment_end_date' => '2126-04-08',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-14',
        'activity_end_date' => '2026-04-19',

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['역량성장', '부트캠프', '초등고학년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['역량성장', '부트캠프', '자기개발', '초등 고학년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'competency',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['elementary-high'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 4,
    ],
    [
        'id' => 5, // 모집중
        'title' => '2026년 청소년 리더십 트레이닝 「유스리더 아카데미 5기」 참여자 추가 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/5.png',
            'alt' => '청소년 리더십 트레이닝 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-03-18',
        'recruitment_end_date' => '2126-04-13',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-21',
        'activity_end_date' => '2026-06-05',

        // 비용 (0이면 무료)
        'price' => 20000,

        // 해시태그 (UI 표시용)
        'hashtags' => ['리더십', '역량성장', '후기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['리더십', '역량강화', '성장 프로그램', '후기청소년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'competency',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['late-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 5,
    ],
    [
        'id' => 6, // 모집중
        'title' => '2026년 문화예술 창작 스튜디오 「드로잉 앤 메이킹 클래스」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/6.png',
            'alt' => '문화예술 창작 스튜디오 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-03-27',
        'recruitment_end_date' => '2126-04-15',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-25',
        'activity_end_date' => '2026-05-24',

        // 비용 (0이면 무료)
        'price' => 15000,

        // 해시태그 (UI 표시용)
        'hashtags' => ['문화예술', '창작', '초등저학년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['문화예술', '창작 활동', '예술 체험', '초등 저학년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'culture-art',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['elementary-low'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 6,
    ],
    [
        'id' => 7, // 모집중
        'title' => '2026년 마음성장 관계소통 교실 「마음 잇기 프로젝트」 참가 청소년 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/7.png',
            'alt' => '마음성장 관계소통 교실 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-03-22',
        'recruitment_end_date' => '2126-04-09',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-18',
        'activity_end_date' => '2026-05-23',

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['정서관계', '소통', '초기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['정서관계', '관계소통', '마음성장', '초기청소년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'emotional',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['early-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 7,
    ],
    [
        'id' => 8, // 모집중
        'title' => '2026년 진로직업 탐색 클래스 「미래직업 오픈랩」 참가자 모집(4월)',
        'image' => [
            'src' => '/assets/images/youth-programs/8.png',
            'alt' => '진로직업 탐색 클래스 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-03-28',
        'recruitment_end_date' => '2126-04-17',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-29',
        'activity_end_date' => '2026-05-12',

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['진로직업', '탐색', '시민'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['진로직업', '직업체험', '진로 탐색', '시민 대상'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'career',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['citizen'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 8,
    ],

    // ========================
    // 예정
    // ========================
    [
        'id' => 9, // 예정
        'title' => '[모집예정]2026년 예술 감상 프로젝트 「아트 인사이트 투어」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/9.png',
            'alt' => '예술 감상 프로젝트 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2126-04-18',
        'recruitment_end_date' => '2126-05-02',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-05-10',
        'activity_end_date' => '2026-06-06',

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['문화예술', '감상', '초등고학년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['문화예술', '예술 감상', '전시 체험', '초등 고학년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'culture-art',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['elementary-high'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 9,
    ],
    [
        'id' => 10, // 예정
        'title' => '[모집예정]2026년 시민 소통 관계 워크숍 「함께 말하는 커뮤니티 랩」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/10.png',
            'alt' => '시민 소통 관계 워크숍 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2126-04-24',
        'recruitment_end_date' => '2126-05-09',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-05-20',
        'activity_end_date' => '2026-06-28',

        // 비용 (0이면 무료)
        'price' => 10000,

        // 해시태그 (UI 표시용)
        'hashtags' => ['정서관계', '소통', '시민'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['정서관계', '시민 소통', '관계 형성', '시민 프로그램'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'emotional',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['citizen'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 10,
    ],

    // ========================
    // 마감
    // ========================
    [
        'id' => 11, // 마감
        'title' => '2026년 청소년 성장 챌린지 프로젝트 「스텝업 챌린지 1기」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/11.png',
            'alt' => '청소년 성장 챌린지 프로젝트 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-02-10',
        'recruitment_end_date' => '2026-03-12',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-03-21',
        'activity_end_date' => '2026-05-28',

        // 비용 (0이면 무료)
        'price' => 0,

        // 해시태그 (UI 표시용)
        'hashtags' => ['역량성장', '챌린지', '중기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['역량성장', '챌린지', '성장 프로젝트', '중기청소년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'competency',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['mid-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 11,
    ],
    [
        'id' => 12, // 마감
        'title' => '2026년 시민참여 네트워크 포럼 「유스 보이스 라운드테이블」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/12.png',
            'alt' => '시민참여 네트워크 포럼 안내 이미지',
        ],
        'url' => '#',

        // 모집기간
        'recruitment_start_date' => '2026-02-18',
        'recruitment_end_date' => '2026-03-20',

        // 상시 여부 (상시모집이면 true)
        'is_ongoing' => false,

        // 활동기간
        'activity_start_date' => '2026-04-01',
        'activity_end_date' => '2026-06-20',

        // 비용 (0이면 무료)
        'price' => 30000,

        // 해시태그 (UI 표시용)
        'hashtags' => ['시민참여', '포럼', '후기청소년'],

        // 검색 키워드 (검색용, DB keywords 컬럼으로 치환 가능)
        'search_keywords' => ['시민참여', '네트워크 포럼', '의견 나눔', '후기청소년'],

        // field_code:
        // career           → 진로직업
        // culture-art      → 문화예술
        // emotional        → 정서관계
        // competency       → 역량성장
        // citizen          → 시민참여
        'field_code' => 'citizen',

        // age_group_codes (복수 가능):
        // infant           → 유아
        // elementary-low   → 초등 저학년
        // elementary-high  → 초등 고학년
        // early-youth      → 초기청소년
        // mid-youth        → 중기청소년
        // late-youth       → 후기청소년
        // citizen          → 시민
        'age_group_codes' => ['late-youth'],

        // 활성 여부 (관리용)
        'is_active' => true,

        // 정렬 순서
        'sort_order' => 12,
    ],
];