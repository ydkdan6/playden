import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FrameComponent from "../components/FrameComponent";
import FrameComponent3 from "../components/FrameComponent3";
import { toast } from "react-toastify"; // To display error messages if necessary

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch bookings from the API
    const fetchBookings = async () => {
      const token = localStorage.getItem("authToken"); // Make sure the token is stored correctly

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api/v1/pitch-owner/bookings/`,
          {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true", // Skip ngrok warning
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setBookings(data.data.bookings); 
          console.log(data);// Set the fetched bookings
        } else {
          throw new Error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
        toast.error("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="w-full relative bg-light-mode-gray-10-f5f5f5 overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[52px] box-border leading-[normal] tracking-[normal]">
      <FrameComponent aare="/aare2@2x.png" />
      <FrameComponent3 />
      <section className="self-stretch flex flex-row bg-gray-300 items-start justify-start py-0 px-[70px] box-border max-w-full text-left text-base text-f2 font-poppins mq750:pl-[35px] mq750:pr-[35px] mq750:box-border mq450:w-[140%] pb-[40px]">
        <div className="flex-1 rounded-lg bg-white-a700_bf mt-[20px] flex flex-row items-start justify-start py-5 px-8 box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-between flex-wrap content-start max-w-full gap-5">

            {bookings.length > 0 ? (
              <>
            <div className="flex flex-col items-start justify-start gap-9">
              <div className="relative font-medium inline-block min-w-[30px]">
                S/N
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px] text-xs">
              {bookings.map((_, index) => (
                  <div key={index} className="relative font-medium inline-block min-w-[5px]">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[133px] flex flex-col items-start justify-start py-0 pl-0 pr-3.5 box-border gap-9">
              <div className="self-stretch flex flex-row items-start justify-end py-0 px-[29px]">
                <div className="relative font-medium inline-block min-w-[46px]">
                  USERNAME
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px] text-xs">
                {bookings.map((booking, index) => (
                  <div key={index} className="relative font-medium inline-block min-w-[119px]">
                    {booking.user.username}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[137.5px] flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-9 text-xs">
              <div className="relative text-base font-medium inline-block min-w-[94px]">
                BOOKING ID
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px]">
                {bookings.map((booking, index) => (
                  <div key={index} className="relative font-medium inline-block min-w-[57px]">
                    {booking.booking_code}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[155.5px] flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-9 text-xs">
              <div className="relative text-base font-medium inline-block min-w-[123px]">
                PHONE NUMBER
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px]">
                {bookings.map((booking, index) => (
                  <div key={index} className="relative font-medium inline-block min-w-[84px]">
                    +{booking.user.phone_number}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-3.5 gap-[26px] text-xs text-light-mode-white-5-ffffff">
              <div className="flex flex-row items-start justify-start py-0 pl-[11px] pr-3.5 text-base text-f2">
                <div className="relative font-medium inline-block min-w-[60px]">
                  STATUS
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[26px]">
                {bookings.map((booking, index) => (
                  <div
                    key={index}
                    className={`rounded-13xl ${
                      booking.status === "Confirmed" ? "bg-darkolivegreen" : "bg-yellow-500"
                    } flex flex-row items-start justify-start p-2.5`}
                  >
                    <div className="relative font-medium inline-block text-center min-w-[65px]">
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[52px] gap-9">
              <div className="flex flex-row items-start justify-start py-0 pl-[15px] pr-0.5">
                <div className="relative font-medium inline-block min-w-[40px]">
                  DATE
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px] text-xs">
                {bookings.map((booking, index) => (
                  <div key={index} className="relative font-medium inline-block min-w-[57px]">
                    {booking.date}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pl-0 pr-14 gap-9">
              <div className="flex flex-row items-start justify-start py-0 pl-2.5 pr-0">
                <div className="relative font-medium inline-block min-w-[36px]">
                  TIME
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px] text-xs">
                {bookings.map((booking, index) => (
                  <div key={index} className="relative font-medium inline-block min-w-[43px]">
                    {booking.end_time}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-9">
              <div className="flex flex-row items-start justify-start py-0 pl-3 pr-0">
                <div className="relative font-medium inline-block min-w-[61px]">
                  ACTION
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[46px] text-xs">
                {bookings.map((booking, index) => (
                  <div key={index} className="relative [text-decoration:underline] font-medium inline-block min-w-[73px]">
                      <Link to='/booking-details'  state={{ booking }} className="text-black-900">View details</Link>
                  </div>
                ))}
              </div>
            </div>
            </>
            ) : (
              <div className="flex-1 text-center text-lg font-bold">No bookings yet!</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingManagement;
