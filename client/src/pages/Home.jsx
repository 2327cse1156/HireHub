import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobListing from "../components/JobListing";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        <section>
          <Hero />
        </section>

        <section className="my-12 px-4 sm:px-8 md:px-16">
          <JobListing />
        </section>

        <section className="bg-gray-50 py-12 px-4 sm:px-8 md:px-16">
          <AppDownload />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
