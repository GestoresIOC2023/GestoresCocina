import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function CheckboxList(prop) {
  const [checked, setChecked] = React.useState([]);
  const [items, setItems] = React.useState(prop.ingredientes);
  const [showPaper, setShowPaper] = React.useState(true); 
  React.useEffect(() => {
    setItems(prop.ingredientes);
  }, [prop.ingredientes]);
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleRemoveAll = () => {
    setChecked([]);
    setShowPaper(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Lista de la compra
      </Typography>
      {showPaper && ( 
        <Paper>
          <List>
            {items.map((value, index) => {
              const labelId = `checkbox-list-label-${value}`;
              const isItemChecked = checked.indexOf(value) !== -1;
              return (
                <React.Fragment key={value}>
                  <ListItem disablePadding>
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={isItemChecked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        id={labelId} 
                        primary={`${value}`} 
                        sx={{ textDecoration: isItemChecked ? 'line-through' : 'none' }} 
                      />
                    </ListItemButton>
                  </ListItem>
                  {index !== items.length - 1 && <Divider light />} 
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      )}
      <Button variant="outlined" color="error" sx={{ my: 2 }} onClick={handleRemoveAll}>
        Borrar todos
      </Button>
    </Box>
  );
}
