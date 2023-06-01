import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import "@testing-library/jest-dom";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockPostData = {
  id: 1,
  title: "Test Post",
  body: "This is a test post",
  userId: 1,
};

const mockUserData = {
  id: 1,
  name: "Test User",
};

describe("Post Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state while data is being fetched", () => {
    useQuery.mockReturnValue({
      isLoading: true,
    });

    const { getByText } = render(<Post id={1} />);
    expect(getByText("... Loading")).toBeInTheDocument();
  });

  it("renders error state if there is an error fetching data", () => {
    useQuery.mockReturnValue({
      isLoading: false,
      isError: true,
    });

    const { getByText } = render(<Post id={1} />);
    expect(getByText("... Error")).toBeInTheDocument();
  });

  it("renders post and user data when fetched successfully", async () => {
    useQuery.mockReturnValueOnce({
      isLoading: false,
      isError: false,
      data: mockPostData,
    });
    useQuery.mockReturnValueOnce({
      isLoading: false,
      isError: false,
      data: mockUserData,
    });

    const { getByText } = render(<Post id={1} />);

    await waitFor(() => {
      expect(getByText("Test Post")).toBeInTheDocument();
      expect(getByText("Test User")).toBeInTheDocument();
      expect(getByText("This is a test post")).toBeInTheDocument();
    });
  });
});
