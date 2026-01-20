import type { PostsPaginationProps } from "@/app/schema";
import {
  Pagination,
  PaginationContent,
  PaginationDoubleNext,
  PaginationDoublePrevious,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PostsPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PostsPaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const getPageRange = () => {
    const range: (number | string)[] = [];

    // For mobile: show first, current (if not first/last), ellipsis, and last
    if (window.innerWidth < 640) {
      range.push(1);

      if (totalPages > 2) {
        if (currentPage === 1 || currentPage === totalPages) {
          // On first or last page: 1 ... 10
          range.push("ellipsis-1");
        } else if (currentPage === 2) {
          // On second page: 1 2 ... 10
          range.push(2);
          range.push("ellipsis-2");
        } else if (currentPage === totalPages - 1) {
          // On second-to-last: 1 ... 9 10
          range.push("ellipsis-1");
          range.push(currentPage);
        } else {
          // Middle pages: 1 ... 5 ... 10
          range.push("ellipsis-1");
          range.push(currentPage);
          range.push("ellipsis-2");
        }
      }

      if (totalPages > 1) {
        range.push(totalPages);
      }

      return range;
    }

    // For desktop: existing logic
    const delta = 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
      return range;
    }

    range.push(1);

    if (currentPage > 1 + delta + 1) {
      range.push("ellipsis-1");
    }

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    let adjustedStart = start;
    let adjustedEnd = end;

    if (currentPage <= 3) {
      adjustedEnd = 4;
    } else if (currentPage >= totalPages - 2) {
      adjustedStart = totalPages - 3;
    }

    for (
      let i = Math.max(2, adjustedStart);
      i <= Math.min(totalPages - 1, adjustedEnd);
      i++
    ) {
      range.push(i);
    }

    if (currentPage < totalPages - delta - 1) {
      range.push("ellipsis-2");
    }

    range.push(totalPages);

    return range;
  };

  const pages = getPageRange();

  return (
    <div className="py-4 flex items-center justify-center bg-white rounded-b-2xl px-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationDoublePrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 2);
              }}
              className={
                currentPage <= 2 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pages.map((page, index) => (
            <PaginationItem key={typeof page === "string" ? page : index}>
              {typeof page === "number" ? (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                  className={`rounded-full border border-gray-200 ${
                    currentPage === page
                      ? "bg-[#2F80ED] text-primary-foreground"
                      : ""
                  }`}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50 "
                  : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationDoubleNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 2);
              }}
              className={
                currentPage >= totalPages - 1
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PostsPagination;
