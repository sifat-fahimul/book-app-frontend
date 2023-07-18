

import { toast } from "react-hot-toast";
import { IBooks } from "../types/globalTypes";
import { Loader } from "../components/Loader";
import BookCard from "../components/BookCard";
import { useGetLatestBooksQuery } from "../redux/features/book/bookApi";

const TopBooks = () => {
  const { data, isLoading, isError, isSuccess } = useGetLatestBooksQuery(null);

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
              <h2 className="mt-4 text-center text-2xl font-bold   md:text-4xl">
                Top 10 recently books <br className="sm:block" hidden />
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:w-2/3 sm:mx-auto md:w-full md:grid-cols-2 md:-mx-8 lg:grid-cols-4">
              {data?.data.map((book: IBooks) => (
                <div key={book._id} className="card-wrapper">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TopBooks;
