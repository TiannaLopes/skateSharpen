import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import { AuthContext } from './Login';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function MvilleAppBar(props) {
  const classes = useStyles();
  let history = useHistory();
  const authCtx = useContext(AuthContext);
  const doLogout = () => {
    authCtx.signout(() => {
      history.replace({ pathname: "/" });
    });
  }
   
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Progress | {props.section}
          </Typography>
          <Button color="inherit" onClick={doLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}