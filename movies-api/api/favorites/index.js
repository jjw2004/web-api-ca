import express from 'express';
import Favorite from './favoriteModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get all favorites for a user
router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId }).sort({ dateAdded: -1 });
    res.status(200).json(favorites);
}));

// Add a movie to favorites
router.post('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { movieId, movieTitle, moviePoster } = req.body;

    const favorite = await Favorite.create({
        userId,
        movieId,
        movieTitle,
        moviePoster
    });

    res.status(201).json(favorite);
}));

// Remove a movie from favorites
router.delete('/:userId/:movieId', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.params;
    
    const result = await Favorite.findOneAndDelete({ 
        userId, 
        movieId: parseInt(movieId) 
    });

    if (!result) {
        return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite removed', movieId });
}));

export default router;
