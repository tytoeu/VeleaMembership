import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface IPost {
    title: string;
    body: string;
    userId: number;
}

const headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
};

const fetchPosts = async (page: number = 1) => {
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: headerOptions,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const postPost = async (newPost: IPost) => {
    const url = `https://jsonplaceholder.typicode.com/posts`;

    const response = await fetch(url, {
        method: 'POST',
        headers: headerOptions,
        body: JSON.stringify(newPost),
    });

    if (!response.ok) {
        throw new Error('Failed to create a new post');
    }

    return response.json();
};

const deletePost = async (postId: number) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: headerOptions,
    });

    if (!response.ok) {
        throw new Error('Failed to delete the post');
    }

    return postId;
};

const useGetPost = () => {
    const queryClient = useQueryClient();

    // Infinite Query for Pagination
    const infiniteQuery = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam = 1 }) => await fetchPosts(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length === 0) return undefined;
            return allPages.length + 1;
        }
    });

    // Mutation for Creating a Post
    const createPostMutation = useMutation({
        mutationFn: postPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    // Mutation for Deleting a Post
    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return {
        infiniteQuery,
        createPostMutation,
        deletePostMutation
    };
};

export default useGetPost;
