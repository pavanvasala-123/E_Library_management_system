import React, { useState, useEffect } from 'react';
import '../styles/Editsection.css';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditSectionForm = () => {

  const { sectionId } = useParams()
  const [sectionData, setSectionData] = useState({
    section: '',
    description: '',
  });
  const navigate = useNavigate();
  // useEffect(() => {

  //   const fetchSectionData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3002/section/edit/${sectionId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setSectionData(data);
  //       } else {
  //         console.error('Failed to fetch section data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching section data:', error);
  //     }
  //   };

  //   fetchSectionData();
  // }, [sectionId]); 

  const handleChange = (e) => {
    setSectionData({
      ...sectionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sectionData),
      };

      const response = await fetch(`http://localhost:3002/section/edit/${sectionId}`, options);

      if (response.ok) {
        toast('Section updated successfully')
        console.log('Section updated successfully');
        // Redirect or perform additional actions as needed
        navigate('/get-sections')
      } else {
        console.error('Failed to update section');
      }
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <div className="edit-section-form-container">
      <h2>Edit Section</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Section Name:
          <input
            type="text"
            name="section"
            value={sectionData.section}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={sectionData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSectionForm;
