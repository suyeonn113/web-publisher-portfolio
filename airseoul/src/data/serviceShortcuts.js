import { ROUTES } from '../constants/routes';
import SeatIcon from '../components/icons/SeatIcon';
import BaggageIcon from '../components/icons/BaggageIcon';
import MealIcon from '../components/icons/MealIcon';
import DutyFreeIcon from '../components/icons/DutyFreeIcon';
import CafeMintIcon from '../components/icons/CafeMintIcon';
import InsuranceIcon from '../components/icons/InsuranceIcon';


export const serviceShortcuts = [
  {
    id: 'seat',
    label: '사전 좌석 구매',
    description: '원하는 좌석을 미리 선택해 더 편안하게 여행하세요.',
    icon: SeatIcon,
    iconPlaceholder: 'SEAT',
    to: ROUTES.travel.seat,
  },
  {
    id: 'baggage',
    label: '사전 수하물 구매',
    description: '필요한 수하물을 합리적인 혜택으로 준비하세요.',
    icon: BaggageIcon,
    iconPlaceholder: 'BAG',
    to: ROUTES.travel.baggage,
  },
  {
    id: 'meal',
    label: '기내식 주문',
    description: '여정에 어울리는 기내식을 미리 만나보세요.',
    icon: MealIcon,
    iconPlaceholder: 'MEAL',
    to: ROUTES.travel.meal,
  },
  {
    id: 'duty-free',
    label: '기내 면세품',
    description: '다양한 상품을 합리적인 가격으로 쇼핑하세요.',
    icon: DutyFreeIcon,
    iconPlaceholder: 'DUTY',
    to: ROUTES.travel.dutyFree,
  },
  {
    id: 'cafe-mint',
    label: 'Cafe Mint',
    description: '기내에서 즐기는 산뜻한 음료와 스낵을 확인하세요.',
    icon: CafeMintIcon,
    iconPlaceholder: 'MINT',
    to: ROUTES.travel.cafeMint,
  },
  {
    id: 'insurance',
    label: '여행자 보험',
    description: '예상치 못한 상황까지 든든하게 준비하세요.',
    icon: InsuranceIcon,
    iconPlaceholder: 'SAFE',
    to: ROUTES.travel.insurance,
  },
];
