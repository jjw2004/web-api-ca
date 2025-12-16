import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Box, TextField, Button, Typography, Paper, Container, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");
  
  const register = async () => {
    setError("");
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setError("Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*#?&)");
      return;
    }

    if (password !== passwordAgain) {
      setError("Passwords do not match");
      return;
    }

    if (validPassword && password === passwordAgain) {
      let result = await context.register(userName, password);
      setRegistered(result);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
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
          <PersonAddIcon sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: '#b0b0b0' }}>
            Create an account to save your favorites and must-watch movies.
          </Typography>
          <Typography variant="caption" sx={{ mb: 2, textAlign: 'center', color: '#888' }}>
            Usernames must be unique. Passwords must contain a minimum of 8 characters 
            (with at least one uppercase letter, one lowercase letter, one number, and one symbol from @$!%*#?&).
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
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
              autoComplete="new-password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordAgain"
              label="Confirm Password"
              type="password"
              id="passwordAgain"
              autoComplete="new-password"
              value={passwordAgain}
              onChange={e => setPasswordAgain(e.target.value)}
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
              onClick={register}
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
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpPage;
