import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./ProjectSectionNav.scss";

const ProjectSectionNav = ({
  project,
  sections = [],
}) => {
  const navigationGroups = useMemo(
    () =>
      sections
        .map((section) => ({
          ...section,
          items: section.items.filter(
            (item) => item.showInNav !== false,
          ),
        }))
        .filter((section) => section.items.length > 0),
    [sections],
  );

  const navigationItems = useMemo(
    () =>
      navigationGroups.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          groupNumber: section.number,
        })),
      ),
    [navigationGroups],
  );

  const [activeSectionId, setActiveSectionId] = useState(
    navigationItems[0]?.id ?? "",
  );

  const [
    expandedGroupNumber,
    setExpandedGroupNumber,
  ] = useState(
    navigationGroups[0]?.number ?? "",
  );

  const [isOpen, setIsOpen] = useState(false);

  const [hasReachedStart, setHasReachedStart] =
    useState(false);

  const activeItem = navigationItems.find(
    (item) => item.id === activeSectionId,
  );

  const activeGroupNumber =
    activeItem?.groupNumber ??
    navigationGroups[0]?.number ??
    "";

  /*
   * 스크롤로 활성 섹션이 바뀌면
   * 해당 섹션이 포함된 그룹을 자동으로 펼친다.
   */
  useEffect(() => {
    if (!activeGroupNumber) {
      return;
    }

    setExpandedGroupNumber(activeGroupNumber);
  }, [activeGroupNumber]);

  /*
   * sections 데이터가 변경됐을 때
   * 유효하지 않은 활성 섹션과 그룹을 초기화한다.
   */
  useEffect(() => {
    if (!navigationItems.length) {
      return;
    }

    setActiveSectionId((currentSectionId) => {
      const hasCurrentSection = navigationItems.some(
        (item) => item.id === currentSectionId,
      );

      return hasCurrentSection
        ? currentSectionId
        : navigationItems[0].id;
    });

    setExpandedGroupNumber((currentGroupNumber) => {
      const hasCurrentGroup = navigationGroups.some(
        (section) =>
          section.number === currentGroupNumber,
      );

      return hasCurrentGroup
        ? currentGroupNumber
        : navigationGroups[0].number;
    });
  }, [navigationGroups, navigationItems]);

  useEffect(() => {
    const sectionElements = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sectionElements.length) {
      return undefined;
    }

    const hashSectionId = decodeURIComponent(
      window.location.hash.replace("#", ""),
    );

    const hasHashSection = navigationItems.some(
      (item) => item.id === hashSectionId,
    );

    if (hasHashSection) {
      setActiveSectionId(hashSectionId);
    }

    let animationFrameId = null;

    const updateActiveSection = () => {
      const firstSectionElement = sectionElements[0];

      const firstSectionTop =
        firstSectionElement.getBoundingClientRect().top +
        window.scrollY;

      const nextHasReachedStart =
        window.scrollY + 1 >= firstSectionTop;

      setHasReachedStart(nextHasReachedStart);

      if (!nextHasReachedStart || window.scrollY <= 1) {
        setActiveSectionId(
          sectionElements[0]?.id ?? "",
        );

        return;
      }

      const activationLine =
        window.innerHeight * 0.25;

      const nextActiveSection =
        sectionElements.reduce(
          (
            currentSectionId,
            sectionElement,
          ) => {
            if (
              sectionElement.getBoundingClientRect().top <=
              activationLine
            ) {
              return sectionElement.id;
            }

            return currentSectionId;
          },
          sectionElements[0]?.id ?? "",
        );

      if (nextActiveSection) {
        setActiveSectionId(nextActiveSection);
      }
    };

    const handleScroll = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId =
        window.requestAnimationFrame(() => {
          updateActiveSection();
          animationFrameId = null;
        });
    };

    updateActiveSection();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener(
      "resize",
      handleScroll,
    );

    const handleHashChange = () => {
      const nextSectionId = decodeURIComponent(
        window.location.hash.replace("#", ""),
      );

      const hasSection = navigationItems.some(
        (item) => item.id === nextSectionId,
      );

      if (hasSection) {
        setActiveSectionId(nextSectionId);
      }
    };

    window.addEventListener(
      "hashchange",
      handleHashChange,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );

      if (animationFrameId) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }
    };
  }, [navigationItems]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  const handleGroupToggle = (groupNumber) => {
    setExpandedGroupNumber(
      (currentGroupNumber) =>
        currentGroupNumber === groupNumber
          ? ""
          : groupNumber,
    );
  };

  const handleSectionClick = (
    event,
    sectionId,
    groupNumber,
  ) => {
    event.preventDefault();

    const targetElement =
      document.getElementById(sectionId);

    if (!targetElement) {
      return;
    }

    setExpandedGroupNumber(groupNumber);
    setIsOpen(false);

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(
      null,
      "",
      `#${sectionId}`,
    );
  };

  const handleScrollToTop = () => {
    const firstItem = navigationItems[0];

    setIsOpen(false);
    setActiveSectionId(firstItem?.id ?? "");
    setExpandedGroupNumber(
      firstItem?.groupNumber ?? "",
    );
    setHasReachedStart(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      window.location.pathname,
    );
  };

  if (!navigationItems.length) {
    return null;
  }

  return (
    <aside
      className={[
        "project-section-nav",
        isOpen ? "is-open" : "",
        hasReachedStart
          ? ""
          : "is-before-start",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`${
        project?.title ?? "프로젝트"
      } 목차`}
    >
      <button
        type="button"
        className={[
          "project-section-nav__toggle",
          hasReachedStart ? "motion-fade-up" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={isOpen}
        aria-controls="project-section-nav-panel"
        onClick={() => {
          setIsOpen((currentState) => !currentState);
        }}
      >
        <span className="project-section-nav__toggle-heading">
          Contents
        </span>

        <span className="project-section-nav__toggle-current">
          <span>
            {activeItem?.number ?? "01"}
          </span>

          <span>
            {activeItem?.label ?? "목차"}
          </span>
        </span>
      </button>

      <nav
        id="project-section-nav-panel"
        className={[
          "project-section-nav__panel",
          hasReachedStart ? "motion-fade-up" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="프로젝트 상세 목차"
      >
        <header className="project-section-nav__header">
          <p className="project-section-nav__eyebrow">
            Project Index
          </p>

          {project?.title ? (
            <button
              type="button"
              className="project-section-nav__project-title"
              onClick={handleScrollToTop}
            >
              {project.title}
            </button>
          ) : null}
        </header>

        <ol className="project-section-nav__groups">
          {navigationGroups.map((section) => {
            const isExpanded =
              section.number ===
              expandedGroupNumber;

            const isActiveGroup =
              section.number ===
              activeGroupNumber;

            const itemsId = [
              "project-section-nav-group",
              section.number,
              "items",
            ].join("-");

            return (
              <li
                className={[
                  "project-section-nav__group",
                  isExpanded
                    ? "is-expanded"
                    : "",
                  isActiveGroup
                    ? "is-active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={section.number}
              >
                <button
                  type="button"
                  className="project-section-nav__group-heading"
                  aria-expanded={isExpanded}
                  aria-controls={itemsId}
                  onClick={() => {
                    handleGroupToggle(
                      section.number,
                    );
                  }}
                >
                  <span className="project-section-nav__group-number">
                    {section.number}
                  </span>

                  <span className="project-section-nav__group-title">
                    {section.englishTitle}
                  </span>

                  <span
                    className="project-section-nav__group-indicator"
                    aria-hidden="true"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                <ol
                  id={itemsId}
                  className="project-section-nav__items"
                  hidden={!isExpanded}
                >
                  {section.items.map((item) => {
                    const isActive =
                      item.id === activeSectionId;

                    return (
                      <li
                        className="project-section-nav__item"
                        key={item.id}
                      >
                        <a
                          className={[
                            "project-section-nav__link",
                            isActive
                              ? "is-active"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          href={`#${item.id}`}
                          aria-current={
                            isActive
                              ? "location"
                              : undefined
                          }
                          onClick={(event) => {
                            handleSectionClick(
                              event,
                              item.id,
                              section.number,
                            );
                          }}
                        >
                          <span className="project-section-nav__item-number">
                            {item.number}
                          </span>

                          <span className="project-section-nav__item-label">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
};

export default ProjectSectionNav;