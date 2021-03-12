import React, { useState, useEffect } from "react";

type PaginationProps = {
  totalCount: number,
  getList: any;
};


const Pagination:React.FC<PaginationProps> = ({ totalCount, getList }) => {
  let array:any = [];

  const [arr, setArr] = useState([]);
  const [page, setPage] = useState({
    start: 0,
    end: 5,
    current: 1,
  });

  for (let i = 0; i < totalCount; i++) {
    array.push(i + 1);
  }

  useEffect(() => {
    setArr(array.slice(page.start, page.end));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount]);

  // pagination ++
  const onPageUp = () => {
    if (page.current === totalCount) return;
    if (page.current < arr[arr.length - 1]) {
      setPage({ ...page, current: page.current + 1 });
    } else if (page.current % page.end === 0 && page.end < totalCount) {
      setPage({ start: page.start + 5, end: page.end + 5, current: page.current + 1 });
      setArr(array.slice(page.start + 5, page.end + 5));
    }
    getList(page.current + 1);
  };
  // pagination --
  const onPageDown = () => {
    if (page.current === 1) return;

    if (page.current > arr[0]) {
      setPage({ ...page, current: page.current - 1 });
    } else if (page.current % arr[0] === 0 && page.start >= 1) {
      setPage({ start: page.start - 5, end: page.end - 5, current: page.current - 1 });
      setArr(array.slice(page.start - 5, page.end - 5));
    }
    getList(page.current - 1);
  };

  useEffect(()=>{
    getList(page.current)
  },[page.current])

  return (
    <div className="pagination">
      <button className="prev_btn btn" disabled={page.current === 1} onClick={onPageDown}>
        이전
      </button>
      {arr?.map((pageIndex) => (
        <div
          key={pageIndex}
          className={pageIndex === page.current ? "page now_page" : "page"}
          onClick={() => setPage({ ...page, current: pageIndex })}
        >
          {pageIndex}
        </div>
      ))}
      <button className="next_btn btn" disabled={page.current === totalCount} onClick={onPageUp}>
        다음
      </button>
    </div>
  );
}

export default Pagination