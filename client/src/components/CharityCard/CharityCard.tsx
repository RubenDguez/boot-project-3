import React from 'react';
import { Card, CardContent, Typography, Button, Box, CardMedia, Divider, CardActions } from '@mui/material';
import { useMutation, useQuery } from "@apollo/client";

interface CharityCardProps {
  name: string;
  id: string;
  title: string;
  description: string;
  location: string;
  website?: string;
  onAdd: () => void;
  image?: string;
  onAddToCalendar: () => void;
}

const CharityCard: React.FC<CharityCardProps> = ({ name, description, location, website, onAdd, onAddToCalendar, title, id, image }) => {
  const defaultImage = "./logo.png ";
  
  return (
    <Card sx={{ 
        marginBottom: '1rem',  
        backgroundColor: "#9AC171",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "200px",
        }}>
        <Box
          sx={{
            display: "flex",
          }}
        >    
        <CardMedia
            component="img"
            sx={{ width: "250px", height: "150px", objectFit: "contain", display: { xs: "none", sm: "flex" } }}
            image={image || defaultImage}
            alt="charity image"
          />
          <Box sx={{width:'100%'}}>
      <CardContent>
        <Typography variant="h6">
          <a href={website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            {name}
          </a>
        </Typography>
        <Divider />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }} >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong>Charity Description:</strong> {description}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Charity Location:</strong>{location}</Typography>
                    </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button variant="contained" color="secondary" onClick={onAdd}>
            Save to Favorites
          </Button>
          <Button variant="contained" color="primary" onClick={onAddToCalendar}>
                Add to Calendar
              </Button>
          </CardActions>
        </Box>
        </Box>
    </Card>
  );
};

export default CharityCard;



