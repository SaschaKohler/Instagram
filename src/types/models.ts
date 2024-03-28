export interface IPost {
  id: string;
  createdAt: string;
  description?: string | null;
  image?: string | null;
  images?: Array<string> | null;
  video?: string | null;
  nofComments: number;
  nofLikes: number;
  user?: IUser | null;
  comments: IComment[];
}

export interface IComment {
  id: string;
  comment: string;
  user?: IUser | null;
}

export interface IUser {
  id: string;
  name: string;
  email?: string | null;
  username?: string | null;
  bio?: string | null;
  website?: string | null;
  image?: string | null;
  posts: IPost[];
}
