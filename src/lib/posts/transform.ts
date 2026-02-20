import type { Post } from '@/models/post';

export function reviveDates(post: Post): Post {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
  };
}

export function sortPostsByDate(posts: Post[], direction: 'asc' | 'desc'): Post[] {
  return [...posts].sort((a, b) => {
    const diff = a.createdAt.getTime() - b.createdAt.getTime();
    return direction === 'asc' ? diff : -diff;
  });
}

export function groupPostsByYear(posts: Post[]): Record<string, Post[]> {
  return posts.reduce<Record<string, Post[]>>((groupedPosts, post) => {
    const postYear = new Date(post.createdAt).getFullYear().toString();
    groupedPosts[postYear] ??= [];
    groupedPosts[postYear].push(post);
    return groupedPosts;
  }, {});
}

export function sortGroupedPostsByYear(groupedPosts: Record<string, Post[]>) {
  return Object.entries(groupedPosts)
    .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
    .map(([year, posts]) => ({
      year,
      posts: sortPostsByDate(posts, 'desc'),
    }));
}
