export interface PostDTO {
  _id: string;
  content: string;
  image?: string;
  author: {
    _id: string;
    email: string;
  };
  commentsCount: number;
}

export interface CommentDTO {
  content: string;
  author: {
    _id: string;
    email: string;
  };
}
