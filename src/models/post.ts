export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  author: string;
};
