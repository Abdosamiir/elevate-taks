import type { PostListProps, TPost } from "@/app/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const PostList = ({ posts, isLoading, error }: PostListProps) => {
  const navigate = useNavigate();
  return (
    <div>
      {/* post list */}
      {isLoading ? (
        <div className=" bg-white/20 backdrop-blur-sm text-center text-white rounded-b-2xl">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/50 p-4 shadow-sm">
              <Skeleton className="size-full h-6 w-3/4 bg-white/50" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/20 backdrop-blur-sm text-center text-white rounded-b-2xl">
          Error loading posts. Please try again.
        </div>
      ) : (
        <div className="flex flex-col bg-white/30 backdrop-blur-md ">
          {posts && posts.length > 0 ? (
            posts.map((post: TPost) => (
              <div
                key={post.id}
                className=" bg-white/50 hover:bg-white/70 p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border-b border-white/20 last:border-0"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <h3 className="font-medium text-base line-clamp-1">
                  {post.title}
                </h3>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-white/70">
              No posts found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
