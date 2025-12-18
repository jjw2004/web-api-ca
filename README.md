# Web API CA2 - Movies Application

**Student:** John Joey Wright  
**Student ID:** 20105823

## Overview
Full-stack React movies application with Express.js backend API integrating TMDB (The Movie Database) data.

## Features Implemented

### Authentication
- User registration with password validation
- User login with JWT token authentication
- Protected routes requiring authentication
- AuthContext for global authentication state
- Material-UI styled login/signup pages
- Site header shows user status and conditional navigation

### Movies API
- Complete Express.js REST API with MongoDB integration
- All TMDB endpoints proxied through backend API:
  - **Movie Endpoints:** `/api/movies/discover`, `/upcoming`, `/popular`, `/top_rated`, `/now_playing`, `/genres`, `/search`, `/:id`, `/:id/images`, `/:id/reviews`, `/:id/credits`, `/:id/recommendations`
  - **Person/Cast Endpoints:** `/api/persons/:id`, `/:id/movie_credits`
- Frontend fully integrated - all fetches go through web API (no direct TMDB calls)
- Error handling with async handlers
- CORS enabled for React frontend
