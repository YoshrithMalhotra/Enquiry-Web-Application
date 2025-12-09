import React, { useState } from 'react';
import EnquiryForm from './components/EnquiryForm';
import EnquiryList from './components/EnquiryList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('form');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEnquirySubmitted = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab('list');
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Customer Enquiry Management System</h1>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Submit Enquiry
        </button>
        <button
          className={`nav-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          View All Enquiries
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'form' ? (
          <EnquiryForm onEnquirySubmitted={handleEnquirySubmitted} />
        ) : (
          <EnquiryList refreshTrigger={refreshTrigger} />
        )}
      </main>

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
      />
    </div>
  );
}

export default App;
