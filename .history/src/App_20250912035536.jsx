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
                                    <button
                                        style={{
                                            marginTop: "1em",
                                            padding: "0.5em 1em",
                                            background: "teal",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
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
