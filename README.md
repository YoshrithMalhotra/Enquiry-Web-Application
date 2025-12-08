# Customer Enquiry Management System

A full-stack web application for managing customer enquiries built with Spring Boot (Backend) and ReactJS (Frontend).

## Features

### Core Features
- ✅ Submit customer enquiries with form validation
- ✅ View all enquiries in a table format
- ✅ Delete enquiries
- ✅ Search enquiries by name or email
- ✅ Pagination for better list management
- ✅ Real-time validation and error handling
- ✅ Toast notifications for user feedback

### Technical Stack
- **Backend**: Spring Boot 3.2.0 with Java 21 LTS
- **Frontend**: ReactJS 18.2.0
- **Database**: PostgreSQL
- **API**: RESTful APIs with JSON
- **Build Tool**: Maven

## Prerequisites

Before running this application, ensure you have the following installed:

- Java 21 (LTS)
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Maven 3.6+

## Database Setup

1. Install PostgreSQL and start the service
2. Create a new database:
```sql
CREATE DATABASE customer_enquiry_db;
```

3. Update database credentials in `backend/src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/customer_enquiry_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

### API Endpoints

- `POST /api/enquiries` - Create a new enquiry
- `GET /api/enquiries` - Get all enquiries (with pagination and search)
  - Query params: `page`, `size`, `sortBy`, `search`
- `GET /api/enquiries/{id}` - Get enquiry by ID
- `DELETE /api/enquiries/{id}` - Delete an enquiry

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start at `http://localhost:3000`

## Project Structure

```
Customer Enquiry/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/customerenquiry/
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── exception/        # Exception Handlers
│   │   │   │   ├── model/            # JPA Entities
│   │   │   │   ├── repository/       # Data Repositories
│   │   │   │   ├── service/          # Business Logic
│   │   │   │   └── CustomerEnquiryApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EnquiryForm.js
│   │   │   ├── EnquiryForm.css
│   │   │   ├── EnquiryList.js
│   │   │   └── EnquiryList.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Usage

1. Start PostgreSQL database
2. Run the backend Spring Boot application
3. Run the frontend React application
4. Open your browser and navigate to `http://localhost:3000`
5. Use the "Submit Enquiry" tab to create new enquiries
6. Use the "View All Enquiries" tab to see, search, and delete enquiries

## Features in Detail

### Form Validation
- Name: Required field
- Email: Required, must be valid email format
- Phone: Required, must be valid phone number (7-20 characters, allows +, -, spaces, and parentheses)
- Message: Required field

### Search Functionality
- Search by customer name (case-insensitive)
- Search by email address (case-insensitive)
- Real-time search with automatic refresh

### Pagination
- Configurable page size (5, 10, 20, or 50 items per page)
- Previous/Next navigation
- Current page indicator
- Total items count

## Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/customer-enquiry-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created for assessment purposes.
# Enquiry-Web-Application
