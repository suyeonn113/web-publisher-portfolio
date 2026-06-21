export default function BaggageTabPanel({ content }) {
  return <div className="information-sections"><header><h2>{content.title}</h2><p>{content.intro}</p></header>{content.sections.map(([title, items]) => <section key={title}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>;
}
