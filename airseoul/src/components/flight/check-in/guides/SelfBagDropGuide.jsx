import CheckInGuidePanel from './CheckInGuidePanel';
import { BAG_DROP_PROCESS } from './checkInGuideData';

export default function SelfBagDropGuide() {
  return <CheckInGuidePanel title="셀프 백드롭" description="체크인을 완료한 승객이 직접 수하물을 위탁하는 서비스입니다.">
    <section><h3>이용 대상</h3><p>탑승권과 여권을 소지하고 일반 수하물을 위탁하는 승객</p></section>
    <section><h3>이용 절차</h3><ol>{BAG_DROP_PROCESS.map((item, i) => <li key={item}><strong>STEP {i + 1}</strong> {item}</li>)}</ol></section>
    <section><h3>이용 제한</h3><ul><li>연결 구간</li><li>초과·특수 수하물 또는 반려동물</li><li>직원 지원이 필요한 승객</li></ul></section>
    <section><h3>위치와 시간</h3><p>출발 당일 공항 안내를 확인해 주세요.</p></section>
  </CheckInGuidePanel>;
}
