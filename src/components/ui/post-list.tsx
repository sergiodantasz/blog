import { postRepository } from '@/repositories/post-repository';

export async function PostList() {
  const posts = await postRepository.findAll();
  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
