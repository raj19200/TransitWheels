export const Footer = () => {
  return (
    <div className="bg-custom-periwinkle">
      <div className="flex flex-col md:flex-row  p-8 justify-center items-start gap-56 text-white ">
        <div className=" flex-col space-y-5">
          <p className="text-lg font-bold">Ride</p>
          <p>
            <a href="/">Get All Booked Ride</a>
          </p>
          <p>
            <a href="/">Search Ride</a>
          </p>
          <p>
            <a href="/">Book Ride</a>
          </p>
        </div>
        <div className=" flex-col space-y-5">
          <p className="text-lg font-bold">Rental</p>
          <p>
            <a href="/">Get All cars</a>
          </p>
          <p>
            <a href="/">Post Rental</a>
          </p>
          <p>
            <a href="/">Book Rental</a>
          </p>
          <p>
            <a href="/">Get user bookings</a>
          </p>
        </div>
        <div className=" flex-col space-y-5">
          <p className="text-lg font-bold">Parcel</p>
          <p>
            <a href="/">Get All parcels</a>
          </p>
          <p>
            <a href="/">Post Parcel</a>
          </p>
        </div>
        <div className=" flex-col space-y-5">
          <p className="text-lg font-bold">Company</p>
          <p>
            <a href="/">About Us</a>
          </p>
          <p>
            <a href="/">Contact Us</a>
          </p>
        </div>
      </div>
      <div className="mx-44 flex flex-row justify-between text-white">
        <p>@ {new Date().getFullYear()} TransitWheels Inc.</p>
        <div className=" flex flex-row space-x-10">
          <p>Privacy</p>
          <p>Accessibility</p>
          <p>Terms</p>
        </div>
      </div>
    </div>
  );
};
