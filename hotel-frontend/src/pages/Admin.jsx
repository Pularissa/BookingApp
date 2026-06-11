import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/global.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* HERO */}
            <section className="home-hero">
                <div className="hero-content">

                    <h1 className="hero-title">
                        Enjoy Your
                        <br />
                        <span className="hero-highlight">
                            Dream Vacation
                        </span>
                    </h1>

                    <p className="hero-description">
                        Discover luxurious hotels, premium spa experiences,
                        and world-class dining designed to make your stay unforgettable.
                    </p>

                    <div className="search-form">

                        <div className="form-group">
                            <label>Check In</label>

                            <input
                                type="date"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Check Out</label>

                            <input
                                type="date"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Guests</label>

                            <select className="form-input">
                                <option>1 Guest</option>
                                <option>2 Guests</option>
                                <option>3 Guests</option>
                                <option>4 Guests</option>
                            </select>
                        </div>

                        <button
                            className="book-btn"
                            onClick={() => navigate("/hotels")}
                        >
                            Search
                        </button>

                    </div>

                </div>
            </section>

            {/* ROOMS */}

            <section className="rooms container">

                <div className="section-title">
                    <h2>Our Rooms</h2>

                    <p>
                        Choose from our collection of luxury accommodations.
                    </p>
                </div>

                <div className="room-grid">

                    <div className="room-card">
                        <div className="room-image">
                            <img
                                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a"
                                alt=""
                            />
                        </div>

                        <div className="room-content">
                            <h3>Deluxe Room</h3>

                            <p>
                                Elegant rooms with premium amenities and city views.
                            </p>

                            <div className="room-footer">
                                <div className="room-price">
                                    $180
                                </div>

                                <button className="book-btn">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="room-card">
                        <div className="room-image">
                            <img
                                src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
                                alt=""
                            />
                        </div>

                        <div className="room-content">
                            <h3>Luxury Suite</h3>

                            <p>
                                Spacious suites designed for ultimate comfort.
                            </p>

                            <div className="room-footer">
                                <div className="room-price">
                                    $320
                                </div>

                                <button className="book-btn">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="room-card">
                        <div className="room-image">
                            <img
                                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                                alt=""
                            />
                        </div>

                        <div className="room-content">
                            <h3>Presidential Suite</h3>

                            <p>
                                The finest luxury experience for distinguished guests.
                            </p>

                            <div className="room-footer">
                                <div className="room-price">
                                    $550
                                </div>

                                <button className="book-btn">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* SPA */}

            <section className="spa-section">

                <div className="container spa-content">

                    <div className="spa-image">
                        <img
                            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
                            alt=""
                        />
                    </div>

                    <div className="spa-text">

                        <h2>Our Luxury Spa</h2>

                        <p>
                            Relax and rejuvenate with our premium wellness treatments,
                            massages, and spa therapies designed to refresh your body and mind.
                        </p>

                        <button className="book-btn">
                            Discover More
                        </button>

                    </div>

                </div>

            </section>

            {/* RESTAURANT */}

            <section className="restaurant">

                <div className="container restaurant-content">

                    <div>

                        <h2>Our Restaurant</h2>

                        <p>
                            Enjoy gourmet cuisine crafted by world-class chefs
                            using the freshest ingredients.
                        </p>

                        <button className="book-btn">
                            View Menu
                        </button>

                    </div>

                    <div className="spa-image">
                        <img
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                            alt=""
                        />
                    </div>

                </div>

            </section>

            {/* TESTIMONIALS */}

            <section className="testimonials">

                <div className="container">

                    <div className="section-title">
                        <h2>What Our Guests Think</h2>
                    </div>

                    <div className="testimonial-card">

                        <p>
                            "An unforgettable experience! The rooms were beautiful,
                            the staff was attentive, and the spa treatments were amazing."
                        </p>

                        <h4>
                            — Sarah Johnson
                        </h4>

                    </div>

                </div>

            </section>
        </>
    );
};

export default Home;