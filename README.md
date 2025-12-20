# Web API CA2 - Movies Application

**Student:** John Joey Wright  
**Student ID:** 20105823

## Overview
Full-stack React movies application with Express.js backend API that integrates TMDB data and provides user-specific features.

## What I Built

### 1. Authentication System (40%)
- Created login and signup pages with Material-UI styling
- Implemented JWT token authentication
- Added password validation (8+ chars, uppercase, lowercase, number, special char)
- Created AuthContext to manage user state across the app
- Protected routes so only logged-in users can access certain pages
- Site header shows username when logged in

### 2. Movies API (25%)
- Built Express.js API that acts as a proxy to TMDB
- Created 14 endpoints that fetch movie data from TMDB:
  - Discover, upcoming, popular, top rated, now playing movies
  - Movie details, images, reviews, cast, recommendations
  - Search movies by title
  - Actor details and filmography
- Updated React frontend to call my API instead of TMDB directly
- All movie data now flows through my backend

### 3. Custom APIs - Favorites & Must Watch (25%)
- Created two custom APIs with MongoDB storage:

**Favorites API:**
- Users can add movies to their favorites list
- GET, POST, DELETE endpoints for favorites
- Data stored in MongoDB with userId + movieId

**Must Watch API:**
- Users can add movies to their must watch list
- GET, POST, DELETE endpoints for must watch
- Data stored in MongoDB with userId + movieId

- Both lists are user-specific and persist in the database
- Lists automatically load when user logs in
- Integrated with existing UI icons

## Steps Taken

1. **Set up project structure** - Copied starter files from labs
2. **Created Movies API** - Added endpoints for discover, upcoming movies
3. **Implemented authentication** - Login/signup pages, JWT tokens, protected routes
4. **Styled login pages** - Used Material-UI for better design
5. **Expanded Movies API** - Added all remaining TMDB endpoints (popular, top rated, genres, etc.)
6. **Created persons router** - Added actor/person endpoints
7. **Updated frontend** - Changed all API calls to use my backend instead of TMDB
8. **Built Favorites API** - Model, router, integrated with frontend
9. **Built Must Watch API** - Model, router, integrated with frontend
10. **Added persistence** - Favorites and must watch load from database on login
11. **Testing** - Verified all features work (login, browse, favorites, logout/login persistence)

## How It Works

1. User registers/logs in receives JWT token and userId
2. Browse movies React calls my API, my API calls TMDB and then returns data
3. Add to favorites saves to MongoDB with userId
4. Logout and login again favorites/must watch reload from database
5. Must Watch and Favourites routes protected must be logged in to use the app and are user specific

- Full authentication with validation and error handling
- All movie fetches go through my API (no direct TMDB calls)
- Two custom APIs (Favorites + Must Watch) with full CRUD operations
- User-specific data that persists in database
- Clean code structure following lab patterns