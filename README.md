# Rentify


Rentify is a web application designed to facilitate the rental process for both buyers and sellers. It provides a platform where users can register, verify their identity, manage properties, and interact with potential buyers or sellers securely and efficiently.

## Features

### 1. User Registration and Verification
- **Registration**: Allows buyers and sellers to register on the Rentify website by providing necessary details.
- **OTP Verification**: Sends an OTP (One-Time Password) via email after registration to verify the user's identity.

### 2. User Authentication
- **Login**: Allows verified users to log in using their credentials.
- **Password Reset**: Enables users to reset their password if forgotten. Users enter their registered email address, receive an OTP for verification, and set a new password.
- **Password Encryption**: Ensures that user passwords are securely encrypted for data protection.

### 3. Property Listings
- **View Properties**: Allows logged-in users to view properties listed by other sellers, including details such as type of property, number of bedrooms, number of bathrooms, car parking availability, and monthly rent.
- **Filter Properties**: Users can filter properties based on specific requirements (e.g., number of bedrooms, rent range).

### 4. Property Management for Sellers
- **Post Property**: Sellers can post their properties by providing necessary details such as title, description, address, number of bedrooms and bathrooms, rent per month, car parking availability, and proximity to amenities like schools and hospitals.
- **Edit Property**: Allows sellers to edit the details of their posted properties.
- **Delete Property**: Sellers can delete their posted properties.

### 5. Buyer-Seller Interaction
- **Contact Details**: If a buyer is interested in a property, they can obtain the property owner's contact details through an email sent to the buyer's registered email address.

### 6. Additional Features
- **Pagination**: Property listings are displayed with pagination to enhance user experience and manage the display of a large number of properties.
- **Email Verification**: Ensures that users' email addresses are valid and accessible.
- **Secure Password Storage**: Ensures that user passwords are securely stored using encryption techniques.

## Technologies Used

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend
- **ASP.NET Web API**: A framework for building web APIs on the .NET platform.

### Database
- **MSSQL**: Microsoft SQL Server, a relational database management system.

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- .NET SDK
- MSSQL Server

  
###Deloyment Link

- Link : https://myrentify.netlify.app
