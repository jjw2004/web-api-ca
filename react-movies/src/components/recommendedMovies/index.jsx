import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getRecommendedMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Typography, Grid, Card, CardMedia, CardContent, Box, CardActionArea } from "@mui/material";

const RecommendedMovies = ({ movie }) => {
  const navigate = useNavigate();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommended", { id: movie.id }],
    queryFn: getRecommendedMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography variant="h6">Error: {error.message}</Typography>;

  const movies = data?.results?.slice(0, 6) || [];
  if (movies.length === 0) return null;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
        Recommended Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((rec) => (
          <Grid item xs={6} sm={4} md={2} key={rec.id}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea onClick={() => navigate(`/movies/${rec.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    rec.poster_path
                      ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={rec.title}
                />
                <CardContent>
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {rec.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {rec.release_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedMovies;
