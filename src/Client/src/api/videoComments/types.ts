export type VideoComment = {
  id: string;
  videoId: string;
  authorId: string;
  username: string;
  comment: string;
  created: Date;
};

export type VideoCommentForm = {
  videoId: string;
  authorId: string;
  comment: string;
};
