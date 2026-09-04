import type { DeepPartial, Dictionary } from "../dictionary";

const ko: DeepPartial<Dictionary> = {
  nav: {
    tagline: "알마티 렌터카",
    cars: "차량",
    conditions: "대여 조건",
    delivery: "차량 배송",
    about: "회사 소개",
    contact: "문의하기",
    language: "언어",
  },

  carTypes: {
    Economy: "경차·소형",
    Sedan: "세단",
    SUV: "SUV",
    "4WD": "4륜구동",
    Premium: "프리미엄",
  },

  drivetrains: {
    FWD: "전륜",
    RWD: "후륜",
    AWD: "상시사륜",
    "4WD": "사륜",
  },

  hero: {
    titleLine1: "알마티를 달리세요.",
    titleLine2: "차량은 준비됐습니다.",
    subtitle: "알마티 렌터카 서비스",
    ctaPrimary: "차량 고르기",
    ctaSecondary: "문의하기",
    features: [
      { title: "24시간 지원", text: "언제든 연락 주세요" },
      { title: "추가 비용 없음", text: "투명한 요금제" },
    ],
  },

  popular: {
    heading: "인기 차량",
    viewAll: "전체 차량 보기",
    emptyTitle: "차량을 준비하고 있습니다",
    emptyText: "차량은 관리자 페이지에서 등록됩니다. 첫 차량이 공개되는 즉시 이곳에 표시됩니다.",
    emptyCta: "대여 가능 차량 문의",
  },

  why: {
    heading: "{brand}를 선택하는 이유",
    items: [
      { title: "믿을 수 있는 차량", text: "모든 차량은 대여 전 점검과 정비를 마칩니다." },
      { title: "간편한 예약", text: "몇 단계만 거치면 예약이 끝납니다." },
      {
        title: "알마티 내 배송",
        text: "공항, 호텔, 숙소 등 원하시는 장소로 차량을 가져다드립니다.",
      },
      { title: "현지 지원", text: "카자흐스탄 여행 내내 곁에서 도와드립니다." },
      { title: "투명한 요금", text: "명확한 대여 조건, 예상 밖의 비용은 없습니다." },
    ],
  },

  explore: {
    heading: "카자흐스탄 여행",
    subtitle: "놀라운 풍경이 기다리고 있습니다",
    restrictions: "통행 제한 안내",
    cta: "여행에 맞는 차량 찾기",
    kyrgyzstan:
      "저희 차량으로 키르기스스탄까지 여행하실 수 있습니다. 필요한 서류는 모두 준비해 드립니다",
    note: "참고: 일부 목적지는 오프로드에 적합한 차량이 필요합니다.",
    distanceFrom: "알마티에서",
    places: [
      {
        name: "빅 알마티 호수",
        distance: "약 30 km",
        text: "도심에서 한 시간이면 닿는 청록빛 고산 호수입니다. 산길은 거의 끝까지 포장되어 사계절 이동이 수월합니다.",
      },
      {
        name: "차른 캐니언",
        distance: "약 200 km",
        text: "세월이 붉은 사암을 깎아 만든 '성곽의 계곡'입니다. 도로 상태가 좋아 당일 여행으로 다녀오기 좋습니다.",
      },
      {
        name: "콜사이 호수",
        distance: "약 300 km",
        text: "가문비나무 계곡을 따라 계단처럼 이어지는 세 개의 호수입니다. 위쪽 호수까지 가려면 지상고가 높은 차량이 필요합니다.",
      },
      {
        name: "알틴 에멜",
        distance: "약 250 km",
        text: "'노래하는 모래언덕'과 줄무늬가 선명한 악타우 산지가 있습니다. 비포장 구간이 길어 4륜구동을 권해 드립니다.",
      },
    ],
  },

  how: {
    heading: "이용 방법",
    steps: [
      { title: "선택", text: "차량 고르기" },
      { title: "신청", text: "예약 요청" },
      { title: "확인", text: "예약 확정" },
      { title: "수령", text: "차량 인수" },
      { title: "출발", text: "여행 시작" },
    ],
    airportTitle: "알마티에 도착하시나요?",
    airportTitle2: "공항까지 차를 가져다드립니다.",
    airportText: "공항 배송은 24시간 이용 가능합니다.",
    airportCta: "공항 배송 신청",
  },

  reviews: {
    heading: "고객 후기",
    googleLabel: "구글 리뷰",
    seeAllTitle: "구글에서 모든 후기 보기",
    seeAllCta: "후기 보기",
    placeholderNote: "예시 후기입니다. 실제 후기는 이후에 연동됩니다.",
    items: [
      {
        text: "훌륭한 서비스였습니다. 차는 깨끗하고 편안했고 제시간에 도착했어요.",
        author: "아흐메드",
        country: "아랍에미리트",
      },
      {
        text: "대여 절차가 아주 간단했습니다. 직원분들도 친절하고 전문적이었어요.",
        author: "유키",
        country: "일본",
      },
      {
        text: "카자흐스탄에서 경험한 최고의 렌터카였습니다. 강력히 추천합니다!",
        author: "다니엘",
        country: "영국",
      },
    ],
  },

  catalog: {
    title: "보유 차량",
    subtitle: "카자흐스탄 여행에 함께할 차량을 골라 보세요",
    filterType: "차종",
    filterPrice: "1일 요금",
    all: "전체",
    reset: "필터 초기화",
    resultsOne: "대",
    resultsMany: "대",
    minPrice: "1일 최저 요금",
    maxPrice: "1일 최고 요금",
    emptyTitle: "조건에 맞는 차량이 없습니다",
    emptyText: "가격 범위를 넓히거나 차종 필터를 해제해 보세요.",
  },

  card: {
    trunkUnit: "L",
    trunk: "트렁크",
    drivetrain: "구동",
    seats: "인승",
    perDay: "/ 1일",
    book: "예약하기",
    unavailable: "대여 불가",
  },

  contact: {
    call: "전화 걸기",
    wechatTitle: "위챗",
    wechatText: "위챗에서 QR 코드를 스캔하시면 바로 문의하실 수 있습니다.",
  },

  footer: {
    about: "카자흐스탄 알마티 렌터카 서비스",
    address: "알마티 아우에조프 거리 145V",
    mapTitle: "지도에서 보기",
    carsHeading: "차량",
    infoHeading: "안내",
    contactHeading: "연락처",
    support: "24시간 지원",
    info: {
      conditions: "대여 조건",
      delivery: "차량 배송",
      about: "회사 소개",
    },
    photoCredit: "풍경 사진",
    rights: "모든 권리 보유.",
  },

  langModal: {
    title: "언어를 선택하세요",
    subtitle: "메뉴에서 언제든지 변경할 수 있습니다.",
  },

  common: {
    menu: "메뉴",
    close: "닫기",
    previous: "이전",
    next: "다음",
  },
};

export default ko;
