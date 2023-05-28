import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../images/hero-image.jpg";
// import infoImage from "../images/info.jpg";
import scanImage from "../images/scan.jpg";
import diagnoseImage from "../images/diagnose.jpg";
import treatmentImage from "../images/treatment.jpg";

import Aos from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="container-homePage">
      <section className="section1 section">
        <img src={heroImage} alt="" />
        <div className="overlay">
          <h1 data-aos="fade-left">AgroNexus</h1>
          <h2 data-aos="fade-right">From Diagnosis To Solution</h2>
          <p className="tagline" data-aos="zoom-in" data-aos-duration="1200">The Future of Plant Health is Here</p>
          <Link to="/predict">
            <button>Get Started</button>
          </Link>
        </div>
        <svg class="arrows">
          <path class="a1" d="M0 0 L15 16 L30 0"></path>
          <path class="a2" d="M0 15 L15 31 L30 15"></path>
          <path class="a3" d="M0 30 L15 46 L30 30"></path>
        </svg>
      </section>
      <section className="section2 section">
        <div
          className="overlay info">
          <h2>What Is AgroNexus?</h2>
          <p>
            AgroNexus is a platform that detects the diseases in crops and provides information and solutions for the diseases. One of the key features of AgroNexus is its ability to predict and diagnose crop diseases and pests using machine learning algorithms.
          </p>
          <h3>Connecting Agriculture and Technology</h3>
        </div>
        <svg class="arrows">
          <path class="a1" d="M0 0 L15 16 L30 0"></path>
          <path class="a2" d="M0 15 L15 31 L30 15"></path>
          <path class="a3" d="M0 30 L15 46 L30 30"></path>
        </svg>
      </section>
      <section className="section3 section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <img src={scanImage} alt="" />
            <h3>Scan Your Plants</h3>
            <p>
              Simply upload a picture of your plant and let <span> AgroNexus </span> do the rest.
            </p>
          </li>
          <li>
            <img src={diagnoseImage} alt="" />
            <h3>Diagnose The Diseases</h3>
            <p>
              AgroNexus uses AI and machine learning to accurately diagnose
              plant diseases.
            </p>
          </li>
          <li>
            <img src={treatmentImage} alt="" />
            <h3>Treat and Prevent</h3>
            <p>
              We provide effective solutions and preventive measures for a
              healthy crop.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
