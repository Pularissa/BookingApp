import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/global.css';
const Home = () => {
    const navigate = useNavigate();

    const [flightRef, setFlightRef] = useState('');
    const [destination, setDestination] = useState('');

    const handleSearchMatch = (e) => {
        e.preventDefault();

        navigate(
            `/hotel?destination=${encodeURIComponent(
                destination
            )}&flightRef=${encodeURIComponent(flightRef)}`
        );
    };

    return (
        <section className="home-hero">
            <div className="hero-content">

                <h1 className="hero-title">
                    Flight Locked In?
                    <br />

                    <span className="hero-highlight">
                        Secure Your Ground Base Next.
                    </span>

                </h1>

                <p className="hero-description">
                    Enter your transit details to discover luxury hotels
                    matching your destination and arrival schedule.
                </p>

                <form
                    onSubmit={handleSearchMatch}
                    className="search-form"
                >

                    <div className="form-group">

                        <label>
                            FLIGHT / TICKET REFERENCE
                        </label>

                        <input
                            type="text"
                            placeholder="e.g., WB-204"
                            required
                            className="form-input"
                            value={flightRef}
                            onChange={(e) =>
                                setFlightRef(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            ARRIVAL LOCATION
                        </label>

                        <input
                            type="text"
                            placeholder="e.g., Kigali"
                            required
                            className="form-input"
                            value={destination}
                            onChange={(e) =>
                                setDestination(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="book-btn search-btn"
                    >
                        Match Accommodations
                    </button>

                </form>

            </div>
        </section>
    );
};

export default Home;