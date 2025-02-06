export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  role: 'user' | 'moderator' | 'admin';
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  memberCount: number;
  category: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  communityId: string;
  community: Community;
  votes: number;
  commentCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  parentId?: string;
  votes: number;
  createdAt: string;
}