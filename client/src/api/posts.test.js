import axios from 'axios'
import { getPost, getPosts, createPost } from "./posts";
jest.mock('axios');

describe('getPosts',()=>{
    test("should return posts data from API", () => {
        let mockedData = [
          {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          },
        ];
        axios.get = jest.fn(() => Promise.resolve({ data: mockedData }));
        return getPosts().then((data) => {
          expect(data).toEqual(mockedData);
      
          expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/posts");
        });
      });
})

describe('getPost', () => {
    test('should return the data from axios response', async () => {
      const expectedData = { id: 1, title: 'Example Post' };
  
      axios.get.mockResolvedValue({ data: expectedData });
  
      const result = await getPost(1);

      expect(result).toEqual(expectedData);
    });
  });

describe("createPost", () => {
  it("should create a post successfully", async () => {
    const postData = {
      title: "Test Title",
      body: "Test Body",
    };

    const responseData = {
      id: 123,
      title: "Test Title",
      body: "Test Body",
      userId: 1,
    };

    axios.post.mockResolvedValueOnce({ data: responseData });

    const result = await createPost(postData);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/posts",
      expect.objectContaining({
        title: "Test Title",
        body: "Test Body",
        userId: 1,
      })
    );
  });

  it("should handle post creation failure", async () => {
    const postData = {
      title: "Test Title",
      body: "Test Body",
    };

    const error = new Error("Post creation failed");
    axios.post.mockRejectedValueOnce(error);

    await expect(createPost(postData)).rejects.toThrow(error);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/posts",
      expect.objectContaining({
        title: "Test Title",
        body: "Test Body",
        userId: 1,
      })
    );
  });
});

  
