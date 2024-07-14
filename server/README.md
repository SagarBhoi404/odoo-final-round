# Library Management System

A comprehensive Library Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to manage book inventories, track borrower details, and handle transactions efficiently.

## Features

- **User Management**

  - Login/Logout functionality for Admin, Librarians, and Users.
  - Role-based access control: Admin, Librarian, and User roles.
  - Signup With Google

- **Book Inventory Management**

  - Add, update, delete, and search for books.
  - Book details: ISBN, title, author, publisher, year, genre, quantity.
  - Real-time availability status.

- **Borrowing System**

  - Checkout process for borrowing books.
  - Return process including due dates and late fees calculation.
  - History tracking for each user's borrowed and returned books.

- **Search and Recommendations**

  - Advanced search options (by title, author, genre, etc.).
  - Book recommendations based on user history or popular trends.

- **Notifications and Alerts**

  - Email or SMS notifications for due dates, new arrivals, etc.
  - Alerts for overdue books and outstanding fees.

- **Reporting**
  - Generate reports on book usage, overdue items, user activity, etc.
  - Dashboard for admins and librarians to see real-time statistics.

## Technologies and Tools

- **Frontend:**
  - React.js
  - Redux (for state management)
  - React Router (for navigation)
  - Material-UI (for UI components)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (for authentication)
- **Other Tools:**
  - Cloudinary (for image storage)
  - Nodemailer (for sending emails)
  - Swagger (for API documentation)
  - dotenv (for environment variables)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/SagarBhoi404/odoo-final-round.git
   cd odoo-final-round
   cd client
   npm install
   npm start
   cd server
   npm install
   npm run dev

   ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`

#Google OAuth

`CLIENT_ID`

`CLIENT_SECRET`

`CLIENT_URL`
