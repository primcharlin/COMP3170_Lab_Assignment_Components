import React from "react";
import "./App.css";

export default function BtnPlus({ onClick }) {
    return (
        <div className='btn-plus' onClick={onClick}>
            +
        </div>
    );
}