import { useMutation } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, FormControl, Paper, TextField, Typography } from '@mui/material';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { ADD_USER } from '../../../utils/mutations';

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { login } = useAuth({ needsAuth: false });
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const [inputError, setInputError] = useState<Partial<IUser & { passwordMatch: string }> | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordMatchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputData: IUser = {
      firstName: firstNameInputRef.current?.value ?? '',
      lastName: lastNameInputRef.current?.value ?? '',
      username: usernameInputRef.current?.value ?? '',
      email: emailInputRef.current?.value ?? '',
      password: passwordInputRef.current?.value ?? '',
    };

    if (!inputData.firstName || !inputData.lastName || !inputData.username || !inputData.email || !inputData.password) {
      setInputError({
        firstName: !inputData.firstName ? 'First Name is a required field' : '',
        lastName: !inputData.lastName ? 'Last Name is a required field' : '',
        username: !inputData.username ? 'Username is a required field' : '',
        email: !inputData.email ? 'Email is a required field' : '',
        password: !inputData.password ? 'Password is a required field' : '',
        passwordMatch: !(passwordMatchInputRef.current?.value ?? '') ? 'Password is a required field' : '',
      });

      return;
    }

    if (inputData.password !== passwordMatchInputRef.current?.value) {
      setInputError((inputError) => ({ ...inputError, passwordMatch: 'Passwords do not match' }));
      return;
    }

    setInputError({ firstName: '', lastName: '', username: '', email: '', password: '', passwordMatch: '' });

    const { data } = await addUser({ variables: { input: inputData } });
    login(data.addUser.token);

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
          <Typography data-testid="signup-header" variant="h4" color="primary">
            Sign Up
          </Typography>
          <form
            data-testid="signup-form"
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
                data-testid="firstName"
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
                data-testid="lastName"
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
                data-testid="email"
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
              <TextField
                data-testid="password-match"
                required
                fullWidth
                id="password-match"
                type="password"
                size="small"
                variant="standard"
                inputRef={passwordMatchInputRef}
                label="Match Password"
                helperText={inputError?.passwordMatch}
                slotProps={{ formHelperText: { sx: { color: (t) => t.palette.error.main } } }}
              />
            </FormControl>
            <FormControl>
              <Button data-testid="submit" id="submit" type="submit" variant="outlined">
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
