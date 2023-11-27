import React from 'react';
import { Grid, IconButton, Typography, Card, CardMedia } from '@mui/material';
import { Twitter, Facebook, Instagram } from '@mui/icons-material';
import Button from '@mui/material/Button';

function Header() {
  return (
    <Grid container spacing={2} className="bg-[#F6E9E0] h-[65vh] relative">
      <Grid item xs={6} md={6} className="flex items-center justify-center text-white relative z-10">
        <div className="text-left pl-6">
          <IconButton className="text-[#F6E9E0] bg-[#502918] mb-4 hover:text-[#502918]"><Twitter /></IconButton>
          <IconButton className="text-[#F6E9E0] bg-[#502918] mx-3 mb-4 hover:text-[#502918]"><Facebook /></IconButton>
          <IconButton className="text-[#F6E9E0] bg-[#502918] mb-4 hover:text-[#502918]"><Instagram /></IconButton>
          <Typography variant="h2" className="text-[#FF6724] text-left font-bold mb-6">
            ENCUENTRA TU PRÓXIMA RECETA FAVORITA
          </Typography>
          <Button className="text-white mt-4 bg-[#462918] rounded-full p-4 hover:bg-[#F6E9E0] hover:text-[#462918] text-base">
            UNIRME AHORA
          </Button>
        </div>
      </Grid>

      <div className="absolute bottom-10 right-[190px] h-[55vh] w-[20vw] bg-[#FF6724] p-8 rounded-2xl z-0">
      </div>
      <Grid item xs={6} md={6} className="flex items-center justify-center z-10">
        <Card className="max-w-md flex items-center justify-center rounded-2xl overflow-hidden relative">
          <CardMedia
            component="img"
            height="294"
            image='/pareja-haciendo-platos-cenar-casa.jpg'
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default Header;
