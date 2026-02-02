const TITLE_TEMPLATE = '%s | Blog';
const ADMIN_TITLE_TEMPLATE = '%s | Admin | Blog';

export function formatTitle(title: string): string {
  return TITLE_TEMPLATE.replace('%s', title);
}

export const TITLE_METADATA = {
  default: 'Blog',
  template: TITLE_TEMPLATE,
} as const;

export const ADMIN_TITLE_METADATA = {
  default: 'Admin',
  template: ADMIN_TITLE_TEMPLATE,
} as const;
