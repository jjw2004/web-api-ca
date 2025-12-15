import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Typography, Grid, Card, CardMedia, CardContent, Box, CardActionArea } from "@mui/material";

const MovieCast = ({ movie }) => {
  const navigate = useNavigate();
  
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography variant="h6">Error: {error.message}</Typography>;

  const cast = data?.cast?.slice(0, 6) || []; // Show top 6 cast members

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((actor) => (
          <Grid item xs={6} sm={4} md={2} key={actor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea onClick={() => navigate(`/person/${actor.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={actor.name}
                />
                <CardContent sx={{ flexGrow: 1, padding: 1 }}>
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {actor.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {actor.character}
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

export default MovieCast;
