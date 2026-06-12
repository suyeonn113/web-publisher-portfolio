import PreviewFrame from "./PreviewFrame";
import PreviewFallback from "./PreviewFallback";
import { NotFoundPage } from "../../pages/NotFound";

const PreviewStage = ({
  project,
  previewMode,
  step,
  device,
  deviceKey,
  controlMessage,
  onControlStatusChange,
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
        previewMode={previewMode}
        step={step}
        device={device}
        deviceKey={deviceKey}
        onControlStatusChange={onControlStatusChange}
        onUnavailable={onUnavailable}
      />
      {controlMessage && (
        <PreviewFallback message={controlMessage} />
      )}
    </section>
  );
};

export default PreviewStage;
