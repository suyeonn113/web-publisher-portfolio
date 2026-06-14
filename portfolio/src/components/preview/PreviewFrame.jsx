import { useEffect, useRef, useState } from "react";

const getPreviewUrl = (liveUrl, path) => {
  if (!path) {
    return liveUrl;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const basePath = liveUrl.endsWith("/")
    ? liveUrl
    : liveUrl.slice(0, liveUrl.lastIndexOf("/") + 1);
  const relativePath = path.replace(/^\/+/, "");

  return new URL(relativePath, basePath).toString();
};

const getDocumentHeight = (document) => {
  const { body, documentElement } = document;

  return Math.max(
    body?.scrollHeight ?? 0,
    body?.offsetHeight ?? 0,
    documentElement?.clientHeight ?? 0,
    documentElement?.scrollHeight ?? 0,
    documentElement?.offsetHeight ?? 0,
  );
};

const getManualScrollTop = (step, deviceKey) => {
  const scroll = step.scroll?.[deviceKey];

  return typeof scroll === "number" ? scroll : 0;
};

const PreviewFrame = ({
  project,
  step,
  device,
  deviceKey,
  onUnavailable,
}) => {
  const shellRef = useRef(null);
  const iframeRef = useRef(null);
  const measureTimeoutRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(device.frameHeight);
  const [frameScale, setFrameScale] = useState(1);
  const src = getPreviewUrl(project.liveUrl, step.path);

  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return undefined;
    }

    const updateFrameScale = () => {
      const { width } = shell.getBoundingClientRect();
      const nextScale = Math.min(1, width / device.width);

      setFrameScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateFrameScale();

    const resizeObserver = new ResizeObserver(updateFrameScale);
    resizeObserver.observe(shell);

    return () => {
      resizeObserver.disconnect();
    };
  }, [device.width]);

  useEffect(() => {
    setFrameHeight(device.frameHeight);

    return () => {
      if (measureTimeoutRef.current) {
        window.clearTimeout(measureTimeoutRef.current);
      }
    };
  }, [
    device.frameHeight,
    device.width,
    deviceKey,
    src,
  ]);

  const applyManualControl = () => {
    setFrameHeight(device.frameHeight);

    const iframe = iframeRef.current;
    const manualScrollTop = getManualScrollTop(step, deviceKey);

    try {
      const frameWindow = iframe?.contentWindow;

      if (!frameWindow) {
        throw new Error("iframe window is unavailable");
      }

      frameWindow.scrollTo({
        top: manualScrollTop,
        left: 0,
        behavior: "auto",
      });
    } catch {
      // Cross-origin frames may block scroll control. The iframe remains usable.
    }
  };

  const measureFrameHeight = () => {
    try {
      const iframe = iframeRef.current;
      const frameWindow = iframe?.contentWindow;
      const frameDocument = iframe?.contentDocument ?? frameWindow?.document;

      if (!frameDocument) {
        return;
      }

      measureTimeoutRef.current = window.setTimeout(() => {
        setFrameHeight(
          Math.max(device.frameHeight, getDocumentHeight(frameDocument)),
        );
      }, 120);
    } catch {
      // Cross-origin frames cannot be measured.
    }
  };

  const handleLoad = () => {
    applyManualControl();
    measureFrameHeight();
  };

  return (
    <div
      ref={shellRef}
      className="preview-frame-shell"
      data-device={deviceKey}
      style={{
        "--preview-device-width": `${device.width}px`,
        "--preview-frame-height": `${frameHeight}px`,
        "--preview-frame-scale": frameScale,
        "--preview-shell-height": `${Math.min(
          frameHeight * frameScale,
          device.maxShellHeight ?? Number.POSITIVE_INFINITY,
        )}px`,
      }}
    >
      <iframe
        key={`${src}-${device.width}`}
        ref={iframeRef}
        title={`${project.title} ${step.title} preview`}
        src={src}
        width={device.width}
        height={frameHeight}
        onLoad={handleLoad}
        onError={onUnavailable}
      />
    </div>
  );
};

export default PreviewFrame;
