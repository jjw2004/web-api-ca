import PopularMoviesPage from './pages/popularMoviesPage'
import NowPlayingMoviesPage from './pages/nowPlayingMoviesPage'
import ActorDetailsPage from './pages/actorDetailsPage'
import SearchResultsPage from './pages/searchResultsPage'
import FavoriteMoviesPage from './pages/favoriteMoviesPage';
import MustWatchMoviesPage from './pages/mustWatchMoviesPage';
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import TopRatedMoviesPage from './pages/topRatedMoviesPage';
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MovieReviewPage from './pages/movieReviewPage';
import MoviePage from './pages/movieDetailsPage';
import HomePage from './pages/homePage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import SiteHeader from './components/siteHeader';
import MoviesContextProvider from './contexts/moviesContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});



const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d32f2f', // Red
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: '#000', // Black background
      paper: '#222',   // Dark grey for cards/boxes
    },
    text: {
      primary: '#fff',
      secondary: '#b0b0b0',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: '#d32f2f', // Red header
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#222', // Dark grey movie cards
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/must-watch" element={<MustWatchMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/popular" element={<PopularMoviesPage />} />
              <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
              <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
              <Route path="/person/:id" element={<ActorDetailsPage />} />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
              <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);
