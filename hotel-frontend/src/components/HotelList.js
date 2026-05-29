import React, { useEffect, useState } from "react";
import axios from "axios";
import "../HotelList.css";

const BASE_URL = "http://localhost:8080/hotels";

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortField, setSortField] = useState("name");
    const [totalPages, setTotalPages] = useState(0);

    const fetchHotels = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/paginationAndSorting/${page}/${size}/${sortField}`);
            setHotels(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching hotels", error);
        }
    };

    useEffect(() => { fetchHotels(); }, [page, size, sortField]);

    return (
        <div className="hotel-container">
            <h1>The Hotel Collection</h1>

            <div className="controls">
                <div className="control-group">
                    <label>View</label>
                    <input type="number" value={size} min="1" onChange={(e) => setSize(e.target.value)} style={{ width: '40px' }} />
                </div>

                <div className="control-group">
                    <label>Arrange By</label>
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                        <option value="name">Alphabetical</option>
                        <option value="rating">Rating</option>
                        <option value="pricePerNight">Price</option>
                        <option value="location">Location</option>
                    </select>
                </div>
            </div>

            <table className="hotel-table">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th>Location</th>
                        <th>Rating</th>
                        <th>Per Night</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.map((hotel) => (
                        <tr key={hotel.id}>
                            <td className="hotel-name">{hotel.name}</td>
                            <td>{hotel.location}</td>
                            <td>{hotel.rating} / 5</td>
                            <td className="price-tag">${hotel.pricePerNight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button className="pagination-btn" disabled={page === 0} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                <span className="page-info">Folio {page + 1} of {totalPages}</span>
                <button className="pagination-btn" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default HotelList;