import NavBar from "@/components/navBar";
import { MarqueeDemo } from "@/components/reviewCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Section 1 */}
      <div>
        <img
          src="/image.jpg"
          alt="car images"
          className="w-full h-96 object-cover"
        />
        <div className="text-center mt-10">
          <p className="text-4xl capitalize font-bold">
            Find Your Perfect Drive
          </p>
          <div style={{ position: "relative", display: "inline-block" }}>
            <p
              style={{ position: "relative", zIndex: 1 }}
              className="text-2xl font-serif font-semibold italic mt-5 bg-slate-300"
            >
              Trusted, affordable, and accessible car rental from local hosts.
            </p>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className="mt-5 mx-6 flex flex-col md:flex-row justify-between ">
        <div className="flex justify-center items-center py-10 w-full md:w-2/3">
          <img
            src="/image5.jpg"
            className="w-full h-auto md:w-2/3"
            alt="section 1"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 leading-loose space-y-5 z-10">
          <p className="font-sans text-center text-4xl text-custom-periwinkle ">
            Let&apos;s find a ride
          </p>
          <div className="flex flex-row">
            <button
              type="button"
              className="text-black mt-10 hover:text-white border border-custom-hover hover:bg-custom-hover focus:ring-4 focus:outline-none focus:ring-custom-hover font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32"
            >
              Search Ride
            </button>
            <button
              type="button"
              className="text-black mt-10 hover:text-white border border-custom-hover hover:bg-custom-hover focus:ring-4 focus:outline-none focus:ring-custom-hover font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-36"
            >
              Sign up to ride
            </button>
          </div>
        </div>
      </div>
      <MarqueeDemo />
    </>
  );
}
