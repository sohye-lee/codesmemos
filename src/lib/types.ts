import { Comment, Language, Post, Save, Topic, User } from '@prisma/client';

export type accountType = 'member' | 'admin';
export type postType = 'snippet' | 'question' | 'resource';
export type saveType = 'save' | 'vote';
export type linkType = 'url' | 'video';

export type WidthType = 'full' | 'wide' | 'medium' | 'small';
export type breadcrumbType =
  | 'Home'
  | 'Snippets'
  | 'Questions'
  | 'Resources'
  | 'New'
  | 'Hot'
  | 'By Topic'
  | 'By Language';

export interface CreatePostForm {
  title: string;
  content: string;
  type: postType;
  note?: string;
  link?: string;
  linkType?: string;
  topicSlug?: string;
  languageName?: string;
  userId: string;
}

export interface ExtendedPost extends Post {
  user: User;
  topic?: Topic;
  language?: Language;
  saves: Save[];
  comments: ExtendedComment[];
}

export interface ExtendedComment extends Comment {
  user: User;
  children: Comment[];
  post: Post;
  parent: Comment;
}