import { Post } from '@/models/post';

export function reviveDates(post: Post): Post {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
  };
}

export function sortPostsByDate(posts: Post[], direction: 'asc' | 'desc') {
  return [...posts].sort((a, b) => {
    const diff = b.createdAt.getTime() - a.createdAt.getTime();
    return direction === 'asc' ? diff : -diff;
  });
}

export function groupPostsByYear(posts: Post[]) {
  return posts.reduce<Record<string, Post[]>>((groupedPosts, post) => {
    const postYear = new Date(post.createdAt).getFullYear().toString();
    groupedPosts[postYear] ??= [];
    groupedPosts[postYear].push(post);
    return groupedPosts;
  }, {});
}

export function sortGroupedPostsByYear(groupedPosts: Record<string, Post[]>) {
  return Object.entries(groupedPosts)
    .sort((a, b) => {
      const diff = b[0].localeCompare(a[0]);
      return diff;
    })
    .map(([year, posts]) => ({
      year,
      posts: sortPostsByDate(posts, 'asc'),
    }));
}
