import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
	let postsService: PostsService;
	const post: Omit<Post, "id" | "date"> = {
		text: "Mocked post",
	};

	beforeEach(async () => {
		postsService = new PostsService();

		postsService.create({ text: "Some pre-existing post" });
	});

	it("should add a new post", () => {
		const newPost = postsService.create(post);
    const newPostDate = new Date(newPost.date);
		expect(newPost.id).toEqual("2");
		expect(newPost.text).toEqual(post.text);
		expect(newPostDate).toBeInstanceOf(Date);
	});

	it("should find a post", () => {
		const foundPost = postsService.find("1");
		if (foundPost) {
      const foundPostDate = new Date(foundPost.date);
			expect(foundPost.id).toEqual("1");
			expect(foundPost.text).toEqual("Some pre-existing post");
			expect(foundPostDate).toBeInstanceOf(Date);
		} else {
			fail("Post not found");
		}
	});
  it("should return undefined for non-existent post", () => {
		const foundPost = postsService.find("id");
		expect(foundPost).toBeUndefined();
	});
});
