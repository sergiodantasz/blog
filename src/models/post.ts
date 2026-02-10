export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  author: string;
};

export type PostFormDTO = Pick<Post, 'title' | 'content' | 'isPublished'>;
