export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: string;
};
