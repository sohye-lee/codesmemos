import { Comment, Language, Post, Save, Topic, User } from '@prisma/client';
interface ExtendedPost extends Post {
  user: User;
  topic: Topic;
  language: Language;
  saves: Save[];
  comments: Comment[];
}
interface PostItemProps {
  post: ExtendedPost;
}
export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="border border-slate-500 border-r-2 border-b-2 p-3 flex flex-col gap-3">
        
    </div>
  );
}
