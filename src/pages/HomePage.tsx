import { usePosts } from "../feature/post/hooks/usePosts";

const HomePage: React.FC = () => {
  const { posts, loading, error } = usePosts();
  console.log(posts)
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
};

export default HomePage;