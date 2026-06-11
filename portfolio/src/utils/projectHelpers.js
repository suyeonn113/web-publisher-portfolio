import {
  detailTypeMap,
  platformMap,
  responsibilityMap,
  techMap,
  workTypeMap,
} from "../constants/projectOptions";

export const getProjectOptionLabel = (map, key) => map[key] ?? key;

export const getProjectOptionLabels = (map, keys = []) =>
  keys.map((key) => getProjectOptionLabel(map, key));

export const formatProjectPeriod = ({ start, end }) => {
  const formatDate = (date) => date.replace("-", ".");

  return `${formatDate(start)} – ${end ? formatDate(end) : "Present"}`;
};

export const getProjectTechItems = (keys = []) =>
  keys.map((key) => ({
    key,
    label: techMap[key]?.label ?? key,
    Icon: techMap[key]?.Icon,
  }));

export const prepareProjectDetail = (project) => {
  const platformLabels = getProjectOptionLabels(
    platformMap,
    project.platforms,
  );
  const responsibilityLabels = getProjectOptionLabels(
    responsibilityMap,
    project.responsibilities,
  );

  return {
    eyebrow: [
      getProjectOptionLabel(detailTypeMap, project.detailType),
      ...platformLabels,
    ].join(" · "),
    periodLabel: formatProjectPeriod(project.period),
    workTypeLabel: getProjectOptionLabel(workTypeMap, project.workType),
    responsibilityLabels,
    responsibilityLabel: responsibilityLabels.join(" · "),
    techItems: getProjectTechItems(project.tech),
  };
};
