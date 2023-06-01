import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  const handleSubmit = (e) => {
    console.log("dkhal");
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  };

  if (createPostMutation.isLoading) return <h1>... Loading</h1>;
  if (createPostMutation.isError) return <h1>... Error</h1>;

  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" type="text" ref={bodyRef} />
        </div>
      </form>
      <button disabled={createPostMutation.isLoading} onClick={handleSubmit}>
        {createPostMutation.isLoading ? "Loading" : "create"}
      </button>
    </div>
  );
};

export default CreatePost;
