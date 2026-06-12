import { seoulYouthCenterPreview } from "./seoulYouthCenterPreview";

export const projectPreviews = [
  seoulYouthCenterPreview,
];

export const getProjectPreviewById = (projectId) =>
  projectPreviews.find((preview) => preview.projectId === projectId);
