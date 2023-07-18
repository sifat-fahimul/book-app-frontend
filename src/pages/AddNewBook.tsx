import { useForm } from "react-hook-form";
import { useState } from "react";
import { BookData, FormValues } from "../types/globalTypes";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCreateBookMutation } from "../redux/features/book/bookApi";

export const AddNewBook = () => {
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createBook, createBookOptions] = useCreateBookMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const bookData: BookData = { ...data, userEmail: user?.email };
    const result = await createBook(bookData);
    if ("data" in result) {
      reset();
      navigate("/all-books/");
      toast.success("Book created successfully!");
    } else {
      toast.error("Error creating book");
    }
    setIsSubmitting(false);
  };

  // Handle success or error messages after book creation
  if (createBookOptions.isSuccess) {
    toast.success("Book created successfully!");
  } else if (createBookOptions.isError) {
    toast.error("Error creating book");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-lg font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.title ? "border-red-500" : "border-gray-300"
          } text-gray-900`} // Set text color to gray-900
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block mb-2 text-lg font-medium">
          Author
        </label>
        <input
          type="text"
          id="author"
          {...register("author", { required: true })}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.author ? "border-red-500" : "border-gray-300"
          } text-gray-900`} // Set text color to gray-900
        />
        {errors.author && (
          <span className="text-red-500">Author is required</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="genre" className="block mb-2 text-lg font-medium">
          Genre
        </label>
        <input
          type="text"
          id="genre"
          {...register("genre", { required: true })}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.genre ? "border-red-500" : "border-gray-300 "
          } text-gray-900`} // Set text color to gray-900
        />
        {errors.genre && (
          <span className="text-red-500">Genre is required</span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="publicationDate"
          className="block mb-2 text-lg font-medium"
        >
          Publication Date
        </label>
        <input
          type="text"
          id="publicationDate"
          {...register("publicationDate", {
            required: true,
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Invalid publication date format (YYYY-MM-DD)",
            },
          })}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.publicationDate ? "border-red-500" : "border-gray-300"
          } text-gray-900`} // Set text color to gray-900
        />
        {errors.publicationDate && (
          <span className="text-red-500">{errors.publicationDate.message}</span>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 text-lg font-semibold text-white bg-emerald-500 rounded-lg focus:outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
