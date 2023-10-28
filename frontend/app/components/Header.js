import { Grid, IconButton, Typography, Card, CardMedia } from '@mui/material';
import { Twitter, Facebook, Instagram } from '@mui/icons-material';
import Button from '@mui/material/Button';

function Header() {
  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#F6E9E0", height: '400px' }}>
      <Grid item xs={6} md={6}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <IconButton><Twitter /></IconButton>
            <IconButton><Facebook /></IconButton>
            <IconButton><Instagram /></IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ color: "#FF6724", textAlign: 'left' }}>ENCUENTRA TU PRÓXIMA RECETA FAVORITA</Typography>
            <Button variant="outlined" size="large" sx={{ color: "#502918"}}>UNIRME AHORA</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6}>
        <div style={{
          width: "100%", 
          height: 370,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
          background: 'linear-gradient(to right, transparent 50%, #FF6724 50%)',
          borderRadius: '20px',
        }}>
          <Card sx={{
            maxWidth: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
          }}>
            <CardMedia
              component="img"
              height="294"
              image='/pareja-haciendo-platos-cenar-casa.jpg'
            />
          </Card>
        </div>
      </Grid>
    </Grid>
  )
}

export default Header;
