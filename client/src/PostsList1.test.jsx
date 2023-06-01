import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import PostsList1 from "./PostsList1";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("./api/posts", () => ({
  getPosts: jest.fn(),
}));

describe("PostsList1", () => {
  test("renders the list of posts when data is available", () => {
    const mockPosts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];

    useQuery.mockReturnValueOnce({
      isLoading: false,
      isError: false,
      data: mockPosts,
    });

    const { getByText } = render(<PostsList1 />);

    expect(getByText("Post List 1")).toBeInTheDocument();
    expect(getByText("Post 1")).toBeInTheDocument();
    expect(getByText("Post 2")).toBeInTheDocument();
  });

  test("renders loading state when data is loading", () => {
    useQuery.mockReturnValueOnce({
      isLoading: true,
      isError: false,
    });

    const { getByText } = render(<PostsList1 />);

    expect(getByText("... Loading")).toBeInTheDocument();
  });

  test("renders error state when there is an error", () => {
    useQuery.mockReturnValueOnce({
      isLoading: false,
      isError: true,
    });
    const { getByText } = render(<PostsList1 />);

    expect(getByText("... Error")).toBeInTheDocument();
  });
});
