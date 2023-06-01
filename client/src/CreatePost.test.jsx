import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreatePost from "./CreatePost";
import "@testing-library/jest-dom";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("./api/posts", () => ({
  createPost: jest.fn(),
}));

describe("CreatePost component", () => {
  beforeEach(() => {
    useMutation.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
    });

    useQueryClient.mockReturnValue({
      setQueryData: jest.fn(),
      invalidateQueries: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<CreatePost />);
  });


  it("displays loading state when createPostMutation is loading", () => {
    useMutation.mockReturnValueOnce({
      mutate: jest.fn(),
      isLoading: true,
      isError: false,
    });

    render(<CreatePost />);

    expect(screen.getByText("... Loading")).toBeInTheDocument();
  });

  it("displays error state when createPostMutation has error", () => {
    useMutation.mockReturnValueOnce({
      mutate: jest.fn(),
      isLoading: false,
      isError: true,
    });

    render(<CreatePost />);

    expect(screen.getByText("... Error")).toBeInTheDocument();
  });

  it("submits form data correctly", () => {
    const mockMutate = jest.fn();
    const mockSetQueryData = jest.fn();
    const mockInvalidateQueries = jest.fn();
    useMutation.mockReturnValueOnce({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
    });
    useQueryClient.mockReturnValueOnce({
      setQueryData: mockSetQueryData,
      invalidateQueries: mockInvalidateQueries,
    });

    render(<CreatePost />);

    const titleInput = screen.getByLabelText("Title");
    const bodyInput = screen.getByLabelText("Body");
    const createButton = screen.getByText("create");

    fireEvent.change(titleInput, { target: { value: "Test title" } });
    fireEvent.change(bodyInput, { target: { value: "Test body" } });
    fireEvent.click(createButton);

    expect(mockMutate).toHaveBeenCalledWith({
      title: "Test title",
      body: "Test body",
    });
  });
});
