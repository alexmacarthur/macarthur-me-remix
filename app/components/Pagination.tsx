import { Link } from "@remix-run/react";

const Pagination = ({
  hasMore,
  hasPrevious,
  nextPage,
  previousPage,
}: PaginationProps) => {
  const disabledClasses = "pointer-events-none opacity-50";

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <hr className="border-0 block h-1 w-20 bg-purple-400 mb-4" />

      <ul className="flex space-x-3">
        <li>
          <Link to={`/posts/page/${previousPage}`} className={`${
                hasPrevious ? "" : disabledClasses
              } text-base font-light`}>
            Back
          </Link>
        </li>

        <li>
          <Link to={`/posts/page/${nextPage}`} className={`${
                hasMore ? "" : disabledClasses
              } text-base font-light`}>
              Next
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
