import { useParams, useNavigate } from "react-router-dom";
import { useGetPostByIdQuery } from "@/app/services/postsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useGetPostByIdQuery(Number(id));

  console.log(post);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-3/4 bg-white/50" />
        <Skeleton className="h-4 w-1/4 bg-white/50" />
        <Skeleton className="h-32 w-full bg-white/50" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="p-4 bg-red-500/20 backdrop-blur-sm text-center text-white rounded-2xl">
          Error loading post. Please try again.
        </div>
        <Button
          onClick={() => navigate("/")}
          className="mt-4 bg-white/30 hover:bg-white/50"
        >
          ← Back to Posts
        </Button>
      </div>
    );
  }

  return (
    <div className=" shadow-lg mx-auto  h-screen flex flex-col items-start justify-center">
      <div
        className="content-end p-4 sm:p-6 lg:p-8 backdrop-blur-md w-full h-full rounded-t-2xl"
        style={{
          background:
            "linear-gradient(0deg, rgba(33, 96, 154, 0.75) 0%, rgba(0, 37, 74, 0.75) 100%)",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="mb-4 cursor-pointer rounded-full bg-white/70 hover:bg-white/50"
        >
          <ArrowLeft />
          Back to Posts
        </Button>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <p className="text-xs sm:text-sm font-normal text-white my-2 sm:my-4 flex items-center gap-2">
            <User className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            post id : {post.id} - Leanne Graham
          </p>
          <p className="text-xs sm:text-sm font-normal text-white my-2 sm:my-4 flex items-center gap-2">
            <Calendar className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              .replace(/(\d+)/, (day) => {
                const d = parseInt(day);
                const suffix =
                  d % 10 === 1 && d !== 11
                    ? "st"
                    : d % 10 === 2 && d !== 12
                      ? "nd"
                      : d % 10 === 3 && d !== 13
                        ? "rd"
                        : "th";
                return d + suffix;
              })}
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-md w-full h-full rounded-b-2xl">
        <p className="font-normal text-base sm:text-lg leading-relaxed  max-w-prose line-clamp-4 w-full md:w-96 ">
          {post.body}
        </p>
      </div>
    </div>
  );
};

export default PostPage;
