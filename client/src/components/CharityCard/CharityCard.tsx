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
  image: string;
}

const CharityCard: React.FC<CharityCardProps> = ({ name, description, location, website, onAdd, title, id, image }) => {
  return (
    <Card sx={{ 
        marginBottom: '1rem',  
        backgroundColor: "#9AC171",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "150px",
        }}>
        <Box
          sx={{
            display: "flex",
          }}
        >    
        <CardMedia
            component="img"
            sx={{ width: "150px", display: { xs: "none", sm: "flex" } }}
            image={image}
            alt="event image"
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
                    {/* code to remove charity from profile */}
            {/* <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button size="small" onClick={() => handleDelete(id)}>Remove Charity</Button>
            </CardActions> */}
          <Button variant="contained" color="secondary" onClick={onAdd}>
            Add Charity to My Saved Charities
          </Button>
        </Box>
        </Box>
    </Card>
  );
};

export default CharityCard;