import { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);
    return (
        <>
            <div class='app-header'>
                <h1>Book Catalog</h1>
            </div>
        </>
    );
}

export default App;
