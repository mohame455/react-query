import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
const PostsList2 = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  if (postQuery.isLoading) return <h1>...Loading</h1>;
  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;
  return (
    <div>
      <h1>Posts List 2</h1>
      <ol>
        {postQuery.data.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostsList2;
