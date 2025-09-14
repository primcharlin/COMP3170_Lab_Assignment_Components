import { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    return (
        <>
            <div class='app-header'>
                <h1>Book Catalog</h1>
            </div>

            <div class='content'>
                <div class='btn-plus'>::after</div>
                <div class='book'>
                    <div class='image'>
                        <img
                            src='https://itbook.store/img/books/9781912047420.png'
                            alt='Book Cover'
                        />
                    </div>
                </div>
            </div>

            <div class='footer'>
                <p>Footer Content</p>
            </div>
        </>
    );
}

export default App;
