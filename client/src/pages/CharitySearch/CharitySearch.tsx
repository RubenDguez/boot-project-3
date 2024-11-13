import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
export default function CharitySearch() {
  useAuth();
  return <Typography variant="h2">Charity Search</Typography>;
}
