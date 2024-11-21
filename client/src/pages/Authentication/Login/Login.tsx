import { useMutation } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Box, Button, Container, FormControl, Paper, TextField, Typography, GlobalStyles } from '@mui/material';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { LOGIN_USER } from '../../../utils/mutations';

interface IUser {
  username: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth({ needsAuth: false });
  const [Login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const [inputError, setInputError] = useState<IUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputData: IUser = {
      username: usernameInputRef.current?.value ?? '',
      password: passwordInputRef.current?.value ?? '',
    };

    if (!inputData.username || !inputData.password) {
      setInputError({
        username: !inputData.username ? 'Username is a required field' : '',
        password: !inputData.password ? 'Password is a required field' : '',
      });

      return;
    }

    setInputError({ username: '', password: '' });

    try {
      const { data } = await Login({ variables: { ...inputData } });
      login(data.login.token);
      formRef.current?.reset();
      navigate('/app');
    } catch (error) {
      setLoginError('Invalid username or password');
    }
  }, []);

  return (
    <Box sx={{ display: 'grid', height: '100vh', gridTemplateRows: 'auto', alignItems: 'center' }}>
      <GlobalStyles
           styles={{
            'input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px #e7decd inset',
              WebkitTextFillColor: '#000000',
            },
            'input:-webkit-autofill:focus': {
              WebkitBoxShadow: '0 0 0 1000px #e7decd inset',
              WebkitTextFillColor: '#000000',
            },
            'input:-webkit-autofill:hover': {
              WebkitBoxShadow: '0 0 0 1000px #e7decd inset',
              WebkitTextFillColor: '#000000',
            },
        }}
      />
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ padding: '2rem 5rem 3rem 5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            <Button data-testid="back-button" color="secondary" onClick={() => navigate('/')}>
              <ArrowBackIcon /> Back
            </Button>
          </Box>
          {loginError !== null && (
            <Alert severity='error'>
              <Typography>{loginError}</Typography>
            </Alert>
          )}
          <Typography data-testid="login-header" variant="h4" sx={{ textAlign: 'center', color: '#e7decd' }}>
        LOGIN
          </Typography>
          <form
            data-testid="login-form"
            ref={formRef}
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              width: '100%',
            }}
          >
            <FormControl>
              <TextField
                data-testid="username"
                required
                fullWidth
                id="username"
                type="text"
                size="small"
                variant="standard"
                inputRef={usernameInputRef}
                label="Username / Email"
                helperText={inputError?.username}
                InputProps={{
                  sx: {
                      color: '#e7decd',
                    },
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                data-testid="password"
                required
                fullWidth
                id="password"
                type="password"
                size="small"
                variant="standard"
                inputRef={passwordInputRef}
                label="Password"
                helperText={inputError?.password}
                InputProps={{
                 sx: {
                    color: '#e7decd',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <Button data-testid="submit" id="submit" type="submit" variant="outlined" color="secondary">
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
