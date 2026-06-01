import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Luxury Hotel Management</h1>

        <p>
          Manage Hotels, Flights and Reservations
        </p>
      </div>
    </>
  );
}

export default Home;