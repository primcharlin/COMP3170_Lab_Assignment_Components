import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
    const [books, setBooks] = useState([]);
    const [booksWithAuthors, setBooksWithAuthors] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await fetch(
                    "https://api.itbook.store/1.0/search/react"
                );
                const json = await res.json();
                console.log(json); // Add this line
                setBooks(json.books);
            } catch (e) {
                console.error(e);
            }
        }
        fetchBooks();
    }, []);

    useEffect(() => {
        async function fetchAuthors() {
            const detailedBooks = await Promise.all(
                books.map(async (b) => {
                    const res = await fetch(
                        `https://api.itbook.store/1.0/books/${b.isbn13}`
                    );
                    const detail = await res.json();
                    return { ...b, authors: detail.authors };
                })
            );
            setBooksWithAuthors(detailedBooks);
        }
        if (books.length > 0) fetchAuthors();
    }, [books]);

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>Book Catalog</h1>
            </header>

            <div className='content'>
                {booksWithAuthors.length === 0 ? (
                    <p>Loading…</p>
                ) : (
                    <div className='grid'>
                        <div className='btn-plus'>::after</div>
                        {booksWithAuthors.map((b) => (
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
                                    {b.authors && (
                                        <p className='author'>{b.authors}</p>
                                    )}
                                    <p className='price'>{b.price}</p>
                                    <button
                                        className='learn-more-btn'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(
                                                b.url,
                                                "_blank",
                                                "noopener,noreferrer"
                                            );
                                        }}>
                                        Learn More
                                    </button>
                                </div>
                            </a>
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
