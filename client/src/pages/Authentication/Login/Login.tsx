import { useMutation } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, FormControl, Paper, TextField, Typography } from '@mui/material';
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

    const { data } = await Login({ variables: { ...inputData } });

    login(data.login.token);

    formRef.current?.reset();
    navigate('/app');
  }, []);

  return (
    <Box sx={{ display: 'grid', height: '100vh', gridTemplateRows: 'auto', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ padding: '2rem 5rem 3rem 5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            <Button data-testid="back-button" color="secondary" onClick={() => navigate(-1)}>
              <ArrowBackIcon /> Back
            </Button>
          </Box>
          <Typography data-testid="login-header" variant="h4" color="primary">
            Login
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
                label="Username"
                helperText={inputError?.username}
                slotProps={{ formHelperText: { sx: { color: (t) => t.palette.error.main } } }}
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
                slotProps={{ formHelperText: { sx: { color: (t) => t.palette.error.main } } }}
              />
            </FormControl>
            <FormControl>
              <Button data-testid="submit" id='submit' type="submit" variant="outlined">
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
