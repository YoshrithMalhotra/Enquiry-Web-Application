#!/bin/bash

echo "======================================"
echo "Customer Enquiry Management System"
echo "Setup Script"
echo "======================================"
echo ""

# Check Java version
echo "Checking Java version..."
java -version 2>&1 | head -n 1

# Check Node.js version
echo ""
echo "Checking Node.js version..."
node --version

# Check PostgreSQL
echo ""
echo "Checking PostgreSQL..."
psql --version

echo ""
echo "======================================"
echo "Setting up Backend..."
echo "======================================"
cd backend
mvn clean install -DskipTests
echo "Backend build complete!"

echo ""
echo "======================================"
echo "Setting up Frontend..."
echo "======================================"
cd ../frontend
npm install
echo "Frontend dependencies installed!"

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database: CREATE DATABASE customer_enquiry_db;"
echo "3. Start backend: cd backend && mvn spring-boot:run"
echo "4. Start frontend: cd frontend && npm start"
echo ""
echo "Backend will run on: http://localhost:8080"
echo "Frontend will run on: http://localhost:3000"
echo ""
