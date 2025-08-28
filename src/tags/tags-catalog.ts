export const availableTags = ['payments', 'notes'] as const;
export type AvailableTagsType = (typeof availableTags)[number];
