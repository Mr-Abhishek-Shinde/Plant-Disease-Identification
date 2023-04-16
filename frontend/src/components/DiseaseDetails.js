import React from 'react'
import DiseaseInfoCard from '../components/DiseaseInfoCard'
const DiseaseDetails = (props) => {
  return (
    <div className='disease-details'>
        <h1>Plant Name: {props.predictedDiseaseData.plant_name}</h1>
        <h2>Disease Name: {props.predictedDiseaseData.disease_name}</h2>
        <DiseaseInfoCard title="Symptoms" data={Object.values(props.predictedDiseaseData.disease_symptoms)} />
        <DiseaseInfoCard title="Causes" data={Object.values(props.predictedDiseaseData.disease_causes)} />
        <DiseaseInfoCard title="Prevention" data={Object.values(props.predictedDiseaseData.disease_prevention)} />
        <DiseaseInfoCard title="Control" data={Object.values(props.predictedDiseaseData.disease_control)} />
    </div>
  )
}

export default DiseaseDetails