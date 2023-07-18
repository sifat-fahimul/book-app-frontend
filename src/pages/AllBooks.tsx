import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { IBooks } from "../types/globalTypes";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import { Loader } from "../components/Loader";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

export const AllBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { user } = useAppSelector((state: { user: any }) => state.user);

  const {
    data: allBooks,
    isLoading,
    isError,
    isSuccess,
  } = useGetBooksQuery(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQueryValue = e.target.value.toLowerCase();
    setSearchQuery(searchQueryValue);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedYearValue = e.target.value;
    setSelectedYear(selectedYearValue);
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenreValue = e.target.value;
    setSelectedGenre(selectedGenreValue);
  };

  const filteredBooks = allBooks?.data.filter((book: IBooks) => {
    const isMatchingSearch =
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.genre.toLowerCase().includes(searchQuery);
    const isMatchingYear =
      selectedYear === "" ||
      new Date(book.publicationDate).getFullYear().toString() === selectedYear;
    const isMatchingGenre =
      selectedGenre === "" || book.genre === selectedGenre;
    return isMatchingSearch && isMatchingYear && isMatchingGenre;
  });

  const genreOptions: string[] = Array.from(
    new Set(allBooks?.data.map((book: IBooks) => book.genre))
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Something went wrong");
  }

  return (
    <>
      {isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 max-w-7xl mx-auto relative">
          <div className="col-span-1 md:col-span-1 lg:col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky  top-16 lg:static h-[calc(60vh-80px)]">
            <div>
              <h1 className="text-2xl uppercase">Search book</h1>
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="text"
                  placeholder="Search by title, author, or genre"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="text-gray-900 font-semibold w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl uppercase">Filters book</h1>
              <div className="max-w-xl">
                <label htmlFor="year" className="text-sm font-medium t">
                  Publication Year:
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="block text-gray-900 font-semibold w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">All Years</option>
                  {Array.from(
                    new Set(
                      allBooks?.data.map((book: IBooks) =>
                        new Date(book.publicationDate).getFullYear()
                      )
                    )
                  ).map((year) => (
                    <option value={year?.toString()} key={year?.toString()}>
                      {year as number}
                    </option>
                  ))}
                </select>
              </div>
              <div className="max-w-xl">
                <label htmlFor="genre" className="text-sm font-medium t">
                  Genre:
                </label>
                <select
                  id="genre"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  className="block w-full text-gray-900 font-semibold px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">All Genres</option>
                  {genreOptions.map((genre: string) => (
                    <option value={genre} key={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="max-w-xl">
                {user?.email ? (
                  <Link to="/add-new-book">
                    <button className="px-6 py-3 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                      Add New Book
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="px-6 py-3 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                      Add New Book
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-10 pb-8 md:pb-12 lg:pb-0">
            {filteredBooks?.map((book: IBooks) => (
              <div key={book._id} className="card-wrapper">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
