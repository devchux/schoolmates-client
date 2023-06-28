import React, { useEffect, useReducer } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ pagination, limit = 10 }) => {
  const [searchParams] = useSearchParams();
  const query = Number(searchParams.get("page") ?? "0");
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    start: 0,
    end: pagination.last_page > limit ? limit : pagination.last_page,
    page: pagination.current_page,
  });
  const navigate = useNavigate();

  console.log(query);

  useEffect(() => {
    setState({
      start: query > state.end ? query - 1 : state.start,
      end:
        query > state.end
          ? query + limit > pagination.last_page
            ? query + limit
            : pagination.last_page
          : state.end,
      page: query ?? 1,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          first
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setState({
              start: 0,
              end: limit,
              page: 1,
            });
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
            setState({
              start:
                state.page === 1 || state.page - 1 !== state.start
                  ? state.start
                  : state.start - limit,
              end:
                state.page === 1 || state.page - 1 !== state.start
                  ? state.end
                  : state.start,
              page: state.page - 1,
            });
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
                setState({
                  page: i,
                });
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
            setState({
              start: state.page === state.end ? state.end : state.start,
              end:
                state.page === state.end
                  ? pagination.last_page > state.end + limit
                    ? state.end + limit
                    : pagination.last_page
                  : state.end,
              page: state.page + 1,
            });
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
            setState({
              start: pagination.last_page - (pagination.last_page % limit),
              end: pagination.last_page,
              page: pagination.last_page,
            });
            navigate(`?page=${pagination.last_page}`);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationComponent;
