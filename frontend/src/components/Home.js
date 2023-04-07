import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPrediction(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select an image to upload');
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
    } catch (error) {
      console.error(error);
      alert('Error: Could not make prediction');
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept='image/*' onChange={handleFileChange} />
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div>
          <h3>Disease Name: {prediction.class_name}</h3>
          <h4>Confidence: {prediction.confidence}</h4>
        </div>
      )}
    </div>
  );
};

export default Home;
