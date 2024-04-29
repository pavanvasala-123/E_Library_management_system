import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/addbook.css'; 

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    section:'',
    image: null, // New state for image file
    pdf: null,   // New state for PDF file
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // Handle file input separately
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForFile = new FormData();
      formDataForFile.append('title', formData.title);
      formDataForFile.append('description', formData.description);
      formDataForFile.append('author', formData.author);
      formDataForFile.append('section', formData.section);
      formDataForFile.append('image', formData.image); // Append image file
      formDataForFile.append('pdf', formData.pdf);     // Append PDF file

      let options = {
        method: 'POST',
        body: formDataForFile,
      };
      console.log(formData)
      const response = await fetch('http://localhost:3002/books', options);

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          author: '',
          section:'',
          image: null,
          pdf: null,
        });

        toast("Book added successfully");
      } else {
        console.error(response.statusText);
        toast("Error adding book");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
      <div className='book-form-bg-continer'>
    <div className="book-form-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
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
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Section:
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </label>
        <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept=".jpeg, .jpg, .png"
            />
          </label>
          <label>
            PDF:
            <input
              type="file"
              name="pdf"
              onChange={handleChange}
              accept=".pdf"
            />
          </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};




// const AddBook = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     author: '',
//     section: '',
//     quantity: '',
//     image: null, // New state for image file
//     pdf: null,   // New state for PDF file
//   });

//   const handleChange = (e) => {
//     if (e.target.files) {
//       // Handle file input separately
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.files[0],
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataForFile = new FormData();
//       formDataForFile.append('title', formData.title);
//       formDataForFile.append('content', formData.content);
//       formDataForFile.append('author', formData.author);
//       formDataForFile.append('section', formData.section);
//       formDataForFile.append('quantity', formData.quantity);
//       formDataForFile.append('image', formData.image);
//       formDataForFile.append('pdf', formData.pdf);

//       // let options = {
//       //   method: 'POST',
//       //   body: formDataForFile,
        
//       // };
//       let options = { method: 'POST',headers: {'Content-Type': 'application/json',},
//         body: JSON.stringify(formData),}


//       const response = await fetch('http://localhost:3002/books', options);

//       if (response.ok) {
//         setFormData({
//           title: '',
//           content: '',
//           author: '',
//           section: '',
//           quantity: '',
//           image:null,
//           pdf: null,
//         });
//         toast("Book added successfully")
//         console.log('Book added successfully');
//       } else {
//         toast("Error adding book")
//         // console.error(response);
//         console.log('Error adding book');
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className='book-form-bg-continer'>
//       <div className="book-form-container">
//       {console.log(formData)}
//         <h2>Add a New Book</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Title:
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Description:
//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Author:
//             <input
//               type="text"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Section:
//             <input
//               type="text"
//               name="section"
//               value={formData.section}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Quantity:
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Image:
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               accept=".jpeg, .jpg, .png"
//             />
//           </label>
//           <label>
//             PDF:
//             <input
//               type="file"
//               name="pdf"
//               onChange={handleChange}
//               accept=".pdf"
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default AddBook;
