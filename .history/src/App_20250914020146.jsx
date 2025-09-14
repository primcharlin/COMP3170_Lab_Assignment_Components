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
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(
                    "https://api.itbook.store/1.0/books/9781711470559"
                );
                const json = await res.json();
                setBook(json);
            } catch (e) {
                console.error(e);
            }
        }
        fetchBook();
    }, []);

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>Book Catalog</h1>
            </header>
            <div className='content'>
                <div className='grid'>
                    {book ? (
                        <Book
                            image={book.image}
                            title={book.title}
                            authors={book.authors}
                            url={book.url}
                        />
                    ) : (
                        <p>Loading…</p>
                    )}
                </div>
            </div>
            <footer className='footer'>
                &copy; {new Date().getFullYear()} Book Catalog. All rights reserved.
            </footer>
        </div>
    );
}
