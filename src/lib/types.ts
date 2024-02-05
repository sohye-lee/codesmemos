import {
  Comment,
  Language,
  Pocket,
  Post,
  Save,
  Topic,
  User,
} from '@prisma/client';

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

export interface Reply extends Comment {
  user: User;
  children: ExtendedComment[];
  post: Post;
  parent: ExtendedComment;
}

export interface ExtendedComment extends Comment {
  user: User;
  children: ExtendedComment[];
  post: Post;
  parent: ExtendedComment;
}

export interface CommentWithNode extends ExtendedComment {
  node: number;
  replies: CommentWithNode[];
}

export interface ExtendedUser extends User {
  posts: Post[];
  saves: Save[];
  comments: Comment[];
}

export interface ExtendedPocket extends Pocket {
  posts: ExtendedPost[];
}

export interface ExtendedSave extends Save {
  post: ExtendedPost;
  user: User;
}
