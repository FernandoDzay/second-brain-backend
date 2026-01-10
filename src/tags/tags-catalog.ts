export const availableTags = ['payments', 'notes', 'tasks'] as const;
export type AvailableTagsType = (typeof availableTags)[number];
