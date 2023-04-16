import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DragDrop from '../components/DragDrop'
import DiseaseDetails from '../components/DiseaseDetails'

const Home = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predictedDiseaseData, setPredictedDiseaseData] = useState(null);

  const handleFileChange = (file) => {
    setFile(file);
    setPrediction(null);
  };

  const handleRemoveClicked = () => {
    setFile(null);
    setPrediction(null);
    setPredictedDiseaseData(null);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      notifyImageSelectError();
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:10000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = response.data;
      setPrediction(data);

      const diseaseDetailsResponse = await fetch(`http://localhost:4000/api/diseases/details?name=${response.data.class_name}`);
      const diseaseDetailsData = await diseaseDetailsResponse.json();

      if (diseaseDetailsResponse.ok) {
        setPredictedDiseaseData(diseaseDetailsData);
      }
      else {
        console.log("Error fetching the data.");
        notifyFetchError();
      }

    } catch (error) {
      console.error(error);
      notifyPredictError();
    }
  };

  const notifyImageSelectError = () => toast.warn('Please select an image to upload!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notifyPredictError = () => toast.error('Error fetching the data!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyFetchError = () => toast.error('Could not make prediction!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <div className="predictionpage-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleFormSubmit}>
        <DragDrop onFileChange={handleFileChange} onRemoveClicked={handleRemoveClicked} />
        <button type="submit" className='submit'>Predict</button>
      </form>

      {prediction && predictedDiseaseData && (
        <div>
          <div className="prediction-result">
            <h3>Disease Name: {prediction.class_name}</h3>
            <h4>Confidence: {prediction.confidence}</h4>
          </div>
          <div className="disease-result">
            <DiseaseDetails key={predictedDiseaseData._id} predictedDiseaseData={predictedDiseaseData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
