import express from 'express';
import MustWatch from './mustWatchModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get all must watch movies for a user
router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const mustWatch = await MustWatch.find({ userId }).sort({ dateAdded: -1 });
    res.status(200).json(mustWatch);
}));

// Add a movie to must watch
router.post('/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { movieId, movieTitle, moviePoster } = req.body;

    const mustWatch = await MustWatch.create({
        userId,
        movieId,
        movieTitle,
        moviePoster
    });

    res.status(201).json(mustWatch);
}));

// Remove a movie from must watch
router.delete('/:userId/:movieId', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.params;
    
    const result = await MustWatch.findOneAndDelete({ 
        userId, 
        movieId: parseInt(movieId) 
    });

    if (!result) {
        return res.status(404).json({ message: 'Must watch item not found' });
    }

    res.status(200).json({ message: 'Must watch removed', movieId });
}));

export default router;
