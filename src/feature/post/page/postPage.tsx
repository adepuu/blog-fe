import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePosts";

const PostPage: React.FC = () => {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug!);
  console.log(post)
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
        </div>
      )}
    </div>
  )
}

export default PostPage