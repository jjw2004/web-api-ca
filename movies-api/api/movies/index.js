import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getMovie, getMovieImages } from '../tmdb-api';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
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

export default router;
