const TITLE_TEMPLATE = '%s | Blog';

export function formatTitle(title: string): string {
  return TITLE_TEMPLATE.replace('%s', title);
}

export const TITLE_METADATA = {
  default: 'Blog',
  template: TITLE_TEMPLATE,
} as const;
