import React from "react";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-banner">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center text-neutral-content">
        <div className="min-w-md ">
          <h1 className="mb-5 text-6xl font-bold">Hello there</h1>
          <p className="mb-5 font-semibold text-2xl">
            {" "}
            Assemblage of regional featured industries Competitive products
            bought by regional integrative supply chain Reduce cost & save time,
            facilitate sourcing efficiently.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
