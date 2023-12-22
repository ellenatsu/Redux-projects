import { useSelector } from "react-redux";

import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  return (
    <section>
      {postStatus === "loading" && <p>Loading...</p>}
      {postStatus === "failed" && <p>{error}</p>}
      {postStatus === "succeeded" &&
        orderedPostIds.map((post) => <PostExcerpt key={post.id} post={post} />)}
    </section>
  );
};
export default PostsList;
