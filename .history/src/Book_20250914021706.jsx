import React from "react";
import "./App.css";

export default function Book({ image, title, authors, url }) {
    return (
        <div className='book normal'>
            <div className='image'>
                <img src={image} alt={title} />
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