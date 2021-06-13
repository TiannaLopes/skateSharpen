import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function VilleButton() {
  const classes = useStyles();

  return (
      <Button variant="contained" color="secondary">
        ignore this button for now  
      </Button>
  );
}