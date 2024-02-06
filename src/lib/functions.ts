import useStore from "@/app/store";
import { CommentWithNode, ExtendedComment } from "./types";

export const dateFormat = (datetime: Date) => {
  return new Date(datetime).toLocaleDateString();
};
interface SortedComment {
  layer: number;
  index: number;
  comment: ExtendedComment;
}
interface SortedComments {
  [key: string]: SortedComment;
}

export function sortReplies(comments: ExtendedComment[]) {
  let sortedComments: SortedComments = {};
  let resultComments = [];

  const getIndex = (layer: number) => {
    (layer * 10) ^ 6;
  };

  let index = 0;
  let layer = 1;

  comments
    .filter((c) => !c.parentId)
    .map((c) => {
      sortedComments[c.id] = {
        layer,
        index: 10 ** 8 * index,
        comment: c,
      };
      index += 1;
    });

  // to revise
  comments
    .filter((c) => c.parentId)
    .map((c) => {
      if (sortedComments[c.parent.id]) {
        const parent = sortedComments[c.parent.id];
        sortedComments[c.id] = {
          layer: parent.layer + 1,
          index: 10 ** 8 * parent.layer + index,
          comment: c,
        };
      } else {
      }
      index += 1;
    });

  return sortedComments;
  return Object.keys(sortedComments).sort((a, b) => {
    return sortedComments[a].index - sortedComments[b].index;
  });
}

export function organizeComments(comments: ExtendedComment[]) {
  let a = comments;
  let b: CommentWithNode[] = [];
  let nodes: number[] = [0];
  for (var c of a) {
    if (!c.parentId) {
      b.push({
        ...c,
        node: 0,
        replies: [],
      });
    }
  }

  const findNodes = () => {
    for (var c of a) {
      if (c.parentId) {
        let parent = b.filter((p) => p.id == c.parentId)[0];
        let newC = {
          ...c,
          node: parent.node + 1,
          replies: [],
        };
        nodes.push(newC.node);

        b.push(newC);
      }
    }
  };

  while (b.length < a.length) {
    findNodes();
  }

  const maxNode = Math.max(...nodes);
  let result: CommentWithNode[] = [];

  for (let i = maxNode; i >= 0; i--) {
    b.filter((p) => p.node == i).map((child) => {
      if (i > 0) {
        let myparent = b.filter((p) => p.id == child.parentId)[0];
        myparent.replies.push(child);
      } else {
        result.push(child);
      }
    });
  }

  if (maxNode == 0) {
    return b;
  }
  return result;
}

export const capitalize = (string: string) => {
  let words = string.split(" ");
  let capitalized = [];
  for (var w of words) {
    const firstLetter = w[0].toUpperCase();
    const theRest = w.slice(1);
    const newW = firstLetter + theRest;
    capitalized.push(newW);
  }
  return capitalized.join(" ");
};

export const getYoutubeVideo = (url: string) => {
  const videoId = url.split("watch?v=")[1];
  if (videoId == null) {
    return "/images/video_not_found.jpg";
  }
  return `https://www.youtube.com/embed/${videoId}`;
};

export const getYoutubeThumbnail = (url: string) => {
  const videoId = url.split("watch?v=")[1];
  if (videoId == null) {
    return "/images/video_not_found.jpg";
  }
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};
