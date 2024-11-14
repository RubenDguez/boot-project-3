import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export default function ServiceCalendar() {
  useAuth();
  return <Typography variant="h2">Service Calendar</Typography>;
}
