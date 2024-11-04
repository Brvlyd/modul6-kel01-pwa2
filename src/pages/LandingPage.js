import React, { useState, useEffect } from "react";
import axios from "axios";

// Import components
import Card from "../components/card";
import Modal from "../components/modal";

export default function LandingPage() {
    // Define all states
    const [data, setData] = useState(null);
    const [isLoaded, setisLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("One Piece");
    const [error, setError] = useState(null);
    
    // Modal states
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        const fetchData = async (searchQuery) => {
            setIsLoading(true);
            setError(null); // Reset error state
            try {
                const response = await axios.get(
                    "https://online-movie-database.p.rapidapi.com/auto-complete",
                    {
                        params: { q: searchQuery },
                        headers: {
                            "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
                            "x-rapidapi-key": "9c01a0fdb7msh11114abbbafb822p1cf669jsn57ebd7d3f42c",
                        },
                    }
                );
                
                if (response.status === 200) {
                    // Check if response has data
                    if (response.data && response.data.d && response.data.d.length > 0) {
                        setData(response.data);
                    } else {
                        setError("No results found for this search");
                        setData(null);
                    }
                    setisLoaded(true);
                }
            } catch (err) {
                console.log(err);
                setError("Failed to fetch movies. Please try again.");
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (!isLoaded || query) {
            fetchData(query);
        }
    }, [isLoaded, query]);

    // Handle search function
    const onSearch = (e) => {
        if (e.key === "Enter") {
            setisLoaded(false);
            setQuery(e.target.value);
        }
    };

    // Handle modal click
    const handleClick = (item) => {
        setModalShow(!modalShow);
        setModalItem(item);
    };

    return (
        <main>
            <input
                type="text"
                placeholder="Search film by name"
                onKeyDown={(e) => onSearch(e)}
            />
            <h3 className="title">Search : {query}</h3>
            
            {error ? (
                <p className="error-message">{error}</p>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : !data ? (
                <p>No results found</p>
            ) : (
                <div className="card-container">
                    {data.d.map((item, index) => (
                        <Card 
                            data={item} 
                            key={index} 
                            onClick={() => handleClick(item)} 
                        />
                    ))}
                </div>
            )}
            
            <Modal
                data={modalItem}
                isShow={modalShow}
                onCancel={() => setModalShow(false)}
            />
        </main>
    );
}