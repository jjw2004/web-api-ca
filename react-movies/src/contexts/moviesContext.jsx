import React, { useState, useContext, useEffect } from "react";
import { addFavorite, removeFavorite, addMustWatch, removeMustWatch, getFavoriteMovies, getMustWatchMovies } from "../api/tmdb-api";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const authContext = useContext(AuthContext);
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} )
  const [mustWatch, setMustWatch] = useState( [] )

  // Load favorites and must watch from database when user logs in
  useEffect(() => {
    const loadUserData = async () => {
      if (authContext.userId) {
        try {
          const favoritesData = await getFavoriteMovies(authContext.userId);
          const favoriteIds = favoritesData.map(fav => fav.movieId);
          setFavorites(favoriteIds);

          const mustWatchData = await getMustWatchMovies(authContext.userId);
          const mustWatchIds = mustWatchData.map(mw => mw.movieId);
          setMustWatch(mustWatchIds);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };
    loadUserData();
  }, [authContext.userId]);

  const addToFavorites = async (movie) => {
    if (!authContext.userId) return;
    
    try {
      await addFavorite(authContext.userId, movie);
      let newFavorites = [];
      if (!favorites.includes(movie.id)){
        newFavorites = [...favorites, movie.id];
      }
      else{
        newFavorites = [...favorites];
      }
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  
  // We will use this function in the next step
  const removeFromFavorites = async (movie) => {
    if (!authContext.userId) return;
    
    try {
      await removeFavorite(authContext.userId, movie.id);
      setFavorites( favorites.filter(
        (mId) => mId !== movie.id
      ));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const addToMustWatch = async (movie) => {
    if (!authContext.userId) return;
    
    try {
      await addMustWatch(authContext.userId, movie);
      let newMustWatch = [];
      if (!mustWatch.includes(movie.id)){
        newMustWatch = [...mustWatch, movie.id];
      }
      else{
        newMustWatch = [...mustWatch];
      }
      setMustWatch(newMustWatch);
      console.log("Must Watch list:", newMustWatch);
    } catch (error) {
      console.error("Error adding to must watch:", error);
    }
  };

  const removeFromMustWatch = async (movie) => {
    if (!authContext.userId) return;
    
    try {
      await removeMustWatch(authContext.userId, movie.id);
      setMustWatch( mustWatch.filter(
        (mId) => mId !== movie.id
      ));
    } catch (error) {
      console.error("Error removing from must watch:", error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;