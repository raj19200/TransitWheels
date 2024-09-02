import NavBar from "@/components/navBar";
import { MarqueeDemo } from "@/components/reviewCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Section 1 */}
      <div className="relative w-full h-[34rem]">
        <img
          src="/image.jpg"
          alt="car images"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative flex items-start justify-center w-full h-full pt-8">
          <div className=" bg-white h-20 w-auto rounded-full">
            <div className="flex flex-col md:flex-row mx-8 pt-2 items-center">
              <div className="flex flex-col border-r border-gray-950 pr-10">
                <p>Where</p>
                <div className="wrap-input-9">
                  <input
                    className="input"
                    type="text"
                    placeholder="City, airport, address"
                  />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="flex flex-col border-r border-gray-950 pr-10 pl-10">
                <p>From</p>
                <div className="wrap-input-9">
                  <input className="input" type="datetime-local" />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <div className="flex flex-col pr-10 pl-10">
                <p>From</p>
                <div className="wrap-input-9">
                  <input className="input" type="datetime-local" />
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
              <button className="bg-custom-periwinkle w-16 h-16 rounded-full flex items-center justify-center">
                <img src="/search.png" className="h-9 w-9" alt="Search Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="text-4xl capitalize font-bold">Find Your Perfect Drive</p>
        <div style={{ position: "relative", display: "inline-block" }}>
          <p
            style={{ position: "relative", zIndex: 1 }}
            className="text-2xl font-serif font-semibold italic mt-5 bg-slate-300"
          >
            Trusted, affordable, and accessible car rental from local hosts.
          </p>
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
      <div className="mt-5 mx-6 flex flex-col md:flex-row justify-between ">
        <div className="flex justify-center items-center py-10 w-full md:w-2/3">
          <img
            src="/image1.jpg"
            className="w-full h-auto md:w-2/3"
            alt="section 1"
          />
        </div>
        <div className="flex flex-col justify-center items-start w-full md:w-1/3 leading-loose space-y-5 z-10">
          <p className="font-sans text-center text-4xl text-custom-periwinkle uppercase ">
            Safety First
          </p>
          <p className="font-sans text-center text-2xl">
            Your safety comes first. Always.
          </p>
          <p className="font-sans text-center text-xl ">
            Safety for all. No matter what seat you&apos;re in.
          </p>
        </div>
      </div>
      <div className="mt-5 mx-6 flex flex-col md:flex-row justify-between ">
        <div className="flex flex-col  justify-center  pl-5 w-full md:w-2/4 leading-loose space-y-5 z-10">
          <div className="items-start">
            <p className="font-sans text-center text-4xl text-custom-periwinkle uppercase ">
              Making millions of rides more accessible
            </p>
            <p className="font-sans text-center text-lg p-7">
              A ride is more than just a ride. It's a gateway to opportunities
              and jobs. A connection to community. And access to essentials like
              groceries, healthcare, and polling places. Our Lyft Up initiative
              makes rides more accessible for millions, and helps bring
              communities even closer.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center py-10 w-full md:w-2/4">
          <img
            src="/image3.jpg"
            className="w-full h-auto md:w-2/3"
            alt="section 1"
          />
        </div>
      </div>
    </>
  );
}
