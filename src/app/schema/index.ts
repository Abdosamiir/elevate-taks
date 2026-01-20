import z from "zod";

export interface PostListProps {
  posts: TPost[] | undefined;
  isLoading: boolean;
  error: Error | null;
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

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Post title is required")
    .min(3, "Title must be at least 3 characters"),
  body: z
    .string()
    .min(1, "Post body is required")
    .min(10, "Body must be at least 10 characters"),
  author: z.string().min(1, "Please select an author for this post"),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
