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

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await fetch(
                    "https://api.itbook.store/1.0/search/react"
                );
                const json = await res.json();
                console.log(json); // Add this line
                setBooks(json.books.slice(0, 2));
            } catch (e) {
                console.error(e);
            }
        }
        fetchBooks();
    }, []);

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
                        {books.map((b) => (
                            <div
                                key={b.isbn13}
                                className='book normal'>
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
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <footer className='footer'>
                <p>Footer Content</p>
            </footer>
        </div>
    );
}
