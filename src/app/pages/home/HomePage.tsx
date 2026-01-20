import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ScrollText, Search } from "lucide-react";

import PostList from "@/app/components/posts/PostList";
import Author from "@/app/components/posts/Author";
import { useGetPostsQuery } from "@/app/services/postsApi";
import PostsPagination from "@/app/components/posts/Pagination";
import { useNavigate } from "react-router-dom";
import type { TPost } from "@/app/schema";

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { data: posts, isLoading, error } = useGetPostsQuery();

  const filteredPosts = useMemo(() => {
    return posts?.filter((post: TPost) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase());

      const matchesAuthor =
        author === "all" || post.userId.toString() === author;

      return matchesSearch && matchesAuthor;
    });
  }, [posts, search, author]);

  const totalPages = Math.ceil((filteredPosts?.length || 0) / ITEMS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleAuthorChange = (value: string) => {
    setAuthor(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-t-2xl">
        <div className="flex items-center gap-2 capitalize font-semibold text-xl">
          <ScrollText /> post list
        </div>
        <Button
          className="flex items-center gap-1 cursor-pointer text-gray-400"
          variant={"ghost"}
          onClick={() => navigate("/create-post")}
        >
          <Plus />
          Create a new post
        </Button>
      </div>

      <div className="flex items-center justify-between gap-10 p-4 bg-white/50 backdrop-blur-lg">
        {/* search input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for a post "
            className="w-full rounded-full bg-white pl-10"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        {/* author dropdown */}
        <Author value={author} onValueChange={handleAuthorChange} />
      </div>

      <PostList
        posts={paginatedPosts}
        isLoading={isLoading}
        error={error ? (error as Error) : null}
      />

      {/* pagination */}
      <PostsPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HomePage;
