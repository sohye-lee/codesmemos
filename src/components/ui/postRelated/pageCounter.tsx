import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronLeftPipe,
  IconChevronRightPipe,
} from "@tabler/icons-react";

interface PageCounterProps {
  maxPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageCounter({
  maxPage,
  currentPage,
  setCurrentPage,
}: PageCounterProps) {
  const goNext = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goEnd = () => {
    if (currentPage < maxPage) {
      setCurrentPage(maxPage);
    }
  };

  const goFirst = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };
  return (
    <div className="w-full flex flex-col items-center mt-5">
      <div className="flex justify-center items-center gap-3">
        <button
          disabled={currentPage <= 1 && true}
          className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full ${
            currentPage > 1 && " hover:border-blue-600 hover:bg-blue-100 group"
          }`}
          onClick={goFirst}
        >
          <IconChevronLeftPipe
            width={16}
            className={`text-gray-400 ${
              currentPage > 1 && "group-hover:text-blue-600"
            } `}
          />
        </button>
        <button
          disabled={currentPage <= 1 && true}
          className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full ${
            currentPage > 1 && " hover:border-blue-600 hover:bg-blue-100 group"
          }`}
          onClick={goPrevious}
        >
          <IconChevronLeft
            width={16}
            className={`text-gray-400 ${
              currentPage > 1 && "group-hover:text-blue-600"
            } `}
          />
        </button>
        <span className="text-sm text-gray-700">
          {currentPage} of {maxPage}
        </span>
        <button
          disabled={currentPage >= maxPage && true}
          className={`w-8 h-8 flex items-center justify-center border rounded-full ${
            currentPage < maxPage &&
            "border-gray-400 hover:border-blue-600 hover:bg-blue-100 group"
          }`}
          onClick={goNext}
        >
          <IconChevronRight
            width={16}
            className={`text-gray-400 ${
              currentPage < maxPage && "group-hover:text-blue-600"
            } `}
          />
        </button>
        <button
          disabled={currentPage >= maxPage && true}
          className={`w-8 h-8 flex items-center justify-center border rounded-full ${
            currentPage < maxPage &&
            "border-gray-400 hover:border-blue-600 hover:bg-blue-100 group"
          }`}
          onClick={goEnd}
        >
          <IconChevronRightPipe
            width={16}
            className={`text-gray-400 ${
              currentPage < maxPage && "group-hover:text-blue-600"
            } `}
          />
        </button>
      </div>
    </div>
  );
}
