import express from 'express';
import asyncHandler from 'express-async-handler';
import { 
    getMovies, 
    getUpcomingMovies, 
    getMovie, 
    getMovieImages, 
    getMovieReviews, 
    getMovieCredits, 
    getPopularMovies, 
    getTopRatedMovies, 
    getNowPlayingMovies, 
    getGenres,
    getMovieRecommendations,
    getPersonDetails,
    getPersonMovieCredits,
    searchMovies
} from '../tmdb-api';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/search', asyncHandler(async (req, res) => {
    const query = req.query.query;
    const searchResults = await searchMovies(query);
    res.status(200).json(searchResults);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    const movie = await getMovie(movieId);
    res.status(200).json(movie);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    const images = await getMovieImages(movieId);
    res.status(200).json(images);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    const reviews = await getMovieReviews(movieId);
    res.status(200).json(reviews);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    const credits = await getMovieCredits(movieId);
    res.status(200).json(credits);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    const recommendations = await getMovieRecommendations(movieId);
    res.status(200).json(recommendations);
}));

export default router;
