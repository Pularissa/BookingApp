import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="stat-card">
          Hotels
        </div>

        <div className="stat-card">
          Flights
        </div>

        <div className="stat-card">
          Bookings
        </div>
      </div>
    </>
  );
}

export default Dashboard;