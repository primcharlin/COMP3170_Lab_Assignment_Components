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
    const [visibleCount, setVisibleCount] = useState(2); // Start with 2 books

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await fetch(
                    "https://api.itbook.store/1.0/search/react"
                );
                const json = await res.json();
                setBooks(json.books);
            } catch (e) {
                console.error(e);
            }
        }
        fetchBooks();
    }, []);

    const handleAddBook = () => {
        setVisibleCount((count) => (count < books.length ? count + 1 : count));
    };

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>Book Catalog</h1>
            </header>

            <div className='content'>
                {books.length === 0 ? (
                    <p>Loading…</p>
                ) : (
                    <div className='grid'>
                        <div className='btn-plus'>::after</div>
                        {books.slice(0, visibleCount).map((b) => (
                            <a
                                key={b.isbn13}
                                className='book normal'
                                href={b.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}>
                                <div className='image'>
                                    <img
                                        src={b.image}
                                        alt={b.title}
                                    />
                                </div>
                                <div className='meta'>
                                    <h3 className='title'>{b.title}</h3>
                                    {b.subtitle && (
                                        <p className='subtitle'>{b.subtitle}</p>
                                    )}
                                    <p className='price'>{b.price}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={handleAddBook}>Load More Books</button>

            <footer className='footer'>
                <p>Footer Content</p>
            </footer>
        </div>
    );
}
