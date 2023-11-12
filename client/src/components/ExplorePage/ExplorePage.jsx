import React from 'react';
import '../../styles/explorePage.css'
import MapCard from './MapCard'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';


export default function ExplorePage() {
  return (
      <div className = "explorePage">
        <div className = "heading"><h1>Explore</h1></div>
        <div className = "buttons">
          <div className = "filter"><Button
              variant = "contained"
              sx = {{backgroundColor : 'var(--main-color)',
                    '&:hover': {backgroundColor: 'var(--dark-color)'}}}
          >Filter</Button>
          </div>
          <div className = "sort">
              <Button
                  variant = "contained"
                  sx = {{backgroundColor : 'var(--main-color)',
                      '&:hover': {backgroundColor: 'var(--dark-color)'}}}
              >Sort</Button>
          </div>
        </div>
        <div className = "content">
            <div className = "MapCard">
            <MapCard></MapCard>
          </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
        </div>

      </div>
  );
}
