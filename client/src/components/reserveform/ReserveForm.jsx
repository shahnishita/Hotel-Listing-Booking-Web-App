import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../API_URL";
import "./ReserveForm.css";

const ReserveForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotelId, selectedRooms, dates } = location.state;

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const paymentRes = await axios.post(
        `${API_URL}/stripe/create-checkout-session`,
        {
          amount: selectedRooms.length * 10000, // ₹100 per room
        }
      );

      window.location.href = paymentRes.data.checkoutUrl;

    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="reserveFormContainer">
      <h1>Complete Your Booking</h1>

      <form className="reserveForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleChange}
          required
        />

        <h3>Booking Summary</h3>
        <p>Hotel ID: {hotelId}</p>
        <p>Rooms: {selectedRooms.join(", ")}</p>
        <p>
          Dates: {new Date(dates[0]).toLocaleDateString()} -{" "}
          {new Date(dates[dates.length - 1]).toLocaleDateString()}
        </p>

        <button type="submit" className="reserveFormButton" disabled={loading}>
          {loading ? "Redirecting to Payment..." : "Pay & Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;
