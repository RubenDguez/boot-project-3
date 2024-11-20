import { useCallback, useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rawAbout from '../../../public/about.md?url';
import { Avatar, Box, Button, Container, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import classes from './About.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface ITeam {
    name: string;
    link: string;
}

const team: Array<ITeam> = [
  { name: 'Molly Howard', link: 'https://github.com/mollyhoward319' },
  { name: 'Isaiah Capers', link: 'https://github.com/Isaiahcapers' },
  { name: 'Moaaied Badri', link: 'https://github.com/moayed10111' },
  { name: 'Ruben Dominguez', link: 'https://github.com/RubenDguez' },
];

export default function About() {
  const [text, setText] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    try {
      navigate(pathname.split('about')[0]);
    } catch (error) {
      console.error(error);
    }
  }, [pathname]);

  useEffect(() => {
    async function getText() {
      const response = await fetch(rawAbout);
      const text = await response.text();
      setText(text);
    }
    getText();
  }, []);
  return (
    <Container className={`${classes.about}`}>
        <Box sx={{ width: '100%', height: '2rem', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
        <Button size="small" color="secondary" onClick={handleBackClick}>
          <ArrowBackIcon /> Back
        </Button>
      </Box>
       <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="/logotransparent.png" alt="Better Together Logo" style={{ height: '15rem' }} />
      </Box>
    
      <div style={{ color: '#2e382e' }}><Markdown >{text}</Markdown>
      </div>
      <Box sx={{ padding: '5rem 0px', textAlign: 'center' }}>
      <Divider />
      <br></br>
        <Typography variant="h3">"WE ARE BETTER TOGETHER"</Typography>
      
        <Box sx={{ padding: '3rem 0px', width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {team.map((member) => (
            <a href={member.link} key={member.name}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar sx={{ width: '6rem', height: '6rem', marginBottom: '1rem', border: '3px solid darkgreen' }} alt={member.name} src={`${member.link}.png`} />
              <Typography variant="button">{member.name}</Typography>
            </Box>
            </a>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
