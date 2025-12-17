import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPersonDetails, getPersonMovieCredits } from '../tmdb-api';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const personId = req.params.id;
    const person = await getPersonDetails(personId);
    res.status(200).json(person);
}));

router.get('/:id/movie_credits', asyncHandler(async (req, res) => {
    const personId = req.params.id;
    const credits = await getPersonMovieCredits(personId);
    res.status(200).json(credits);
}));

export default router;
