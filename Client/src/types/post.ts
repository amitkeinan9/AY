export interface Author {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  username: string;
}

export interface PostDTO {
  _id: string;
  content?: string;
  image?: string;
  author: Author;
  commentsCount: number;
}

export interface Comment {
  _id: string;
  content: string;
  author: Author;
}

export type PostWithComments = Omit<PostDTO, "commentsCount"> & {
  comments: Comment[];
};
