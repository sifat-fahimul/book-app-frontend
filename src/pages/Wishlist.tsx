import BookCard from "../components/BookCard";
import { Loader } from "../components/Loader";
import { useGetWishlistQuery } from "../redux/features/book/bookApi";
// import { useGetWishlistQuery } from "../redux/features/books/bookApi";
import { IBooks } from "../types/globalTypes";
import { toast } from "react-hot-toast";


export const Wishlist = () => {
  const { data, isLoading, isError, isSuccess } = useGetWishlistQuery(null);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Something went wrong");
  }

  return isSuccess ? (
    <div className="flex flex-col-reverse lg:flex-row">
      <div className="flex-1">
        <div className="py-16">
          <div className="xl:container m-auto space-y-12 px-6 md:px-12 lg:px-20">
            <div>
              <h2 className="mt-4 text-center text-2xl font-bold text-gray-900  md:text-4xl">
                Your Wishlist books <br className="sm:block" hidden />
                Books
              </h2>
            </div>
            {data?.data.length > 0 ? (
              <div className="mt-16 grid gap-8 sm:w-2/3 sm:mx-auto md:w-full md:grid-cols-2 md:-mx-8 lg:grid-cols-3">
                {data?.data.map((book: IBooks) => (
                  <BookCard book={book} key={book._id} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-900">
                Your wishlist is empty.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
