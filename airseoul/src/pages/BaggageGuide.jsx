import { useState } from 'react';
import BaggageTabPanel from '../components/baggage/BaggageTabPanel';
import { BAGGAGE_CONTENT, BAGGAGE_TABS } from '../components/baggage/baggageGuideData';

export default function BaggageGuide() {
  const [activeTab, setActiveTab] = useState('carry-on');
  return <main className="information-page"><div className="information-page__inner"><h1>수하물 안내</h1>
    <div className="information-tabs information-tabs--scroll" role="tablist" aria-label="수하물 안내">{BAGGAGE_TABS.map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'is-active' : ''} key={tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</div>
    <BaggageTabPanel content={BAGGAGE_CONTENT[activeTab]} />
  </div></main>;
}
