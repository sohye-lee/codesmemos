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
  home() {
    return '/';
  },
  topicShowPath(slug: string) {
    return `/topics/slug`;
  },
  topicPostPath() {
    return '/topics';
  },
  postShowAllPath() {
    return '/posts';
  },
  postShowBySlugPath(slug: string) {
    return `/topics/${slug}/posts`;
  },
  postPostPath(slug: string) {
    return `/topics/${slug}/posts`;
  },
};
