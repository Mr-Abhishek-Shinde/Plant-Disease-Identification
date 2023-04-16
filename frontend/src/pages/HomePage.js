import React from 'react';
import { Link } from 'react-router-dom'
import heroImage from '../images/hero-image.jpg';
import scanImage from '../images/scan.jpg';
import diagnoseImage from '../images/diagnose.jpg';
import treatmentImage from '../images/treatment.jpg';

const HomePage = () => {
  return (
    <div className="container-homePage">
      <section className="section1">
        <img src={heroImage} alt="" />
        <div className="overlay">
          <h1>AgroNexus</h1>
          <h2>From Diagnosis To Solution</h2>
          <p className="tagline">The Future of Plant Health is Here</p>
          <Link to='/predict'><button>Get Started</button></Link>
        </div>
      </section>
      <section className="section2">
        <h2>What Is AgroNexus?</h2>
        <div className="info">
          <p>AgroNexus is a platform that uses AI and machine learning to predict and diagnose diseases in plants.</p>
          <p>Connecting Agriculture and Technology</p>
        </div>
      </section>
      <section className="section3">
        <h2>Key Features</h2>
        <ul>
          <li>
            <img src={scanImage} alt="" />
            <h3>Scan Your Plants</h3>
            <p>Simply take a picture of your plant and let <span>AgroNexus</span> do the rest.</p>
          </li>
          <li>
            <img src={diagnoseImage} alt="" />
            <h3>Diagnose The Diseases</h3>
            <p>AgroNexus uses AI and machine learning to accurately diagnose plant diseases.</p>
          </li>
          <li>
            <img src={treatmentImage} alt="" />
            <h3>Treat and Prevent</h3>
            <p>We provide effective solutions and preventive measures for a healthy crop.</p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default HomePage;
