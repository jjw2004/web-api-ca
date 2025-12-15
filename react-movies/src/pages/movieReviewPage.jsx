import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
  let location = useLocation();
  
  // Add error handling for missing state
  if (!location.state) {
    return <div>Error: No review data found. Please navigate from the reviews page.</div>;
  }
  
  const {movie, review} = location.state;
  
  // Add error handling for missing movie or review
  if (!movie || !review) {
    return <div>Error: Missing movie or review data.</div>;
  }
  
  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;