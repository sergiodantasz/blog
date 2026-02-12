export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
};

export type PostFormDTO = Pick<Post, 'title' | 'content' | 'isPublished'>;
