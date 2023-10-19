import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DragDrop from "../components/DragDrop";
import DiseaseDetails from "../components/DiseaseDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import SelectImages from "../components/SelectImages";

const PredictionPage = (props) => {
  const [dragDrop, setDragDrop] = useState(true);

  const alterDragDrop = (arg) => {
    setDragDrop(arg);
  };

  const [options1, setOptions1] = useState(["a", "b", "c", "d", "e", "f"]);
  const [options2, setOptions2] = useState(["a", "c", "d", "e", "f"]);

  setTimeout(() => {
    props.setOnPrediction(true);
  }, 100);

  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predictedDiseaseData, setPredictedDiseaseData] = useState(null);
  const [healthy, setHealthy] = useState(null);

  const { user } = useAuthContext();

  const handleFileChange = (file) => {
    setFile(file);
    setPrediction(null);
  };

  const handleRemoveClicked = () => {
    setFile(null);
    setPrediction(null);
    setPredictedDiseaseData(null);
    setHealthy(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      notifyNotLoggedInError();
      return;
    }

    if (!file) {
      notifyImageSelectError();
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:10000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = response.data;
      setPrediction(data);
      console.log(data);

      // Handling the cases when image doesn't include leaf
      if (data.class_name === "Background_without_leaves") {
        notifyImageContentError();
        return;
      }

      // Handling the cases of healthy plants
      if (data.class_name.includes("healthy")) {
        setHealthy(data.class_name.split("___")[0]);
        return;
      }

      const diseaseDetailsResponse = await fetch(
        `http://localhost:4000/api/diseases/details?name=${response.data.class_name}`
      );
      const diseaseDetailsData = await diseaseDetailsResponse.json();

      if (diseaseDetailsResponse.ok) {
        setPredictedDiseaseData(diseaseDetailsData);
      } else {
        console.log("Error fetching the data.");
        notifyFetchError();
      }
    } catch (error) {
      console.error(error);
      notifyPredictError();
    }
  };

  const notifyImageSelectError = () =>
    toast.warn("Please select an image to upload!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyImageContentError = () =>
    toast.warn(
      "Please upload a image that contains leaf of the diseased plant!",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  const notifyPredictError = () =>
    toast.error("Error fetching the data!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyFetchError = () =>
    toast.error("Could not make prediction!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyNotLoggedInError = () =>
    toast.error("You are not logged in!", {
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
      <div className="predict-container">
        <div className="predict-options">
          <button
            className={dragDrop ? "active predict-btn" : "deactive predict-btn"}
            id="predict-btn-1"
            onClick={() => alterDragDrop(true)}
          >
            Upload Image
          </button>
          <button
            className={
              !dragDrop ? "active predict-btn" : "deactive predict-btn"
            }
            id="predict-btn-2"
            onClick={() => alterDragDrop(false)}
          >
            Disease Name
          </button>
        </div>
        <div className="predict-choice">
          {dragDrop && (
            <form onSubmit={handleFormSubmit}>
              <DragDrop
                onFileChange={handleFileChange}
                onRemoveClicked={handleRemoveClicked}
              />
              <button type="submit" className="submit">
                Predict
              </button>
            </form>
          )}
          {!dragDrop && (
            <form onSubmit={handleFormSubmit}>
              <SelectImages options1={options1} options2={options2} />
              <button type="submit" className="submit">
                Predict
              </button>
            </form>
          )}
        </div>
      </div>
      {!healthy && prediction && predictedDiseaseData && (
        <div>
          {/* <div className="prediction-result">
            <h3>Disease Name: {prediction.class_name}</h3>
            <h4>Confidence: {prediction.confidence}</h4>
          </div> */}
          <div className="disease-result">
            <DiseaseDetails
              key={predictedDiseaseData._id}
              predictedDiseaseData={predictedDiseaseData}
            />
          </div>
        </div>
      )}
      {healthy && (
        <div>
          <div className="prediction-result">
            <h4>
              The uploaded image of the leaf of {healthy} plant looks healthy.
            </h4>
            <h4>
              Try uploading the image of the leaf that is affected by the
              disease.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
