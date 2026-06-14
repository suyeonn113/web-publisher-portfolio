import PreviewFrame from "./PreviewFrame";
import { NotFoundPage } from "../../pages/NotFound";

const PreviewStage = ({
  project,
  step,
  device,
  deviceKey,
  unavailable,
  onUnavailable,
}) => {
  if (unavailable) {
    return <NotFoundPage project={project} />;
  }

  return (
    <section className="preview-stage" aria-label="프리뷰 화면">
      <PreviewFrame
        project={project}
        step={step}
        device={device}
        deviceKey={deviceKey}
        onUnavailable={onUnavailable}
      />
    </section>
  );
};

export default PreviewStage;
