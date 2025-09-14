import { useEffect, useState } from "react";
import Book from "./Book";
import BtnPlus from "./BtnPlus";
import "./App.css";

export default function App() {
    const [booksWithAuthors, setBooksWithAuthors] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const desiredISBNs = ["9781788835015", "9781617293344"];
                const detailedBooks = await Promise.all(
                    desiredISBNs.map(async (isbn) => {
                        const res = await fetch(
                            `https://api.itbook.store/1.0/books/${isbn}`
                        );
                        return await res.json();
                    })
                );
                setBooksWithAuthors(detailedBooks);
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
                {booksWithAuthors.length === 0 ? (
                    <p>Loading…</p>
                ) : (
                    <div className='grid'>
                        <BtnPlus onClick={() => alert("Add book!")} />
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
