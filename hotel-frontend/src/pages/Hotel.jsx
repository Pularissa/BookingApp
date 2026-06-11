import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hotelService } from '../Services/hotelService';
import { authService } from '../Services/authService'; 
import HotelList from '../components/HotelList';
import '../Styles/global.css';

const Hotel = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const URLDestination = queryParams.get('destination') || '';
  const URLFlightRef = queryParams.get('flightRef') || '';
  const navigate = useNavigate();

  const [hotel, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔢 Pagination Component States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // Change this to alter capacity scales per segment page View
  
  /* Checkout Pipeline Steps:
     1 = Browse & Filter List
     2 = View Detailed Asset Features & Bedrooms
     3 = Match Flight Details Form
     4 = Secure Transaction Authorization Summary
  */
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  
  // Booking Form State Tracking Fields
  const [bookingForm, setBookingForm] = useState({
    flightReference: URLFlightRef, 
    checkInDate: '', 
    checkoutDate: '', 
    guests: 1
  });

  // 🚀 UPDATED: Handles clean extraction of paginated content objects or raw arrays
  useEffect(() => {
    setLoading(true);
    
    // Requesting page index parameters from your service architecture
    hotelService.getAllHotels(currentPage, 8)
        .then(data => {
            console.log("Verified Postman-style payload in React:", data);
            
            let rawList = [];
            
            // 🎯 FIXED DATA UNPACKING MAP
            // Since Postman proves your backend returns a flat array directly:
            if (Array.isArray(data)) {
                rawList = data;
                setTotalPages(1); // Set default pagination limit since it's a flat list
            } else if (data && data.content) {
                // Fallback protection container in case pagination parameters become active
                rawList = data.content;
                setTotalPages(data.totalPages || 1);
            }

            // 🔍 BULLETPROOF LOCATION FILTER
            if (URLDestination && URLDestination.trim() !== "") {
                const searchTarget = URLDestination.trim().toLowerCase();
                const filtered = rawList.filter(h => 
                    h.location && h.location.toLowerCase().includes(searchTarget)
                );
                setHotels(filtered);
            } else {
                // If no search filter is active in the URL, load all entries into the view deck
                setHotels(rawList);
            }
        })
        .catch(err => {
            console.error("UI binding synchronization failure:", err);
            setHotels([]);
        })
        .finally(() => setLoading(false));
        
}, [currentPage, URLDestination]); // Triggers database requests whenever page scales change

  // Sync state when incoming flight context changes
  useEffect(() => {
    setBookingForm(prev => ({ ...prev, flightReference: URLFlightRef }));
  }, [URLFlightRef]);

  const handleSelectHotel = (hotel) => {
    const enrichedHotel = {
      ...hotel,
      assets: hotel.assets || ["High-Speed Wi-Fi", "Infinity Swimming Pool", "Wellness Spa & Gym", "24/7 Airport Shuttle"],
      bedrooms: hotel.bedrooms || [
        { type: "King Deluxe Suite", description: "1 Premium Double King Bed, Ocean View Balcony", capacity: "2 Adults" },
        { type: "Executive Double Twin", description: "2 Single Twin Beds, Workspace Desk Setup", capacity: "2 Adults" }
      ]
    };
    setSelectedHotel(enrichedHotel);
    setCurrentStep(2);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!authService.isAuthenticated()) {
      alert("Authentication token missing. Please sign in to finalize booking spaces.");
      navigate('/auth/login');
      return;
    }
    setCurrentStep(4);
  };

  const handleFinalizeBooking = async () => {
    const dataPayload = {
      hotelId: selectedHotel.id,
      flightReference: bookingForm.flightReference,
      checkInDate: bookingForm.checkInDate,
      checkoutDate: bookingForm.checkoutDate,
      totalPaid: selectedHotel.pricePerNight * 2 
    };

    try {
      await hotelService.bookHotel(dataPayload);
      alert(`Transaction Authorized! Suite successfully secured at ${selectedHotel.name}.`);
      
      setCurrentStep(1);
      setSelectedHotel(null);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Booking dropped. Verify your active authorization token session state.");
    }
  };

  return (
    <div className="container" style={{ padding: '7rem 1rem 2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Visual Tracking Stepper Component Header */}
      <div className="stepper" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span> Select Space
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span> View Assets
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span> Match Flight
        </div>
        <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
          <span className="step-number">4</span> Checkout
        </div>
      </div>

      {/* STEP 1: PRESENTATION GRID LIST */}
      {currentStep === 1 && (
        <>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Available Spaces near your Terminal</h2>
          {URLDestination && <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Filtering allocations for arrival target: <span style={{color: 'var(--text-primary)', fontWeight: 600}}>"{URLDestination}"</span></p>}
          
          {loading ? (
            <p style={{ color: 'var(--text-secondary)' }}>Filtering database tables...</p>
          ) : hotel.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', margin: '2rem 0' }}>No active lodgings mapped in this allocation table context segment.</p>
          ) : (
            <>
              <HotelList hotel={hotel} onBookHotel={handleSelectHotel} />
              
              {/* 🎛️ PAGINATION CONTROLS DISPLAY CONTAINER */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', padding: '1rem 0' }}>
                <button 
                  className="book-btn"
                  disabled={currentPage === 0} 
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  style={{ padding: '0.5rem 1.25rem', opacity: currentPage === 0 ? 0.5 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer', background: 'var(--text-secondary)' }}
                >
                  ← Previous Page
                </button>
                
                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>
                  Page <strong style={{ color: 'var(--gold)' }}>{currentPage + 1}</strong> of {totalPages}
                </span>

                <button 
                  className="book-btn"
                  disabled={currentPage >= totalPages - 1} 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  style={{ padding: '0.5rem 1.25rem', opacity: currentPage >= totalPages - 1 ? 0.5 : 1, cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
                >
                  Next Page →
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* STEP 2: RICH HOTEL DETAILS VIEW (ASSETS & BEDROOMS) */}
      {currentStep === 2 && selectedHotel && (
        <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          <div className="form-card" style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '2rem', marginTop: 0, marginBottom: '0.5rem' }}>{selectedHotel.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 0, marginBottom: '2rem' }}>📍 {selectedHotel.location} • {selectedHotel.address}</p>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--primary-bg)', paddingBottom: '0.5rem' }}>Premium Amenities & Assets</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {selectedHotel.assets.map((asset, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span> {asset}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--primary-bg)', paddingBottom: '0.5rem' }}>Available Bedrooms & Suites</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedHotel.bedrooms.map((room, i) => (
                  <div key={i} style={{ background: 'var(--section-bg)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '1.05rem' }}>{room.type}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--white)', background: 'var(--medium-brown)', padding: '2px 8px', borderRadius: '20px' }}>{room.capacity}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{room.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <button className="book-btn" style={{ background: 'var(--text-secondary)' }} onClick={() => setCurrentStep(1)}>Back to Browse</button>
              <button className="book-btn" onClick={() => setCurrentStep(3)}>Configure Booking Timeline</button>
            </div>
          </div>

          <div className="summary-preview-card" style={{ background: 'var(--secondary-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
            <img src={selectedHotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"} alt={selectedHotel.name} style={{ borderRadius: 'var(--radius-sm)', marginBottom: '1rem', width: '100%', objectFit: 'cover' }} />
            <div className="summary-details">
              <div className="summary-price" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                ${selectedHotel.pricePerNight} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ night</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Pricing scales based on final selections.</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: FLIGHT MATCHING FORM DETAILS */}
      {currentStep === 3 && selectedHotel && (
        <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          <div className="form-card" style={{ background: 'var(--secondary-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.75rem', marginTop: 0, marginBottom: '2rem' }}>Match Flight Parameters</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Linked Flight Reference</label>
                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--light-brown)', background: 'transparent', color: 'inherit' }} required value={bookingForm.flightReference} onChange={e => setBookingForm({...bookingForm, flightReference: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Check-In Date</label>
                  <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--light-brown)', background: 'transparent', color: 'inherit' }} required value={bookingForm.checkInDate} onChange={e => setBookingForm({...bookingForm, checkInDate: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Checkout Date</label>
                  <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--light-brown)', background: 'transparent', color: 'inherit' }} required value={bookingForm.checkoutDate} onChange={e => setBookingForm({...bookingForm, checkoutDate: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <button type="button" className="book-btn" style={{ background: 'var(--text-secondary)' }} onClick={() => setCurrentStep(2)}>Back to Details</button>
                <button type="submit" className="book-btn">Proceed to Verification</button>
              </div>
            </form>
          </div>

          <div className="summary-preview-card" style={{ background: 'var(--secondary-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
            <img src={selectedHotel.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"} alt="" style={{ borderRadius: 'var(--radius-sm)', marginBottom: '1rem', width: '100%', objectFit: 'cover' }} />
            <div className="summary-details">
              <h3>{selectedHotel.name}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>📍 {selectedHotel.location}</p>
              <div className="summary-price" style={{ fontSize: '1.3rem', fontWeight: '700', marginTop: '0.5rem' }}>
                ${selectedHotel.pricePerNight} <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/ night</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: FINAL TRANSACTION VERIFICATION SUMMARY */}
      {currentStep === 4 && selectedHotel && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--secondary-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Secure Checkout Node</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>Verify transaction details before routing data payload.</p>
          
          <div style={{ textAlign: 'left', background: 'var(--section-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '2rem' }}>
            <p style={{ margin: '0.75rem 0' }}><strong>Target Property:</strong> {selectedHotel.name}</p>
            <p style={{ margin: '0.75rem 0' }}><strong>Location Context:</strong> {selectedHotel.location}</p>
            <p style={{ margin: '0.75rem 0' }}><strong>Inbound Flight Stream:</strong> {bookingForm.flightReference}</p>
            <p style={{ margin: '0.75rem 0' }}><strong>Timeline Window:</strong> {bookingForm.checkInDate} to {bookingForm.checkoutDate}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="book-btn" style={{ background: 'var(--text-secondary)' }} onClick={() => setCurrentStep(3)}>Modify Timeline</button>
            <button className="book-btn" onClick={handleFinalizeBooking}>Authorize & Reserve Space</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;