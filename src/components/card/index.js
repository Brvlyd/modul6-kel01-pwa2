import React from "react";
import "./index.css";

export default function index({ data, onClick }) {
    // Fallback image URL - bisa diganti dengan gambar placeholder yang sesuai
    const fallbackImage = "https://via.placeholder.com/175x250?text=No+Image";

    return (
        <div className="card" onClick={onClick}>
            {data ? (
                <>
                    <figure>
                        <img 
                            src={data.i?.imageUrl || fallbackImage} 
                            alt={data.l || 'Movie poster'} 
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = fallbackImage;
                            }}
                        />
                    </figure>
                    <div className="card-info">
                        <h3>{data.l || 'Untitled'}</h3>
                        <p>{data.q || data.y || 'No additional info'}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}