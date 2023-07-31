// import { useEffect } from "react";
const Pagination = ({ nextPage, previousPage, canNextPage, canPrevPage, searchPage }) => {

    return <div className="p-1 bg-white flex justify-center">
        <div className="flex text-primary text-sm">
            <button
                className={"py-1 px-3 border border-gray2 cursor-pointer"}
                // aria-disabled={page === 1}
                style={{
                    // cursor: page === 1 ? "not-allowed" : "pointer",
                    // color: page === 1 ? "gray" : "inherit",
                }}
                onClick={() => {
                    // if (page === 1) return;
                    // setPage(page - 1);
                    previousPage()
                }}
                disabled={!canPrevPage()}
            >
                Prev
            </button>
            <button className="py-1 px-3 bg-primary text-white" >{searchPage}</button>
            {/* <div
                className={`py-1 px-3 border border-gray2 ${page === 1 ? "bg-primary text-white" : ""} `}
                onClick={() => {
                    // if (page === 1) return;
                    // setPage(1);
                }}
                style={{
                    // cursor: length < 30 ? "not-allowed" : "pointer",
                    // color: length < 30 ? "gray" : null,
                }}
            >
                30
            </div>
            <div
                className={`py-1 px-3 border border-gray2 ${page === 2 ? "bg-primary text-white" : ""} `}
                onClick={() => {
                    // if (page === 2) return;
                    // setPage(2);
                }}
                style={{
                    // cursor: length < 60 ? "not-allowed" : "pointer",
                    // color: length < 60 ? "gray" : null,
                }}
            >
                60
            </div>
            <div
                className={`py-1 px-3 border border-gray2 ${page === 3 ? "bg-primary text-white" : ""} `}
                onClick={() => {
                    // if (page === 3) return;
                    // setPage(3);
                }}
                style={{
                    // cursor: length < 90 ? "not-allowed" : "pointer",
                    // color: length < 90 ? "gray" : null,
                }}
            >
                90
            </div>
            <div
                className={`py-1 px-3 border border-gray2 ${page === 4 ? "bg-primary text-white" : ""} `}
                onClick={() => {
                    // if (page === 4) return;
                    // setPage(4);
                }}
                style={{
                    // cursor: length < 120 ? "not-allowed" : "pointer",
                    // color: length < 120 ? "gray" : null,
                }}
            >
                120
            </div>
            <div
                className={`py-1 px-3 border border-gray2 ${page === 5 ? "bg-primary text-white" : ""} `}
                onClick={() => {
                    // if (page === 5) return;
                    // setPage(5);
                }}
                style={{
                    // cursor: length < 150 ? "not-allowed" : "pointer",
                    // color: length < 150 ? "gray" : null,
                }}
            >
                150
            </div> */}
            <button
                className={
                    `py-1 px-3 border border-gray2 cursor-pointer`
                }
                // aria-disabled={hasMore === false}
                onClick={() => {
                    // if (hasMore === false) return;
                    // setPage(page + 1);
                    nextPage();
                }}
                // style={{
                //     cursor: hasMore === false ? "not-allowed" : "pointer",
                //     color: hasMore === false ? "gray" : "inherit",
                // }}
                disabled={!canNextPage()}
            >
                Next
            </button>


        </div>

    </div>
};
export default Pagination;