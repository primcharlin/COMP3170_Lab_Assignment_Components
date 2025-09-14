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

import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let alive = true;
        async function load() {
            try {
                // 1) ค้นหาคีย์เวิร์ดเริ่มต้น (react) แล้วเอา 2 เล่มแรก
                const s = await fetch(
                    "https://api.itbook.store/1.0/search/react"
                );
                if (!s.ok) throw new Error(`HTTP ${s.status}`);
                const sj = await s.json();
                const firstTwo = (sj.books || []).slice(0, 2);
                // 2) ดึงรายละเอียดแต่ละเล่มเพื่อให้ได้ authors ตามดีไซน์ตัวอย่าง
                const details = await Promise.all(
                    firstTwo.map(async (b) => {
                        const r = await fetch(
                            `https://api.itbook.store/1.0/books/${b.isbn13}`
                        );
                        const j = await r.json();
                        return { ...b, ...j };
                    })
                );
                if (alive) setBooks(details);
            } catch (e) {
                if (alive) setError(String(e));
            } finally {
                if (alive) setLoading(false);
            }
        }
        load();
        return () => {
            alive = false;
        };
    }, []);

    return (
        <div className='page'>
            <header className='topbar'>
                <h1 className='title'>Book Catalog</h1>
            </header>

            <main className='catalog'>
                {/* Placeholder ช่องแรก (New) ให้เหมือนภาพตัวอย่าง */}
                <div className='card placeholder'>
                    <span>New</span>
                </div>

                {loading && <div className='status'>Loading…</div>}
                {error && <div className='status error'>{error}</div>}

                {!loading &&
                    !error &&
                    books.map((b, idx) => (
                        <BookCard
                            key={b.isbn13}
                            book={b}
                            featured={idx === 0}
                        />
                    ))}
            </main>

            <footer className='bottombar'>© Yves Rene Shema, 2025</footer>
        </div>
    );
}

function BookCard({ book, featured }) {
    return (
        <article className={`card book ${featured ? "featured" : "normal"}`}>
            <div className='cover'>
                <img
                    src={book.image}
                    alt={book.title}
                />
            </div>
            <div className='authorbar'>by {book.authors || "Unknown"}</div>
            <a
                className='cta'
                href={book.url}
                target='_blank'
                rel='noreferrer'>
                Learn more
            </a>
        </article>
    );
}
