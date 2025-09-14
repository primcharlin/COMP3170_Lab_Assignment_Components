import { useEffect, useState } from "react";
import "./App.css";

function Book({ image, title, authors, url }) {
    return (
        <div className='book normal'>
            <div className='image'>
                <img
                    src={image}
                    alt={title}
                />
            </div>
            <div className='meta'>
                <h3 className='title'>{title}</h3>
                <p className='author'>{authors}</p>
                <a
                    className='learn-more-btn'
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'>
                    Learn More
                </a>
            </div>
        </div>
    );
}

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
                const desiredTitle = "React in Action"; // เปลี่ยนเป็นชื่อหนังสือที่ต้องการ
                const foundBook = json.books.find((b) => b.title === desiredTitle);
                setBooks(foundBook ? [foundBook] : []);
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
                    try {
                        const res = await fetch(
                            `https://api.itbook.store/1.0/books/${b.isbn13}`
                        );
                        const detail = await res.json();
                        return { ...b, authors: detail.authors };
                    } catch {
                        return { ...b, authors: "Unknown Author" };
                    }
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
                            <Book
                                key={b.isbn13}
                                image={b.image}
                                title={b.title}
                                authors={b.authors}
                                url={b.url}
                            />
                        ))}
                    </div>
                )}
            </div>

            <footer className='footer'>
                <p>Primcharlin Kiattipoompun Set G</p>
            </footer>
        </div>
    );
}
