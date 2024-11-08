import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, FormControl, Paper, TextField, Typography } from '@mui/material';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const navigate = useNavigate();

  const [inputError, setInputError] = useState<IUser | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: IUser = {
      firstName: firstNameInputRef.current?.value ?? '',
      lastName: lastNameInputRef.current?.value ?? '',
      username: usernameInputRef.current?.value ?? '',
      email: emailInputRef.current?.value ?? '',
      password: passwordInputRef.current?.value ?? '',
    };

    if (!data.firstName || !data.lastName || !data.username || !data.email || !data.password) {
      setInputError({
        firstName: !data.firstName ? 'First Name is a required field' : '',
        lastName: !data.lastName ? 'Last Name is a required field' : '',
        username: !data.username ? 'Username is a required field' : '',
        email: !data.email ? 'Email is a required field' : '',
        password: !data.password ? 'Password is a required field' : '',
      });

      return;
    }

    setInputError({ firstName: '', lastName: '', username: '', email: '', password: '' });

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
            Sign Up
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
                id="firstName"
                type="text"
                size="small"
                variant="standard"
                inputRef={firstNameInputRef}
                label="First Name"
                helperText={inputError?.firstName}
                slotProps={{ formHelperText: { sx: { color: (t) => t.palette.error.main } } }}
              />
            </FormControl>
            <FormControl>
              <TextField
                required
                fullWidth
                id="lastName"
                type="text"
                size="small"
                variant="standard"
                inputRef={lastNameInputRef}
                label="Last Name"
                helperText={inputError?.lastName}
                slotProps={{ formHelperText: { sx: { color: (t) => t.palette.error.main } } }}
              />
            </FormControl>
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
                id="email"
                type="email"
                size="small"
                variant="standard"
                inputRef={emailInputRef}
                label="Email"
                helperText={inputError?.email}
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
