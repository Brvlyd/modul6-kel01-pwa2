import React from "react";
import "./index.css";

export default function index({ isShow, data, onCancel }){
    // Fallback image URL - sama dengan yang di card
    const fallbackImage = "https://via.placeholder.com/175x250?text=No+Image";

    return (
        <div className={!isShow ? "hidden" : ""} datacy="modal-delete">
            <div className="modal-bg" onClick={onCancel}></div>
            <div className="modal">
                {data && (
                    <div className="modal-content">
                        <img 
                            src={data.i?.imageUrl || fallbackImage} 
                            alt={data.l || 'Movie poster'}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackImage;
                            }}
                        />
                        <div className="modal-info">
                            <h2>{data.l || 'Untitled'}</h2>
                            <p>{data.q || ''}</p>
                            {data.y && <p>Year: {data.y}</p>}
                            {data.s && <p>Cast: {data.s}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}