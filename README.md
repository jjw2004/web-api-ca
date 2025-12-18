# Web API CA2 - Movies Application

**Student:** John Joey Wright  
**Student ID:** 20105823

## Overview
Full-stack React movies application with Express.js backend API integrating TMDB (The Movie Database) data.

## Features Implemented

### Authentication (40%)
- User registration with password validation
- User login with JWT token authentication
- Protected routes requiring authentication
- AuthContext for global authentication state
- Material-UI styled login/signup pages
- Site header shows user status and conditional navigation

### Movies API (25%)
- Complete Express.js REST API with MongoDB integration
- All TMDB endpoints proxied through backend API:
  - **Movie Endpoints:** `/api/movies/discover`, `/upcoming`, `/popular`, `/top_rated`, `/now_playing`, `/genres`, `/search`, `/:id`, `/:id/images`, `/:id/reviews`, `/:id/credits`, `/:id/recommendations`
  - **Person Endpoints:** `/api/persons/:id`, `/:id/movie_credits`
- Frontend fully integrated - all fetches go through web API (no direct TMDB calls)
- Error handling with async handlers
- CORS enabled for React frontend

## Project Structure
```
web-api-ca/
├── movies-api/          # Express.js backend
│   ├── api/
│   │   ├── movies/      # Movies router & endpoints
│   │   ├── persons/     # Actor/person router
│   │   └── users/       # Authentication
│   └── db/              # MongoDB connection
└── react-movies/        # React frontend (Vite)
    ├── src/
    │   ├── api/         # API client functions
    │   ├── components/  # React components
    │   ├── contexts/    # AuthContext
    │   ├── pages/       # Page components
    │   └── protectedRoutes.jsx
```

## Technologies Used
- **Backend:** Express.js, MongoDB (Mongoose), JWT, bcrypt, node-fetch
- **Frontend:** React, Vite, Material-UI, React Query, React Router
- **API:** TMDB (The Movie Database)

## Setup Instructions

### Backend (movies-api)
```bash
cd movies-api
npm install
npm start
```
Runs on `http://localhost:8080`

### Frontend (react-movies)
```bash
cd react-movies
npm install
npm run dev
```
Runs on `http://localhost:5174`

## Environment Variables
Create `.env` files in both directories:

**movies-api/.env:**
```
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://username:password@cluster.mongodb.net/movies_db
TMDB_KEY=your_tmdb_api_key
SECRET=your_jwt_secret
```

**react-movies/.env:**
```
VITE_TMDB_KEY=your_tmdb_api_key
```

## Current Status
- ✅ Authentication complete and tested
- ✅ Movies API fully integrated (all endpoints working)
- 🔄 Custom API (Favorites/Reviews) - pending
- 🔄 Documentation and demo video - pending
