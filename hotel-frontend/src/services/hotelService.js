const API_URL = "http://localhost:8080/api/hotel"; 
// 🚀 ADDED: Explicit route base target for all Booking CRUD mechanisms
const BOOKING_API_URL = "http://localhost:8080/api/bookings"; 

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json"
    };

    if (token && token !== "undefined" && token !== "null") {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

export const hotelService = {
    // 🏨 1. READ ALL HOTELS (PAGINATED)
    getAllHotels: async (page = 0, size = 8) => {
        try {
            console.log(`Fetching hotel matrix - Page: ${page}, Size: ${size}...`);
            const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
                method: "GET",
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log("Paging data block payload parsed:", data);
            return data; 
        } catch (err) {
            console.error("Failed to fetch hotels:", err);
            return { content: [], totalPages: 0 }; 
        }
    },

    // 📅 2. CREATE BOOKING (USER ONLY)
    bookHotel: async (bookingPayload) => {
        try {
            console.log("Routing transaction payload to booking system:", bookingPayload);
            
            // 🎯 FIXED: Changed path string to use BOOKING_API_URL directly
            const response = await fetch(BOOKING_API_URL, {
                method: "POST",
                headers: getAuthHeaders(), 
                body: JSON.stringify(bookingPayload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (err) {
            console.error("Transaction payload submission failure:", err);
            throw err; 
        }
    },

    // 📝 3. UPDATE BOOKING (USER ONLY)
    updateBooking: async (bookingId, updatedPayload) => {
        try {
            console.log(`Sending updates for booking tracking reference ID: ${bookingId}`);
            const response = await fetch(`${BOOKING_API_URL}/${bookingId}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(updatedPayload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            return await response.json();
        } catch (err) {
            console.error("Failed to update booking item context:", err);
            throw err;
        }
    },

    // ❌ 4. CANCEL/DELETE BOOKING (USER ONLY)
    cancelBooking: async (bookingId) => {
        try {
            console.log(`Sending cancellation sequence for booking reference ID: ${bookingId}`);
            const response = await fetch(`${BOOKING_API_URL}/${bookingId}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            return await response.json(); // Returns confirmation message payload map
        } catch (err) {
            console.error("Cancellation transmission dropped:", err);
            throw err;
        }
    }
};