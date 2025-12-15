import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Grid, Card, CardMedia, CardContent, Box, CardActionArea, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function useQueryParam() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const queryParam = useQueryParam();
  const query = queryParam.get("query") || "";
  const navigate = useNavigate();


  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query }],
    queryFn: getSearchMovies,
    enabled: !!query,
  });
  const [sort, setSort] = useState("popularity");
  const movies = data?.results || [];
  const sortedMovies = useMemo(() => {
    if (!movies) return [];
    const sorted = [...movies];
    switch (sort) {
      case "popularity":
        sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case "release_date":
        sorted.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
        break;
      case "rating":
        sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
        break;
      case "title":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      default:
        break;
    }
    return sorted;
  }, [movies, sort]);

  if (!query) {
    return <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>Please enter a search term.</Typography>;
  }
  if (isPending) return <Spinner />;
  if (isError) return <Typography variant="h6">Error: {error.message}</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>
        {movies.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sort}
              label="Sort By"
              onChange={e => setSort(e.target.value)}
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="release_date">Release Date</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="title">Title (A-Z)</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
      {movies.length === 0 ? (
        <Typography variant="h6">No results found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {sortedMovies.map((movie) => (
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
                      {movie.release_date}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchResultsPage;
