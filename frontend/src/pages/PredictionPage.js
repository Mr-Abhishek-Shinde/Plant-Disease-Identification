import React, { useState } from 'react';
import axios from 'axios';
import DragDrop from '../components/DragDrop'

const Home = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (file) => {
    setFile(file);
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
    <div className="container-home">
      <form onSubmit={handleFormSubmit}>
        <DragDrop onFileChange={handleFileChange} />
        <button type="submit" className='submit'>Predict</button>
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
