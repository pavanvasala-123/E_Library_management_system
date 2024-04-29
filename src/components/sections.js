import React, { useState, useEffect } from 'react';
import '../styles/sections.css'; 
import {toast} from 'react-toastify'
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

const SectionsTable = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const authToken = Cookies.get("token");
    if(!authToken){
      toast("user is not authorized")
    }

  useEffect(() => {
    
    const fetchData = async () => {
      let options = {
        headers : {
          Authorization: `Bearer ${authToken}`,
        }
      }
      try {
        const response = await fetch('http://localhost:3002/section/sections',options);
        if (response.ok) {
          const data = await response.json();
          setSections(data);
        } else {
          console.error('Failed to fetch sections');
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchData();
  }, []); 

  const handleEdit = (sectionId) => {
    // Redirect to the edit section page
    navigate(`/edit-section/${sectionId}`)

  };

  const handleDelete = async(sectionId) => {
    console.log(sectionId)

    try {
      const options = {
        method: 'Delete'
      };
      const response = await fetch(`http://localhost:3002/section/delete/${sectionId}`,options);
      if (response.ok) {
        toast("section deleted sucessfully")
        setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
        
      } else {
        toast("Error to delete section")
        console.error('Failed to fetch sections');
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
    }

  }

  const handleSectionBooks = (sectionId) => {
    navigate(`/section/${sectionId}/books`)
  }

  return (
    <div className="sections-table-container">
      <h2>All Sections</h2>
      {sections.length === 0 ? (
        <p>No sections available.</p>
      ) : (
        <table className="sections-table">
          <thead>
            <tr>
              <th>Section ID</th>
              <th>Section Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.id}>
                <td>{section.id}</td>
                <td>{section.section}</td>
                <td>
                <button
                    className="edit-button"
                    onClick={() => handleEdit(section.id)}
                  >
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(section.id)}>
                    Delete
                  </button>
                  <button className="view-books" onClick={() => handleSectionBooks(section.id)}>
                    View Books
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SectionsTable;
