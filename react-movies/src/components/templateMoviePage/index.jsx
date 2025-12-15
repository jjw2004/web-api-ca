import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data?.posters || [];

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid size={{xs: 12, md: 3}}>
          <ImageList
            sx={{
              height: "70vh",
            }}
            cols={1}
          >
            {images.map((image) => (
              <ImageListItem key={image.file_path} cols={1}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={image.file_path}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid size={{xs: 12, md: 9}}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;