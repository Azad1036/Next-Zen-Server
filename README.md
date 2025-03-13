# Crowdcube Backend

This repository contains the backend code for *Crowdcube*, a crowdfunding platform where users can create, manage, and donate to campaigns. The backend is built with Node.js, Express, and MongoDB, and it is deployed on Vercel. The live server URL is: [https://crowdcube-backend.vercel.app](https://crowdcube-backend.vercel.app).

## Features

- **API Endpoints**: Provides RESTful APIs for user authentication, campaign management, and donation tracking.
- **Database Integration**: Uses MongoDB to store campaign data, user details, and donation records securely.
- **Protected Routes**: Implements JWT-based authentication to secure private routes like adding or updating campaigns.
- **Environment Variables**: Hides sensitive information like MongoDB credentials and Firebase config keys using `.env`.
- **Scalable Design**: Structured to handle sorting, filtering, and deadline-based logic for campaigns efficiently.
- **Error Handling**: Custom error responses for invalid requests, authentication failures, and database errors.
- **Data Validation**: Ensures all incoming campaign and donation data is validated before storage.

## Project Structure

- `models/` - MongoDB schemas for users, campaigns, and donations.
- `routes/` - API route definitions for authentication, campaigns, and donations.
- `controllers/` - Logic for handling requests and responses.
- `middleware/` - Authentication and validation middleware.
- `config/` - Database connection and environment setup.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/yourusername/crowdcube-backend.git`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB credentials and JWT secret (see `.env.example`).
4. Run the server locally: `npm run dev`
5. Deploy to Vercel for production hosting.

## API Endpoints

- **POST /api/auth/login** - Authenticate a user.
- **POST /api/campaigns** - Add a new campaign (protected).
- **GET /api/campaigns** - Fetch all campaigns with sorting options.
- **PUT /api/campaigns/:id** - Update a campaign (protected).
- **DELETE /api/campaigns/:id** - Delete a campaign (protected).
- **POST /api/donations** - Record a donation (protected).

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Vercel (for deployment)

## Challenges Implemented

- Sorting functionality for campaigns based on "Minimum Donation Amount".
- Deadline validation to prevent donations to expired campaigns.

## Notes

- Ensure at least 8 notable GitHub commits are made to this repository as per the assignment requirements.
- The backend works seamlessly with the Crowdcube frontend hosted on Netlify/Firebase/Surge.
- For local testing, use tools like Postman to interact with the APIs.