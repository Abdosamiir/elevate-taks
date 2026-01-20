export interface PostListProps {
  posts: TPost[] | undefined;
  isLoading: boolean;
  error: string | null;
}

export interface PostsPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface AuthorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
