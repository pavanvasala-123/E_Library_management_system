import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/createsection.css";

const AddSection = () => {
  const [formData, setFormData] = useState({
    section: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const response = await fetch("http://localhost:3002/section", options);

      if (response.ok) {
        setFormData({
          section: "",
          description: "",
        });

        toast("section added");
      } else {
        console.error(response.statusText);
        toast("Error to create a section");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="section-form-container">
      {" "}
      {/* Use a different class name */}
      <h2>Create a New Section</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Section Name:
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSection;
