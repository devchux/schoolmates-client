import React, { useEffect, useReducer } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ pagination, limit = 10 }) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    start: 0,
    end: pagination.last_page > limit ? limit : pagination.last_page,
    page: pagination.current_page,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setState({
      start: page - (page % limit),
      end: page - (page % limit) + limit,
      page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, limit, page]);

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          first
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(`?page=1`);
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          href={`?page=${state.page - 1}`}
          onClick={(e) => {
            e.preventDefault();
            if (state.page === 1) return;
            navigate(`?page=${state.page - 1}`);
          }}
        />
      </PaginationItem>
      {Array(pagination.last_page)
        .fill(null)
        .map((_, i) => i + 1)
        .slice(state.start, state.end)
        .map((i) => (
          <PaginationItem key={i} active={state.page === i}>
            <PaginationLink
              href={`?page=${i}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`?page=${i}`);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem>
        <PaginationLink
          next
          href={`?page=${state.page + 1}`}
          onClick={(e) => {
            e.preventDefault();
            if (pagination.last_page === state.page) return;
            navigate(`?page=${state.page + 1}`);
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          last
          onClick={(e) => {
            e.preventDefault();
            navigate(`?page=${pagination.last_page}`);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationComponent;
