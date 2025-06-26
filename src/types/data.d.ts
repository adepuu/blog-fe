// Base types and enums
export type ID = string;

export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN'
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum Timeframe {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  ALL_TIME = 'ALL_TIME'
}

// User types
export interface User {
  id: ID;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  profileImageUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  location?: string;
  role: UserRole;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Computed fields
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

// Tag types
export interface Tag {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  color: string;
  backgroundColor: string;
  isOfficial: boolean;
  postsCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
  
  // Computed fields
  isFollowing: boolean; // For current user
}

// Reaction types
export interface ReactionType {
  id: ID;
  name: string;
  emoji: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Reaction {
  id: ID;
  user: User;
  reactionType: ReactionType;
  createdAt: string;
}

// Comment types
export interface Comment {
  id: ID;
  content: string;
  author: User;
  post: Post;
  parentComment?: Comment;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Computed fields
  repliesCount: number;
  reactionsCount: number;
}

// Post types - Main type with all relationships
export interface Post {
  id: ID;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  canonicalUrl?: string;
  status: PostStatus;
  readingTimeMinutes: number;
  viewsCount: number;
  author: User;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relationships
  tags: Tag[];
  
  // Computed fields
  commentsCount: number;
  reactionsCount: number;
  isBookmarked: boolean; // For current user
}

// Pagination types
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface PostConnection {
  nodes: Post[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CommentConnection {
  nodes: Comment[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface UserConnection {
  nodes: User[];
  pageInfo: PageInfo;
  totalCount: number;
}

// Authentication types
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Input types
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface LoginInput {
  usernameOrEmail: string;
  password: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  canonicalUrl?: string;
  tagNames?: string[];
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImageUrl?: string;
  canonicalUrl?: string;
  tagNames?: string[];
}

export interface UpdateProfileInput {
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  location?: string;
  email?: string;
}

export interface CreateCommentInput {
  postId: ID;
  content: string;
  parentCommentId?: ID;
}

export interface PostFilter {
  status?: PostStatus;
  authorId?: ID;
  tagSlugs?: string[];
  search?: string;
}

// Legacy types
export interface SampleResponse {
  name: string;
  message: string;
  user?: User;
}

// Extended Post type with additional methods for frontend use
export interface PostWithMethods extends Post {
  // Helper methods that might be useful in frontend
  getFormattedPublishedDate(): string;
  getReadingTimeText(): string;
  isPublished(): boolean;
  isDraft(): boolean;
  isArchived(): boolean;
  hasTag(tagSlug: string): boolean;
  getTagNames(): string[];
  getAuthorDisplayName(): string;
  getExcerptOrGenerated(maxLength?: number): string;
}

// Utility types for different states of Post data
export type PostDraft = Omit<Post, 'publishedAt'> & {
  status: PostStatus.DRAFT;
  publishedAt: null;
};

export type PostPublished = Post & {
  status: PostStatus.PUBLISHED;
  publishedAt: string;
};

export type PostArchived = Post & {
  status: PostStatus.ARCHIVED;
};

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  loading: boolean;
}

export type PostApiResponse = ApiResponse<Post>;
export type PostsApiResponse = ApiResponse<PostConnection>;
export type CommentsApiResponse = ApiResponse<CommentConnection>;
export type UsersApiResponse = ApiResponse<UserConnection>;

// Form state types for frontend
export interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl: string;
  canonicalUrl: string;
  tagNames: string[];
}

export interface CommentFormData {
  content: string;
  parentCommentId?: ID;
}

export interface UserProfileFormData {
  displayName: string;
  bio: string;
  profileImageUrl: string;
  githubUrl: string;
  twitterUrl: string;
  websiteUrl: string;
  location: string;
  email: string;
}

// Query and Mutation argument types
export interface PostsQueryArgs {
  filter?: PostFilter;
  page?: number;
  size?: number;
}

export interface CommentsQueryArgs {
  postId: ID;
  page?: number;
  size?: number;
}

export interface UsersQueryArgs {
  search?: string;
  page?: number;
  size?: number;
}

export interface TagsQueryArgs {
  search?: string;
  page?: number;
  size?: number;
}

export interface MyPostsQueryArgs {
  status?: PostStatus;
  page?: number;
  size?: number;
}

export interface FeedQueryArgs {
  page?: number;
  size?: number;
}

export interface TrendingPostsQueryArgs {
  timeframe: Timeframe;
}

// Mutation argument types
export interface CreatePostMutationArgs {
  input: CreatePostInput;
}

export interface UpdatePostMutationArgs {
  id: ID;
  input: UpdatePostInput;
}

export interface CreateCommentMutationArgs {
  input: CreateCommentInput;
}

export interface UpdateCommentMutationArgs {
  id: ID;
  content: string;
}

export interface ReactToPostMutationArgs {
  postId: ID;
  reactionType: string;
}

export interface ReactToCommentMutationArgs {
  commentId: ID;
  reactionType: string;
}

export interface FollowUserMutationArgs {
  userId: ID;
}

export interface FollowTagMutationArgs {
  tagId: ID;
}

export interface CreateTagMutationArgs {
  name: string;
  description?: string;
  color?: string;
}

export interface AddToReadingListMutationArgs {
  postId: ID;
}

// GraphQL operation result types
export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: Array<string | number>;
  extensions?: any;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

// Complete Post with all possible relations loaded
export interface FullPost extends Post {
  // When you need a post with all its relations fully populated
  author: User;
  tags: Tag[];
  // Note: comments and reactions are accessed via separate queries for performance
}

// Minimal Post for lists and previews
export interface PostPreview {
  id: ID;
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  status: PostStatus;
  readingTimeMinutes: number;
  viewsCount: number;
  author: Pick<User, 'id' | 'username' | 'displayName' | 'profileImageUrl'>;
  publishedAt?: string;
  createdAt: string;
  tags: Pick<Tag, 'id' | 'name' | 'slug' | 'color'>[];
  commentsCount: number;
  reactionsCount: number;
  isBookmarked: boolean;
}
