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

export type PostFormDTO = Pick<Post, 'title' | 'excerpt' | 'content' | 'isPublished'>;
