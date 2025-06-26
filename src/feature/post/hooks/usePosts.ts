import { useQuery } from "@apollo/client";
import { usePostsStore } from "../store/postsStore";
import { GET_POST_BY_SLUG, GET_POSTS } from "../graphql/query";
import { useEffect } from "react";

export const usePosts = () => {
    const { posts, loading, error, setPosts, setLoading, setError } = usePostsStore();
    const { data, error: queryError } = useQuery(GET_POSTS, {
        variables: {
            page: 0,
            size: 10,
        },
    });

    useEffect(() => {
        setLoading(true);
        
        if (queryError) {
            setError(queryError);
        } else {
            setError(null);
        }
        
        if (data?.posts?.nodes) {
            setPosts(data.posts.nodes);
        }
        setLoading(false);
    }, [data, queryError, setPosts, setLoading, setError]);
    
    return {
        posts,
        loading,
        error,
    }
}

export const usePost = (slug: string) => {
    const { post, loading, error, setPost, setLoading, setError } = usePostsStore();
    const { data, error: queryError } = useQuery(GET_POST_BY_SLUG, {
        variables: {
            slug,
        },
    });

    useEffect(() => {
        setLoading(true);
        
        if (queryError) {
            setError(queryError);
        } else {
            setError(null);
        }
        
        if (data?.post) {
            setPost(data.post);
        }
        setLoading(false);
    }, [data, queryError, setPost, setLoading, setError]);
    
    return {
        post,
        loading,
        error,
    }
}
