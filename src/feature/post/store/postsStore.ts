import { create } from "zustand";
import { devtools } from "zustand/middleware"
import type { Post } from "../../../types/data";

interface PostsStore {
    posts: Post[];
    loading: boolean;
    error: Error | null;
    post: Post | null;
    setPosts: (posts: Post[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
    setPost: (post: Post | null) => void;
}

const usePostsStore = create<PostsStore>()(devtools((set) => ({
    posts: [] as Post[],
    loading: false,
    error: null as Error | null,
    post: null as Post | null,
    setPosts: (posts: Post[]) => set({ posts }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: Error | null) => set({ error }),
    setPost: (post: Post | null) => set({ post }),
})));

export { usePostsStore }
