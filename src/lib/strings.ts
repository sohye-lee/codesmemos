export const message = {
  success: {
    get: 'Successfully loaded!',
    post: 'Successfully created!',
    update: 'Successfully updated!',
  },
  error: {
    get: 'Not found',
    post: 'Unsuccessful. Please try again.',
    update: 'Unsuccessful. Plrease try again.',
  },
};

export const paths = {
 
  client: {
    home() {
      return '/';
    },
    topics() {
      return '/topics'
    },
    topic(slug: string) {
      return `/topics/${slug}`
    },
    posts() {
      return '/posts'
    },
    postInTopic(slug:string) {
      return `/topics/${slug}/posts`
    },
    post(slug: string, postId: string) {
      return `/topics/${slug}/posts/${postId}`
    },
    users() {
      return '/users'
    },
    user(userId: string) {
      return `/users/${userId}`
    }
  },
  server: {
    get: {
      topics() {
        return '/api/topics'
      },
      posts() {
        return '/api/posts'
      },
      users() {
        return '/api/users'
      },
      topic(slug: string) {
        return `/api/topics/${slug}`
      },
      post(slug: string, postId: string) {
        return `/api/topics/${slug}/posts/${postId}`
      },
      user(userId: string) {
        return `/api/users/${userId}`
      }
    },
    post: {
      topic() {
        return '/api/topics'
      },
      post(slug: string) {
        return `/api/topics/${slug}/posts`
      }
    }
  },
};

