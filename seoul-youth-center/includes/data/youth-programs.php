<?php

/**
 * youth-programs mock data
 *
 * field_code:
 * - career       → 진로직업
 * - culture-art  → 문화예술
 * - emotional    → 정서관계
 * - competency   → 역량성장
 * - citizen      → 시민참여
 *
 * age_group_codes (복수 가능):
 * - infant            → 유아
 * - elementary-low    → 초등 저학년
 * - elementary-high   → 초등 고학년
 * - early-youth       → 초기청소년
 * - mid-youth         → 중기청소년
 * - late-youth        → 후기청소년
 * - citizen           → 시민
 */

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

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-04-12',
        'activity_end_date' => null,

        'price' => 0,

        'hashtags' => ['시민참여', '기획', '후기청소년'],
        'search_keywords' => ['시민참여', '기획활동', '청소년 워크숍', '후기청소년', '상시모집'],

        'field_code' => 'citizen',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-04-18',
        'activity_end_date' => null,

        'price' => 10000,

        'hashtags' => ['시민참여', '프로젝트', '중기청소년'],
        'search_keywords' => ['시민참여', '프로젝트 활동', '동네 참여', '중기청소년', '상시모집'],

        'field_code' => 'citizen',
        'age_group_codes' => ['mid-youth'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-03-20',
        'recruitment_end_date' => '2026-04-11',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-19',
        'activity_end_date' => '2026-06-28',

        'price' => 0,

        'hashtags' => ['캠페인', '시민참여', '초기청소년'],
        'search_keywords' => ['공공캠페인', '기획단', '시민참여', '초기청소년', '중기청소년'],

        'field_code' => 'citizen',
        'age_group_codes' => ['early-youth', 'mid-youth'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-03-24',
        'recruitment_end_date' => '2026-04-08',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-14',
        'activity_end_date' => '2026-04-19',

        'price' => 0,

        'hashtags' => ['역량성장', '부트캠프', '초등고학년'],
        'search_keywords' => ['역량성장', '부트캠프', '자기개발', '초등 고학년'],

        'field_code' => 'competency',
        'age_group_codes' => ['elementary-high'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-03-18',
        'recruitment_end_date' => '2026-04-13',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-21',
        'activity_end_date' => '2026-06-05',

        'price' => 20000,

        'hashtags' => ['리더십', '역량성장', '후기청소년'],
        'search_keywords' => ['리더십', '역량강화', '성장 프로그램', '후기청소년'],

        'field_code' => 'competency',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-03-27',
        'recruitment_end_date' => '2026-04-15',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-25',
        'activity_end_date' => '2026-05-24',

        'price' => 15000,

        'hashtags' => ['문화예술', '창작', '초등저학년'],
        'search_keywords' => ['문화예술', '창작 활동', '예술 체험', '초등 저학년'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['elementary-low'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-03-22',
        'recruitment_end_date' => '2026-04-09',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-18',
        'activity_end_date' => '2026-05-23',

        'price' => 0,

        'hashtags' => ['정서관계', '소통', '초기청소년'],
        'search_keywords' => ['정서관계', '관계소통', '마음성장', '초기청소년'],

        'field_code' => 'emotional',
        'age_group_codes' => ['early-youth'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-03-28',
        'recruitment_end_date' => '2026-04-17',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-29',
        'activity_end_date' => '2026-05-12',

        'price' => 0,

        'hashtags' => ['진로직업', '탐색', '시민'],
        'search_keywords' => ['진로직업', '직업체험', '진로 탐색', '시민 대상'],

        'field_code' => 'career',
        'age_group_codes' => ['citizen'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-04-18',
        'recruitment_end_date' => '2026-05-02',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-10',
        'activity_end_date' => '2026-06-06',

        'price' => 0,

        'hashtags' => ['문화예술', '감상', '초등고학년'],
        'search_keywords' => ['문화예술', '예술 감상', '전시 체험', '초등 고학년'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['elementary-high'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-04-24',
        'recruitment_end_date' => '2026-05-09',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-20',
        'activity_end_date' => '2026-06-28',

        'price' => 10000,

        'hashtags' => ['정서관계', '소통', '시민'],
        'search_keywords' => ['정서관계', '시민 소통', '관계 형성', '시민 프로그램'],

        'field_code' => 'emotional',
        'age_group_codes' => ['citizen'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-02-10',
        'recruitment_end_date' => '2026-03-12',
        'is_ongoing' => false,

        'activity_start_date' => '2026-03-21',
        'activity_end_date' => '2026-05-28',

        'price' => 0,

        'hashtags' => ['역량성장', '챌린지', '중기청소년'],
        'search_keywords' => ['역량성장', '챌린지', '성장 프로젝트', '중기청소년'],

        'field_code' => 'competency',
        'age_group_codes' => ['mid-youth'],

        'is_active' => true,
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

        'recruitment_start_date' => '2026-02-18',
        'recruitment_end_date' => '2026-03-20',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-01',
        'activity_end_date' => '2026-06-20',

        'price' => 30000,

        'hashtags' => ['시민참여', '포럼', '후기청소년'],
        'search_keywords' => ['시민참여', '네트워크 포럼', '의견 나눔', '후기청소년'],

        'field_code' => 'citizen',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
        'sort_order' => 12,
    ],

    // ========================
    // 필터용 보강 카드
    // - 연령 전체 커버 1개
    // - 분야 보강 1개
    // - 랜덤 보강 2개
    // ========================
    [
        'id' => 13, // 모집중(필터용)
        'title' => '2026년 청소년 성장탐색 통합 프로그램 「모두의 스텝업 랩」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/13.png',
            'alt' => '청소년 성장탐색 통합 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-30',
        'recruitment_end_date' => '2026-04-19',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-27',
        'activity_end_date' => '2026-06-14',

        'price' => 0,

        'hashtags' => ['역량성장', '통합활동', '전연령'],
        'search_keywords' => ['역량성장', '통합 프로그램', '전연령', '성장탐색', '필터 보강'],

        'field_code' => 'competency',
        'age_group_codes' => ['infant', 'elementary-low', 'elementary-high', 'early-youth', 'mid-youth', 'late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 13,
    ],
    [
        'id' => 14, // 모집중(필터용)
        'title' => '2026년 진로직업 확장 프로그램 「미래탐색 커리어 브릿지」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/14.png',
            'alt' => '진로직업 확장 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-31',
        'recruitment_end_date' => '2026-04-20',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-30',
        'activity_end_date' => '2026-06-08',

        'price' => 10000,

        'hashtags' => ['진로직업', '탐색', '중기청소년'],
        'search_keywords' => ['진로직업', '커리어 탐색', '직업 확장', '중기청소년', '필터 보강'],

        'field_code' => 'career',
        'age_group_codes' => ['elementary-high', 'early-youth', 'mid-youth'],

        'is_active' => true,
        'sort_order' => 14,
    ],
    [
        'id' => 15, // 모집중(필터용)
        'title' => '2026년 문화예술 융합 체험 「컬러 플레이 스튜디오」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/15.png',
            'alt' => '문화예술 융합 체험 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-01',
        'recruitment_end_date' => '2026-04-21',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-03',
        'activity_end_date' => '2026-05-31',

        'price' => 15000,

        'hashtags' => ['문화예술', '체험', '초등저학년'],
        'search_keywords' => ['문화예술', '융합 체험', '창작 놀이', '초등 저학년', '초등 고학년'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['elementary-low', 'elementary-high'],

        'is_active' => true,
        'sort_order' => 15,
    ],
    [
        'id' => 16, // 모집중(필터용)
        'title' => '2026년 관계소통 공감 프로그램 「마음 연결 테이블」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/16.png',
            'alt' => '관계소통 공감 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-02',
        'recruitment_end_date' => '2026-04-22',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-08',
        'activity_end_date' => '2026-06-12',

        'price' => 0,

        'hashtags' => ['정서관계', '소통', '시민'],
        'search_keywords' => ['정서관계', '관계소통', '공감 활동', '후기청소년', '시민 대상'],

        'field_code' => 'emotional',
        'age_group_codes' => ['late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 16,
    ],

    [
        'id' => 17, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 유아 감각놀이 예술교실 「오감 컬러 놀이터」 참여가족 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/17.png',
            'alt' => '유아 감각놀이 예술교실 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-23',
        'recruitment_end_date' => '2026-05-07',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-16',
        'activity_end_date' => '2026-06-13',

        'price' => 0,

        'hashtags' => ['문화예술', '감각놀이', '유아'],
        'search_keywords' => ['유아 프로그램', '감각놀이', '문화예술', '보호자 동반', '모집예정', '필터 보강'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['infant'],

        'is_active' => true,
        'sort_order' => 17,
    ],
    [
        'id' => 18, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 초등 저학년 진로놀이 프로그램 「꿈꾸는 직업 실험실」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/18.png',
            'alt' => '초등 저학년 진로놀이 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-25',
        'recruitment_end_date' => '2026-05-10',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-22',
        'activity_end_date' => '2026-06-19',

        'price' => 5000,

        'hashtags' => ['진로직업', '놀이', '초등저학년'],
        'search_keywords' => ['진로직업', '직업놀이', '초등 저학년', '체험형 프로그램', '모집예정', '필터 보강'],

        'field_code' => 'career',
        'age_group_codes' => ['elementary-low'],

        'is_active' => true,
        'sort_order' => 18,
    ],
    [
        'id' => 19, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 초등 고학년 자기주도 성장캠프 「업그레이드 마이플랜」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/19.png',
            'alt' => '초등 고학년 자기주도 성장캠프 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-28',
        'recruitment_end_date' => '2026-05-14',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-30',
        'activity_end_date' => '2026-06-27',

        'price' => 0,

        'hashtags' => ['역량성장', '자기주도', '초등고학년'],
        'search_keywords' => ['역량성장', '자기주도', '학습동기', '초등 고학년', '모집예정', '필터 보강'],

        'field_code' => 'competency',
        'age_group_codes' => ['elementary-high'],

        'is_active' => true,
        'sort_order' => 19,
    ],
    [
        'id' => 20, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 초기청소년 감정표현 워크숍 「마음 톡톡 스튜디오」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/20.png',
            'alt' => '초기청소년 감정표현 워크숍 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-05-01',
        'recruitment_end_date' => '2026-05-16',
        'is_ongoing' => false,

        'activity_start_date' => '2026-06-01',
        'activity_end_date' => '2026-06-29',

        'price' => 0,

        'hashtags' => ['정서관계', '감정표현', '초기청소년'],
        'search_keywords' => ['정서관계', '감정표현', '마음나눔', '초기청소년', '모집예정', '필터 보강'],

        'field_code' => 'emotional',
        'age_group_codes' => ['early-youth'],

        'is_active' => true,
        'sort_order' => 20,
    ],
    [
        'id' => 21, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 중기청소년 지역참여 프로젝트 「우리동네 액션크루」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/21.png',
            'alt' => '중기청소년 지역참여 프로젝트 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-05-03',
        'recruitment_end_date' => '2026-05-18',
        'is_ongoing' => false,

        'activity_start_date' => '2026-06-07',
        'activity_end_date' => '2026-07-12',

        'price' => 10000,

        'hashtags' => ['시민참여', '프로젝트', '중기청소년'],
        'search_keywords' => ['시민참여', '지역참여', '프로젝트 활동', '중기청소년', '모집예정', '필터 보강'],

        'field_code' => 'citizen',
        'age_group_codes' => ['mid-youth'],

        'is_active' => true,
        'sort_order' => 21,
    ],
    [
        'id' => 22, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 후기청소년 문화기획 프로그램 「유스 컬처 에디터」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/22.png',
            'alt' => '후기청소년 문화기획 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-05-06',
        'recruitment_end_date' => '2026-05-21',
        'is_ongoing' => false,

        'activity_start_date' => '2026-06-14',
        'activity_end_date' => '2026-07-19',

        'price' => 15000,

        'hashtags' => ['문화예술', '기획', '후기청소년'],
        'search_keywords' => ['문화예술', '문화기획', '콘텐츠 제작', '후기청소년', '모집예정', '필터 보강'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
        'sort_order' => 22,
    ],
    [
        'id' => 23, // 모집예정(필터보강)
        'title' => '[모집예정]2026년 시민 진로공유 클래스 「동네 커리어 토크살롱」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/23.png',
            'alt' => '시민 진로공유 클래스 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-05-08',
        'recruitment_end_date' => '2026-05-24',
        'is_ongoing' => false,

        'activity_start_date' => '2026-06-20',
        'activity_end_date' => '2026-07-25',

        'price' => 5000,

        'hashtags' => ['진로직업', '공유', '시민'],
        'search_keywords' => ['진로직업', '커리어 토크', '시민 프로그램', '직업 공유', '모집예정', '필터 보강'],

        'field_code' => 'career',
        'age_group_codes' => ['citizen'],

        'is_active' => true,
        'sort_order' => 23,
    ]

];