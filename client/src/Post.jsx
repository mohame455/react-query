import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/posts";
import { getUser } from "./api/users";

const Post = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  })

  if (postQuery.isLoading) return <h1>... Loading</h1>;
  if (postQuery.isError) return <h1>... Error</h1>;

  return (
    <div>
      <h1>{postQuery.data.title}</h1>
      <h2>
        {userQuery.isLoading
          ? "... Loading"
          : userQuery.isError
          ? "... Error"
          : userQuery.data.name}
      </h2>
      <p>{postQuery.data.body}</p>
    </div>
  );
};

export default Post;
