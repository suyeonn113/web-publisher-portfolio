import CheckInGuidePanel from './CheckInGuidePanel';
import { CITY_PROCESS } from './checkInGuideData';

export default function CityTerminalGuide() {
  return <CheckInGuidePanel title="서울역 도심공항터미널" description="인천공항 출발 전에 탑승 수속, 수하물 위탁과 출국 심사를 진행할 수 있습니다.">
    <section><h3>이용 정보</h3><ul><li>서울역 지하 2층 에어서울 카운터</li><li>당일 인천 출발 국제선과 직통열차 이용 승객</li><li>출발 3시간 20분 전 수속 마감</li></ul></section>
    <section><h3>이용 절차</h3><ol>{CITY_PROCESS.map((item, i) => <li key={item}><strong>STEP {i + 1}</strong> {item}</li>)}</ol></section>
    <section><h3>이용 제한</h3><ul><li>공동운항편과 일부 노선</li><li>직원 지원이 필요한 승객</li><li>대형·특수 수하물 위탁</li></ul></section>
  </CheckInGuidePanel>;
}
