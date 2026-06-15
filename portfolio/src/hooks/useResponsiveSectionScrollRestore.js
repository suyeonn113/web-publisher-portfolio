import {
  useEffect,
  useMemo,
  useRef,
} from "react";

const getSectionElements = (sectionIds) =>
  sectionIds
    .map((sectionId) => document.getElementById(sectionId))
    .filter(Boolean);

const getActiveSectionId = (sectionElements) => {
  if (!sectionElements.length) {
    return "";
  }

  const firstSectionTop =
    sectionElements[0].getBoundingClientRect().top +
    window.scrollY;

  if (window.scrollY + 1 < firstSectionTop) {
    return "";
  }

  const activationLine = window.innerHeight * 0.25;

  return sectionElements.reduce(
    (currentSectionId, sectionElement) => {
      if (
        sectionElement.getBoundingClientRect().top <=
        activationLine
      ) {
        return sectionElement.id;
      }

      return currentSectionId;
    },
    sectionElements[0].id,
  );
};

const scrollToSectionStart = (sectionId) => {
  const targetElement = document.getElementById(sectionId);

  if (!targetElement) {
    return;
  }

  const targetTop =
    targetElement.getBoundingClientRect().top +
    window.scrollY;

  window.scrollTo({
    top: targetTop,
    behavior: "auto",
  });
};

const useResponsiveSectionScrollRestore = (sections = []) => {
  const sectionIds = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items
          .filter((item) => item.showInNav !== false)
          .map((item) => item.id),
      ),
    [sections],
  );

  const activeSectionIdRef = useRef("");
  const resizeSectionIdRef = useRef("");
  const previousWidthRef = useRef(
    typeof window === "undefined" ? 0 : window.innerWidth,
  );
  const resizeTimerRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    if (!sectionIds.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const activeSectionId = getActiveSectionId(
        getSectionElements(sectionIds),
      );

      if (activeSectionId) {
        activeSectionIdRef.current = activeSectionId;
      }
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrameIdRef.current) {
        return;
      }

      animationFrameIdRef.current =
        window.requestAnimationFrame(() => {
          updateActiveSection();
          animationFrameIdRef.current = null;
        });
    };

    const handleResize = () => {
      const nextWidth = window.innerWidth;

      if (nextWidth === previousWidthRef.current) {
        return;
      }

      previousWidthRef.current = nextWidth;

      if (!resizeSectionIdRef.current) {
        resizeSectionIdRef.current =
          activeSectionIdRef.current ||
          getActiveSectionId(getSectionElements(sectionIds));
      }

      window.clearTimeout(resizeTimerRef.current);

      resizeTimerRef.current = window.setTimeout(() => {
        const sectionId = resizeSectionIdRef.current;
        resizeSectionIdRef.current = "";

        if (!sectionId) {
          return;
        }

        window.requestAnimationFrame(() => {
          scrollToSectionStart(sectionId);

          window.setTimeout(() => {
            scrollToSectionStart(sectionId);
            updateActiveSection();
          }, 120);
        });
      }, 160);
    };

    updateActiveSection();

    window.addEventListener("scroll", scheduleActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleActiveSectionUpdate,
      );
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimerRef.current);

      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(
          animationFrameIdRef.current,
        );
      }
    };
  }, [sectionIds]);
};

export default useResponsiveSectionScrollRestore;
