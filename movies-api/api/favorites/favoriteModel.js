import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  movieId: { 
    type: Number, 
    required: true 
  },
  movieTitle: {
    type: String,
    required: true
  },
  moviePoster: {
    type: String
  },
  dateAdded: { 
    type: Date, 
    default: Date.now 
  }
});

// Ensure a user can't add the same movie twice
FavoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model('Favorite', FavoriteSchema);
