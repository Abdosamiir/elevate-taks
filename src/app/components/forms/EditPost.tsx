import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPostSchema, type CreatePostFormData } from "@/app/schema";
import {
  updatePost,
  selectLocalPostById,
} from "@/app/services/localPostsSlice";
import type { RootState } from "@/app/services/store";
import { InfoIcon, Pencil } from "lucide-react";
import { useEffect } from "react";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) =>
    selectLocalPostById(state, Number(id)),
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
    },
  });

  // Load post data when component mounts
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
        author: post.userId.toString(),
      });
    }
  }, [post, reset]);

  // Redirect if post not found
  useEffect(() => {
    if (!post && id) {
      toast.error("Post not found");
      navigate("/");
    }
  }, [post, id, navigate]);

  const onSubmit = (data: CreatePostFormData) => {
    if (!post) return;

    const updatedPost = {
      id: post.id,
      userId: parseInt(data.author) || 1,
      title: data.title,
      body: data.body,
    };

    dispatch(updatePost(updatedPost));
    toast.success("Post updated successfully!");
    navigate("/");
  };

  if (!post) {
    return null;
  }

  return (
    <div>
      {/* Header - matching PostList style */}
      <div className="bg-white p-4 transition-all duration-200 border-b border-white/20 rounded-t-2xl">
        <h3 className="font-medium text-base flex items-center gap-2">
          <Pencil /> Edit Post
        </h3>
      </div>

      {/* Form */}
      <div className="flex flex-col p-2 md:p-4 md:justify-start md:items-start bg-white/70 backdrop-blur-md rounded-b-2xl h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-6 space-y-4 flex flex-col bg-white rounded-2xl w-full md:w-3/4 h-full"
        >
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              className="bg-zinc-200 border-white/30 focus:bg-white/70"
              {...register("title")}
            />
            {errors.title && (
              <p className="flex items-center gap-2 text-red-700 text-sm mt-1">
                <InfoIcon size={18} /> {errors.title.message}
              </p>
            )}
          </div>

          {/* Body Input */}
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              placeholder="Enter post body"
              className="bg-zinc-200 border-white/30 focus:bg-white/70 min-h-30"
              {...register("body")}
            />
            {errors.body && (
              <p className="flex items-center gap-2 text-red-700 text-sm mt-1">
                <InfoIcon size={18} /> {errors.body.message}
              </p>
            )}
          </div>

          {/* Author Input */}
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="author"
                    className="bg-zinc-200 border-white/30 focus:bg-white/70 w-full"
                  >
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                  <SelectContent position="popper" align="start">
                    <SelectGroup>
                      <SelectItem value="1">Developer</SelectItem>
                      <SelectItem value="2">Designer</SelectItem>
                      <SelectItem value="3">Manager</SelectItem>
                      <SelectItem value="4">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.author && (
              <p className="flex items-center gap-2 text-red-700 text-sm mt-1">
                <InfoIcon size={18} />
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
              variant="default"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
