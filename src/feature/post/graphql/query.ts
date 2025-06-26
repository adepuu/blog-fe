import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query GetPosts($page: Int!, $size: Int!) {
      posts(page: $page, size: $size) {
        nodes {
          id
          content
          title
          status
          slug
          publishedAt
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
`;

export const GET_POST_BY_SLUG = gql`
    query getPostBySlug($slug: String!) {
      post(slug: $slug) {
        content
        createdAt
        id
        slug
        status
        updatedAt
        title
        canonicalUrl
        commentsCount
        coverImageUrl
        excerpt
        isBookmarked
        reactionsCount
        readingTimeMinutes
        publishedAt
        viewsCount
        tags {
          color
          backgroundColor
          createdAt
          description
          followersCount
          id
          isFollowing
          isOfficial
          name
          postsCount
          slug
          updatedAt
        }
      }
    }
`;
