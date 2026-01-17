import { postRepository } from '@/repositories/post-repository';

import { groupPostsByYear, sortGroupedPostsByYear } from '@/lib/posts';

export async function PostList() {
  const posts = await postRepository.findAll();
  const groupedPosts = groupPostsByYear(posts);
  const sortedPosts = sortGroupedPostsByYear(groupedPosts);
  return (
    <div>
      {sortedPosts.map(({ year, posts }) => (
        <div key={year}>
          <div>{year}</div>
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <div>{post.title}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
