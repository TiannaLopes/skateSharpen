import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import VilleButton from './VilleButton';
import VilleTime from './VilleTime';
import VilleTime2 from './VilleTime2';
import VilleMenu from './VilleMenu';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth, PrivateRoute, LoginScreen } from './Login';
import LandingPage from './LandingPage';
import MvilleAppBar from './MvilleAppBar';
import AppointmentsList from './AppointmentsList';
import ExistingRequest from './ExistingRequest';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { UserToken } from './Login';
import { Typography } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';

//import DateFnsUtils from '@date-io/date-fns';
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      flex: 1,
    },
    title2: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
        flex: 1,
      },
      backgrnd: {
       backgroundColor: "darksalmon",
      },
  }));


  function SharpenRequest() {
    const classes = useStyles();
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
  const [comment, setComment] = React.useState('');
  const [DropOffDate, setDropOffDate] = React.useState("1960-01-05");
  const [PickUpDate, setPickUpDate] = React.useState("2020-01-03");

  const [version, setVersion] = useState(0);

  const [reqquestList, setReqquestList] = useState([]);


  const handleSetComment = (event) => {
    setComment(event.target.value);
  };

  const dropOffDateChange = (event) => {
    setDropOffDate(event.target.value);
    console.log(event.target.value);
  };

  const pickUpDateChange = (event) => {
    setPickUpDate(event.target.value);
  };


  useEffect(() => {
    console.log('calling fetch with token ' + UserToken);
    fetch('/reqquest').then(res => res.json()).then(response => {
      console.log('got data');
      console.log(response);
      setReqquestList(response.data.reqquest);
      //setClassBreadcrumbName(response.data.className);
    })
  }, [version]);


   const handleRequest = () => {
    fetch(`/reqquest`, 
        {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(
                {'comment': comment, 'DropOff': DropOffDate, 'PickUp': PickUpDate})
        })
        .then(response => response.json())
        .then(resp_obj => {
            // console.log(resp_obj);
            let status = resp_obj.status;
            if (status === 'success') {
                onSuccess(resp_obj.data);
            } else {
                onFailure(resp_obj.data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

  const onSuccess = () => {
    // setDataUpdatedFcn();
    setVersion(version + 1);
  }

  const onFailure = () => {
    alert('onFailure called');
  }

  const handleListItemClick = (event, reqquestId) => {
    console.log(`load tasks for project ${reqquestId}`);
};




  return (
    <div>
      {/* <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Task
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar> */}
        <Container className={classes.backgrnd}>
        <Typography variant="h6" color="secondary"> Request to get skates sharpened! </Typography>
        <VilleMenu/>
        <form className={classes.root} noValidate autoComplete="off">
           
            <div className={classes.title2}>
                <TextField 
                    id="comment" label="Comment Request" fullWidth 
                    value={comment} onChange={handleSetComment}
                />
            </div>
            </form>
           
    {/* <VilleButton/> */}
    <div>
        <TextField
        id="date1"
        label="Drop off day"
        type="date"
        value={DropOffDate}
        onChange={dropOffDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>

      <div>
      <TextField
        id="date2"
        label="Pick up day"
        type="date"
        value={PickUpDate}
        onChange={pickUpDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>

       
        {/* <ExistingRequest/>       */}
        <Button variant="contained" color="secondary" onClick={handleRequest}>
       Book appointment
      </Button>
      
      <div className={classes.title}>
       <Typography variant="h12"> Current Requests: </Typography>
       </div>

        <div className={classes.root}>
            <List component="nav" aria-label="list of classes">
            {
            reqquestList.map((reqquest, i) => {
              return (
                <ListItem button key={reqquest.id} onClick={(event) => handleListItemClick(event, reqquest.id)}>
                    <ListItemText primary={reqquest.comment} secondary={`Drop Off: ${reqquest.DropOff}, Pick Up:${reqquest.PickUp}`}  />
                    <Button variant="outlined" color="secondary">
       Cancel appointment
      </Button>
      <div>
      <Button variant="contained" color="primary">
       Pending
      </Button>
      </div>
      
                </ListItem>
              );
            })
          }
            </List>
        </div>
     </Container>
     {/* </Dialog> */}
     </div>

  );
}



export default SharpenRequest;