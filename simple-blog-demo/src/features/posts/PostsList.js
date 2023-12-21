import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section>
      {postStatus === "loading" && <p>Loading...</p>}
      {postStatus === "failed" && <p>{error}</p>}
      {postStatus === "succeeded" &&
        orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)}
    </section>
  );
};
export default PostsList;
