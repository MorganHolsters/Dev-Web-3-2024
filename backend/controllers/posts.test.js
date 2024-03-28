const { fetchAll, postPost, deletePost } = require('./posts');
const Post = require('../models/posts');

jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(() => true),
    })),
}));

jest.mock('../models/posts', () => ({
    fetchAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
}));

describe('Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('fetchAll', () => {
        it('should fetch all posts successfully', async () => {
            const allPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
            Post.fetchAll.mockResolvedValue([allPosts]);

            await fetchAll(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(allPosts);
        });

        it('should handle errors during fetchAll', async () => {
            const error = new Error('Database error');
            Post.fetchAll.mockRejectedValue(error);

            await fetchAll(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('postPost', () => {
        it('should create a new post successfully', async () => {
            const newPost = {
                title: 'New Post',
                body: 'Body of the new post',
                user: 'User123',
            };
            req.body = newPost;
            Post.save.mockResolvedValue();

            await postPost(req, res, next);

            expect(Post.save).toHaveBeenCalledWith(newPost);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: ' publication réussi ' });
        });

        it('should handle errors during postPost', async () => {
            const error = new Error('Database error');
            Post.save.mockRejectedValue(error);

            await postPost(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deletePost', () => {
        it('should delete a post successfully', async () => {
            const postId = '123';
            req.params.id = postId;
            const deleteResponse = { message: 'Post deleted successfully' };
            Post.delete.mockResolvedValue(deleteResponse);

            await deletePost(req, res, next);

            expect(Post.delete).toHaveBeenCalledWith(postId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(deleteResponse);
        });

        it('should handle errors during deletePost', async () => {
            const error = new Error('Database error');
            Post.delete.mockRejectedValue(error);

            await deletePost(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});