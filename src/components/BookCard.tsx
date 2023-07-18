import { FC, useEffect, useState } from "react";
import { IBooks } from "../types/globalTypes";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClockCircle,
  AiFillClockCircle,
} from "react-icons/ai";

import { toast } from "react-hot-toast";
import { Loader } from "./Loader";
import { useCreateReadingListMutation, useCreateWishlistMutation, useRemoveReadingListMutation, useRemoveWishlistMutation } from "../redux/features/book/bookApi";

interface BookCardProps {
  book: IBooks;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const { _id, author, genre, publicationDate, title }: IBooks = book;
  const [createWishlist, { isLoading: createWishlistLoading }] =
    useCreateWishlistMutation();
  const [removeWishlist, { isLoading: removeWishlistLoading }] =
    useRemoveWishlistMutation();
  const [createReading, { isLoading: createReadingLoading }] =
    useCreateReadingListMutation();
  const [removeReading, { isLoading: removeReadingLoading }] =
    useRemoveReadingListMutation();
  const formattedPublicationDate = new Date(
    publicationDate
  ).toLocaleDateString();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddedToReading, setIsAddedToReading] = useState(false);

  const handleWishlist = () => {
    if (isInWishlist) {
      removeWishlist(_id!)
        .unwrap()
        .then(() => {
          setIsInWishlist(false);
          toast("Removed from Wishlist");
          removeBookFromLocalStorage("wishlist", _id!);
        })
        .catch(() => {
          toast.error("Error removing from Wishlist");
        });
    } else {
      createWishlist(book)
        .unwrap()
        .then(() => {
          setIsInWishlist(true);
          toast.success("Added to Wishlist");
          addBookToLocalStorage("wishlist", _id!);
        })
        .catch(() => {
          toast.error("Error adding to Wishlist");
        });
    }
  };

  const handleAddToReading = () => {
    if (isAddedToReading) {
      removeReading(_id!)
        .unwrap()
        .then(() => {
          setIsAddedToReading(false);
          toast("Removed from Reading List");
          removeBookFromLocalStorage("readingList", _id!);
        })
        .catch(() => {
          toast.error("Error removing from Reading List");
        });
    } else {
      createReading(book)
        .unwrap()
        .then(() => {
          setIsAddedToReading(true);
          toast.success("Added to Reading List");
          addBookToLocalStorage("readingList", _id!);
        })
        .catch(() => {
          toast.error("Error adding to Reading List");
        });
    }
  };

  useEffect(() => {
    setIsInWishlist(checkBookInLocalStorage("wishlist", _id!));
    setIsAddedToReading(checkBookInLocalStorage("readingList", _id!));
  }, [_id]);

  const addBookToLocalStorage = (listKey: string, bookId: string) => {
    const storedList = localStorage.getItem(listKey);
    if (storedList) {
      const list = JSON.parse(storedList);
      list.push(bookId);
      localStorage.setItem(listKey, JSON.stringify(list));
    } else {
      localStorage.setItem(listKey, JSON.stringify([bookId]));
    }
  };

  const removeBookFromLocalStorage = (listKey: string, bookId: string) => {
    const storedList = localStorage.getItem(listKey);
    if (storedList) {
      const list = JSON.parse(storedList);
      const updatedList = list.filter((id: string) => id !== bookId);
      localStorage.setItem(listKey, JSON.stringify(updatedList));
    }
  };

  const checkBookInLocalStorage = (listKey: string, bookId: string) => {
    const storedList = localStorage.getItem(listKey);
    if (storedList) {
      const list = JSON.parse(storedList);
      return list.includes(bookId);
    }
    return false;
  };

  if (
    createWishlistLoading ||
    removeWishlistLoading ||
    createReadingLoading ||
    removeReadingLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="h-[400px] p-8 py-12 sm:p-12 rounded-3xl b border border-gray-100 dark:shadow-none  bg-opacity-50 shadow-2xl shadow-gray-600/10">
        <div className="space-y-12 text-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold  transition">{title}</h3>
            <p className="">Author: {author}</p>
            <p className="">Genre: {genre}</p>
            <p className="">Published: {formattedPublicationDate}</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleWishlist}>
                {isInWishlist ? (
                  <AiFillHeart className="text-red-500 text-2xl transition duration-300 group-hover:text-red-700" />
                ) : (
                  <AiOutlineHeart className="text-gray-600  text-2xl transition duration-300 group-hover:text-red-500" />
                )}
              </button>
              <button onClick={handleAddToReading}>
                {isAddedToReading ? (
                  <AiFillClockCircle className="text-emerald-500 text-2xl transition duration-300 group-hover:text-emerald-700" />
                ) : (
                  <AiOutlineClockCircle className="text-gray-600  text-2xl transition duration-300 group-hover:text-emerald-500" />
                )}
              </button>
            </div>

            <Link to={`/book-details/${_id}`}>
              <button className="inline-block px-4 py-2 mt-4 text-white transition duration-300 bg-emerald-500 rounded hover:bg-emerald-600">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
