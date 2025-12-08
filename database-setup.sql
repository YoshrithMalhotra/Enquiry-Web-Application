-- Create database
CREATE DATABASE customer_enquiry_db;

-- Connect to the database
\c customer_enquiry_db;

-- The table will be auto-created by Spring Boot JPA
-- But you can verify it exists with:
-- \dt

-- Sample query to view all enquiries:
-- SELECT * FROM enquiries ORDER BY created_at DESC;
