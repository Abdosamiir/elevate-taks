export interface PostListProps {
  posts: any[] | undefined;
  isLoading: boolean;
  error: any;
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
