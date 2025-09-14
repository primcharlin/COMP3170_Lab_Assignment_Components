// import { useState } from "react";
// import "./App.css";

// function App() {
//     const [count, setCount] = useState(0);
//     return (
//         <>
//             <div class='app-header'>
//                 <h1>Book Catalog</h1>
//             </div>

// <div class="content">
//       <div class="btn-plus">::after</div>
//       <div class="book">
//         <div class="image">
//           <img src="https://itbook.store/img/books/9781912047420.png" alt="Book Cover" />
//         </div>
//       </div>
// </div>

// <div class="footer">
//     <p>Footer Content</p>
// </div>

//         </>
//     );
// }

// export default App;

import { useEffect, useState, useMemo } from "react";
import "./App.css";

export default function App() {
    const [query, setQuery] = useState("react");
    const [page, setPage] = useState(1);
    const [data, setData] = useState({ total: "0", page: "1", books: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ดึงข้อมูลจาก API ทุกครั้งที่ query หรือ page เปลี่ยน
    useEffect(() => {
        let alive = true;
        async function fetchBooks() {
            setLoading(true);
            setError("");
            try {
                const url = `https://api.itbook.store/1.0/search/${encodeURIComponent(
                    query || "react"
                )}/${page}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (alive) setData(json);
            } catch (e) {
                if (alive) setError(String(e));
            } finally {
                if (alive) setLoading(false);
            }
        }
        fetchBooks();
        return () => {
            alive = false;
        };
    }, [query, page]);

    const total = Number(data.total || 0);
    const pageCount = useMemo(
        () => (total ? Math.ceil(total / 10) : 0),
        [total]
    );
    const currentPage = Number(data.page || 1);

    return (
        <>
            <div className='app-header'>
                <h1>Book Catalog</h1>
                <div className='search-row'>
                    <input
                        className='search-input'
                        placeholder='Search books (title/author/ISBN)…'
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            <div className='content'>
                {error && <div className='error'>Error: {error}</div>}
                {loading ? (
                    <div className='loading'>Loading…</div>
                ) : data.books?.length ? (
                    <>
                        <div className='grid'>
                            {data.books.map((b) => (
                                <div
                                    className='book'
                                    key={b.isbn13}>
                                    <div className='image'>
                                        <img
                                            src={b.image}
                                            alt={b.title}
                                        />
                                    </div>
                                    <div className='meta'>
                                        <h3 className='title'>{b.title}</h3>
                                        {b.subtitle && (
                                            <p className='subtitle'>
                                                {b.subtitle}
                                            </p>
                                        )}
                                        <p className='price'>{b.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!!pageCount && (
                            <div className='pagination'>
                                <button
                                    className='btn'
                                    disabled={currentPage <= 1}
                                    onClick={() =>
                                        setPage((p) => Math.max(1, p - 1))
                                    }>
                                    Prev
                                </button>
                                <span className='page-info'>
                                    Page {currentPage} of {pageCount}
                                </span>
                                <button
                                    className='btn'
                                    disabled={currentPage >= pageCount}
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(pageCount || 1, p + 1)
                                        )
                                    }>
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='empty'>No results for “{query}”.</div>
                )}
            </div>

            <div className='footer'>
                <p>Footer Content</p>
            </div>
        </>
    );
}
