import type { PostListProps, TPost } from "@/app/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  selectAllLocalPosts,
} from "@/app/services/localPostsSlice";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const PostList = ({ posts, isLoading, error }: PostListProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localPosts = useSelector(selectAllLocalPosts);

  // Check if a post is a local post (can be edited/deleted)
  const isLocalPost = (postId: number) => {
    return localPosts.some((p) => p.id === postId);
  };

  const handleDelete = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation();
    dispatch(deletePost(postId));
    toast.success("Post deleted successfully!");
  };

  const handleEdit = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation();
    navigate(`/edit-post/${postId}`);
  };

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
                className=" bg-white/50 hover:bg-white/70 p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border-b border-white/20 last:border-0 flex items-center justify-between gap-2"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <h3 className="font-medium text-base line-clamp-1 flex-1">
                  {post.title}
                </h3>
                {isLocalPost(post.id) && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => handleEdit(e, post.id)}
                      className="hover:bg-blue-100 text-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => handleDelete(e, post.id)}
                      className="hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
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
