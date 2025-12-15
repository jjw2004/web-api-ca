import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Container,
  Paper,
  CardActionArea
} from "@mui/material";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: person, error: personError, isPending: personPending, isError: personIsError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPersonDetails,
  });

  const { data: credits, error: creditsError, isPending: creditsPending, isError: creditsIsError } = useQuery({
    queryKey: ["personMovies", { id }],
    queryFn: getPersonMovies,
  });

  if (personPending || creditsPending) return <Spinner />;
  if (personIsError) return <Typography variant="h6">Error: {personError.message}</Typography>;
  if (creditsIsError) return <Typography variant="h6">Error: {creditsError.message}</Typography>;

  const movies = credits?.cast?.slice(0, 12) || []; // Show top 12 movies

  return (
    <Container sx={{ paddingY: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={person.name}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {person.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {person.known_for_department}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Birthday:</strong> {person.birthday || "N/A"}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Place of Birth:</strong> {person.place_of_birth || "N/A"}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
              Biography
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
              {person.biography || "No biography available."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom>
        Known For
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea onClick={() => navigate(`/movies/${movie.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {movie.character}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActorDetailsPage;
