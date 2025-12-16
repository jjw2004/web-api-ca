import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: '#222',
                    }}
                >
                    <LoginIcon sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
                    <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Login
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: '#b0b0b0' }}>
                        You must log in to view the protected pages
                    </Typography>
                    <Box component="form" sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#555',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#d32f2f',
                                    },
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#555',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#d32f2f',
                                    },
                                },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={login}
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#d32f2f',
                                '&:hover': {
                                    backgroundColor: '#b71c1c',
                                },
                                padding: '12px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Log In
                        </Button>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                Not Registered?{' '}
                                <Link
                                    to="/signup"
                                    style={{
                                        color: '#d32f2f',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Sign Up!
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage;
