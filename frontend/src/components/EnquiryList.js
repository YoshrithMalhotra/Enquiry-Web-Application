import React, { useState, useEffect } from 'react';
import { enquiryService } from '../services/api';
import { toast } from 'react-toastify';
import './EnquiryList.css';

const EnquiryList = ({ refreshTrigger }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await enquiryService.getAllEnquiries(
        page,
        pageSize,
        'createdAt',
        searchTerm
      );
      if (response.success && response.data) {
        setEnquiries(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, pageSize, searchTerm, refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        const response = await enquiryService.deleteEnquiry(id);
        if (response.success) {
          toast.success('Enquiry deleted successfully');
          fetchEnquiries();
        }
      } catch (error) {
        console.error('Error deleting enquiry:', error);
        toast.error('Failed to delete enquiry');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="enquiry-list-container">
      <h2>All Enquiries</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <span className="total-count">Total: {totalElements} enquiries</span>
      </div>

      {/* Enquiries Table */}
      {loading ? (
        <div className="loading">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="no-data">No enquiries found</div>
      ) : (
        <div className="table-responsive">
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.id}</td>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.phone}</td>
                  <td className="message-cell">{enquiry.message}</td>
                  <td>{formatDate(enquiry.createdAt)}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(enquiry.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
            className="pagination-btn"
          >
            Next
          </button>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="page-size-select"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default EnquiryList;
