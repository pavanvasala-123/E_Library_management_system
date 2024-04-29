import './App.css';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import AddBook from './components/addbook';
import Navbar from './components/Navbar';
import AddSection from './components/createsection';
import SectionsTable from './components/sections'
import PendingRequests from './components/PendingRequests'
import EditSectionForm from './components/Editsection'
import BooksTable from './components/sectionBooks';
import SignupForm from './components/signup';
import LoginForm from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>   
        <Routes>
          <Route path='/signup' Component={SignupForm}/>
          <Route path='/login' Component={LoginForm}/>
          <Route path="/add-book" Component={AddBook}/>
          <Route path='/create-section' Component={AddSection}/>
          <Route path='/get-sections' Component={SectionsTable}/>
          <Route path='/pending-book-request' Component={PendingRequests}/>
          <Route path = {'/edit-section/:sectionId'} Component={EditSectionForm }/>
          <Route path = {'/section/:sectionId/books'} Component={BooksTable}/>
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
