import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, FormControl, Paper, TextField, Typography } from '@mui/material';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

interface IUser {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [inputError, setInputError] = useState<IUser | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IUser = {
      username: usernameInputRef.current?.value ?? '',
      password: passwordInputRef.current?.value ?? '',
    };

    if (!data.username || !data.password) {
      setInputError({
        username: !data.username ? 'Username is a required field' : '',
        password: !data.password ? 'Password is a required field' : '',
      });

      return;
    }

    setInputError({ username: '', password: '' });

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
            <Button color="secondary" onClick={() => navigate(-1)}>
              <ArrowBackIcon /> Back
            </Button>
          </Box>
          <Typography variant="h4" color="primary">
            Login
          </Typography>
          <Form
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
              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </FormControl>
          </Form>
        </Paper>
      </Container>
    </Box>
  );
}
