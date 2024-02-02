import { breadcrumbType } from "./types";
export const message = {
  success: {
    get: "Successfully loaded!",
    post: "Successfully created!",
    update: "Successfully updated!",
    delete: "Successfully deleted!",
  },
  error: {
    get: "Not found",
    post: "Unsuccessful. Please try again.",
    update: "Unsuccessful. Please try again.",
    delete: "Unsuccessful. Please try again.",
  },
};

export const paths = {
  client: {
    get: {
      home() {
        return "/";
      },
      topics() {
        return "/topics";
      },
      topic(slug: string) {
        return `/topics/${slug}`;
      },
      languages() {
        return "/languages";
      },
      snippets() {
        return "/?filter=snippet";
      },
      questions() {
        return "/?filter=question";
      },
      resources() {
        return "/?filter=resource";
      },
      hot() {
        return "/?filter=hot";
      },
      new() {
        return "/?filter=new";
      },
      posts() {
        return "/posts";
      },
      postInTopic(slug: string) {
        return `/topics/${slug}/posts`;
      },
      post(slug: string, postId: string) {
        return `/topics/${slug}/posts/${postId}`;
      },
      users() {
        return "/users";
      },
      user(userId: string) {
        return `/users/${userId}`;
      },
      feedback() {
        return "/feedback";
      },
    },
    create: {
      topicCreate() {
        return "/topics/new";
      },
      postCreate() {
        return "/create";
      },
      postCreateInTopic(slug: string) {
        return `/topics/${slug}/posts/new`;
      },
    },
    update: {
      topicUpdate(slug: string) {
        return `/topics/${slug}`;
      },
      postUpdate(postId: string) {
        return `/posts/${postId}`;
      },
    },
  },
  server: {
    get: {
      topics() {
        return "/api/topics";
      },
      posts() {
        return "/api/posts";
      },
      users() {
        return "/api/users";
      },
      topic(slug: string) {
        return `/api/topics/${slug}`;
      },
      post(slug: string, postId: string) {
        return `/api/topics/${slug}/posts/${postId}`;
      },
      user(userId: string) {
        return `/api/users/${userId}`;
      },
    },
    create: {
      topic() {
        return "/api/topics";
      },
      post(slug: string) {
        return `/api/topics/${slug}/posts`;
      },
    },
    update: {
      topic() {
        return "/api/topics";
      },
      post(slug: string) {
        return `/api/topics/${slug}/posts`;
      },
    },
  },
};

export const breadcrumbs: {
  [key: string]: {
    url: string;
    name: string;
  };
} = {
  home: {
    url: "/",
    name: "Home",
  },
  //   snippets: '/?filter=snippets',
  //   questions: '/?filter=questions',
  //   resources: '/?filter=resources',
  //   new: '/?filter=new',
  //   hot: '/?filter=hot',
  //   languages: '/languages',
  //   topics: '/topics',
  snippet: {
    url: "/?filter=snippet",
    name: "Snippets",
  },
  question: {
    url: "/?filter=question",
    name: "Questions",
  },
  resource: {
    url: "/?filter=resource",
    name: "Resources",
  },
  new: {
    url: "/?filter=new",
    name: "Resources",
  },
  hot: {
    url: "/?filter=hot",
    name: "Hot",
  },
  languages: {
    url: "/languages",
    name: "By Language",
  },
  topics: {
    url: "/topics",
    name: "By Topic",
  },
  feedback: {
    url: "/feedback",
    name: "Feedback",
  },
};

export const boxClassName =
  " border border-slate-500 border-r-2 border-b-2 p-3 py-2 ";
