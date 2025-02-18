export interface Article {
  id?: string;
  title?: string;
  description?: string;
  creationDate?: string;
  userName?: string;
  likes?: number;
  dislikes?: number;
  comments?: Comment[];
}

export interface Comment {
  id?: number;
  text?: string;
  userName?: string;
  creationDate?: string;
}
