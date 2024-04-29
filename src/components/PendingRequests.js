import React,{useEffect,useState} from 'react'
import '../styles/PendingRequest.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function PendingRequests() {
    const [requests, setRequests] = useState([]);

    const authToken = Cookies.get("token");
    if(!authToken){
      toast("user is not authorized")
    }

    useEffect(() => {
        const FetchData = async() =>{
            let options = { method: 'GET', headers: {'Content-Type': 'application/json'},}
    
            const response = await fetch('http://localhost:3002/books/pending-book-request',options);
            const data = await response.json();
            setRequests(data);
            
        }
        FetchData()
      
    
      
    }, [])

    const handleAccept = async(id)=>{
            let options = { method: 'POST', headers: {'Content-Type': 'application/json'},Authorization: `Bearer ${authToken}`}

            const response = await fetch(`http://localhost:3002/books/accept-book-request/${id}`,options);
            if(response.ok){
                console.log("Accepted")
            }
        
    }

  return (
    <div className='book_request_table'>
      <h2>Pending Book Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests at the moment.</p>
      ) : (
        <table className="pending-requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Requested Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.userId}</td>
                <td>{request.User.firstname}</td>
                <td>{request.bookId}</td>
                <td>{request.Book.title}</td>
                <td>{request.requestedDate}</td>
                <td>
                  <button onClick={() => handleAccept(request.id)}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PendingRequests