import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../images/hero-image.jpg";
import scanImage from "../images/scan.jpg";
import diagnoseImage from "../images/diagnose.jpg";
import treatmentImage from "../images/treatment.jpg";

const HomePage = () => {
  return (
    <div className="container-homePage">
      <section className="section1 section">
        <img src={heroImage} alt="" />
        <div className="overlay">
          <h1>AgroNexus</h1>
          <h2>From Diagnosis To Solution</h2>
          <p className="tagline">The Future of Plant Health is Here</p>
          <Link to="/predict">
            <button>Get Started</button>
          </Link>
        </div>
      </section>
      <section className="section2 section">
        <div
          className="overlay info"
          style={{ background: 'url("infoImage.jpg")' }}
        >
          <h2>What Is AgroNexus?</h2>
          <p>
            AgroNexus is an AI-based platform that aims to provide solutions for
            agriculture-related challenges by leveraging machine learning and
            predictive analytics. The platform helps farmers and
            agriculture-related businesses to make data-driven decisions by
            providing them with actionable insights. One of the key features of
            AgroNexus is its ability to predict and diagnose crop diseases,
            pests, and nutrient deficiencies using machine learning algorithms.
            By analyzing various factors such as weather conditions, soil
            properties, and historical data, the platform can identify potential
            issues before they become widespread and provide recommendations to
            mitigate them.
          </p>
          <h3>Connecting Agriculture and Technology</h3>
        </div>
      </section>
      <section className="section3 section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <img src={scanImage} alt="" />
            <h3>Scan Your Plants</h3>
            <p>
              Simply take a picture of your plant and let <span>AgroNexus</span>{" "}
              do the rest.
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
