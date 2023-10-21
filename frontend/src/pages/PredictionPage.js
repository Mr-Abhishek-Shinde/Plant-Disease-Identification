import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DragDrop from "../components/DragDrop";
import DiseaseDetails from "../components/DiseaseDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import Dropdowns from "../components/Dropdowns";

const plantDiseaseData = {
  plant1: {
    name: "Apple",
    diseases: ["Apple Scab", "Apple Black Rot", "Apple Cedar/Apple Rust"],
  },
  plant2: {
    name: "Cherry",
    diseases: ["Cherry Powdery Mildew"],
  },
  plant3: {
    name: "Corn",
    diseases: [
      "Corn Cercospora Leaf Spot",
      "Corn Common Rust",
      "Corn Northern Leaf Blight",
    ],
  },
  plant4: {
    name: "Grapes",
    diseases: [
      "Grape Black Rot",
      "Grape Esca (Black Measles)",
      "Grape Leaf Blight",
    ],
  },
  plant5: {
    name: "Orange",
    diseases: ["Orange Haunglongbing (Citrus Greening)"],
  },
  plant6: {
    name: "Peach",
    diseases: ["Peach Bacterial Spot"],
  },
  plant7: {
    name: "Pepper Bell",
    diseases: ["Pepper Bell Bacterial Spot"],
  },
  plant8: {
    name: "Potato",
    diseases: ["Potato Early Blight", "Potato Late Blight"],
  },
  plant9: {
    name: "Squash",
    diseases: ["Squash Powdery Mildew"],
  },
  plant10: {
    name: "Strawberry",
    diseases: ["Strawberry Leaf Scorch"],
  },
  plant11: {
    name: "Tomato",
    diseases: [
      "Tomato Bacterial Spot",
      "Tomato Early Blight",
      "Tomato Late Blight",
      "Tomato Leaf Mold",
      "Tomato Septoria Leaf Spot",
      "Tomato Spider Mites",
      "Tomato Target Spot",
      "Tomato Mosaic Virus",
    ],
  },
};

const plantDiseaseNamesMapping = {
  "Apple Scab": "Apple___Apple_scab",
  "Apple Black Rot": "Apple___Black_rot",
  "Apple Cedar/Apple Rust": "Apple___Cedar_apple_rust",
  "Cherry Powdery Mildew": "Cherry___Powdery_mildew",
  "Corn Cercospora Leaf Spot": "Corn___Cercospora_leaf_spot Gray_leaf_spot",
  "Corn Common Rust": "Corn___Common_rust",
  "Corn Northern Leaf Blight": "Corn___Northern_Leaf_Blight",
  "Grape Black Rot": "Grape___Black_rot",
  "Grape Esca (Black Measles)": "Grape___Esca_(Black_Measles)",
  "Grape Leaf Blight": "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
  "Orange Haunglongbing (Citrus Greening)":
    "Orange___Haunglongbing_(Citrus_greening)",
  "Peach Bacterial Spot": "Peach___Bacterial_spot",
  "Pepper Bell Bacterial Spot": "Pepper,_bell___Bacterial_spot",
  "Potato Early Blight": "Potato___Early_blight",
  "Potato Late Blight": "Potato___Late_blight",
  "Squash Powdery Mildew": "Squash___Powdery_mildew",
  "Strawberry Leaf Scorch": "Strawberry___Leaf_scorch",
  "Tomato Bacterial Spot": "Tomato___Bacterial_spot",
  "Tomato Early Blight": "Tomato___Early_blight",
  "Tomato Late Blight": "Tomato___Late_blight",
  "Tomato Leaf Mold": "Tomato___Leaf_Mold",
  "Tomato Septoria Leaf Spot": "Tomato___Septoria_leaf_spot",
  "Tomato Spider Mites": "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato Target Spot": "Tomato___Target_Spot",
  "Tomato Mosaic Virus": "Tomato___Tomato_mosaic_virus",
};

const PredictionPage = (props) => {
  const alterPrediction = props.alterPrediction;

  setTimeout(() => {
    alterPrediction(true);
  }, 100);


  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predictedDiseaseData, setPredictedDiseaseData] = useState(null);
  const [healthy, setHealthy] = useState(null);

  const [dragDrop, setDragDrop] = useState(true);

  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const { user } = useAuthContext();

  const alterDragDrop = (arg) => {
    setDragDrop(arg);
    setFile(null);
    setPrediction(null);
    setPredictedDiseaseData(null);
    setHealthy(null);
    setSelectedPlant(null);
    setSelectedDisease(null);
  };

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

  const handlePlantChange = (selectedValue) => {
    setSelectedPlant(selectedValue);
    setSelectedDisease(null);
  };

  const handleDiseaseChange = (selectedValue) => {
    setSelectedDisease(selectedValue);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
      // console.log(data);

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

  const handleChoiceFormSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      notifyNotLoggedInError();
      return;
    }

    if (!selectedPlant || !selectedDisease) {
      notifyChoiceSelectError();
      setPrediction(null);
      setPredictedDiseaseData(null);
      setHealthy(null);
      return;
    }

    let name = plantDiseaseNamesMapping[selectedDisease];

    const diseaseDetailsResponse = await fetch(
      `http://localhost:4000/api/diseases/details?name=${name}`
    );

    const diseaseDetailsData = await diseaseDetailsResponse.json();

    if (diseaseDetailsResponse.ok) {
      setPredictedDiseaseData(diseaseDetailsData);
      setHealthy(false);
      setPrediction(true);
    } else {
      console.log("Error fetching the data.");
      notifyFetchError();
    }
  };

  const notifyChoiceSelectError = () =>
    toast.warn("Please select the disease name!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
    <>
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
      <div className="predictionpage-container">
        <div className="predict-container">
          <div className="predict-options">
            <button
              className={
                dragDrop ? "active predict-btn" : "deactive predict-btn"
              }
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
              <form onSubmit={handleChoiceFormSubmit}>
                <Dropdowns
                  plantDiseaseData={plantDiseaseData}
                  onPlantChange={handlePlantChange}
                  onDiseaseChange={handleDiseaseChange}
                />
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
    </>
  );
};

export default PredictionPage;
