export type FormValues = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};
export type IBooks = {
  userEmail?: string | null;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: [];
};
export interface BookData {
  userEmail?: string | null;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
}
export interface ReadData {
  userEmail?: string | null;
  readingStatus?: boolean | null;
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
}
export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface SignUpFormInputs {
  email: string;
  password: string;
}
