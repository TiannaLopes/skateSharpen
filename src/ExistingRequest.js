
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { UserToken } from './Login';
import Link from '@material-ui/core/Link';


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    header: {
        paddingTop: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '8px',
        backgroundColor: theme.palette.grey[300],
    }
}));

function loadReqquest(reqquestId) {
    console.log(`load set reqquest  ${reqquestId}`);
}
    
export default function ExistingRequest() {
    const classes = useStyles();
    const [reqquestList, setReqquestList] = useState([]);
    //const [classBreadcrumbName, setClassBreadcrumbName] = useState('');
    let history = useHistory();
    let { classId } = useParams();

    const handleListItemClick = (event, reqquestId) => {
        console.log(`load tasks for project ${reqquestId}`);
    };

    const handleClassesClick = () => {
        history.replace('/classes');
    }

    useEffect(() => {
        console.log('calling fetch with token ' + UserToken);
        fetch('/reqquest').then(res => res.json()).then(response => {
          console.log('got data');
          console.log(response);
          setReqquestList(response.data.reqquest);
          //setClassBreadcrumbName(response.data.className);
        })
      }, []);
            
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="list of classes">
            {
            reqquestList.map((reqquest, i) => {
              return (
                <ListItem button key={reqquest.id} onClick={(event) => handleListItemClick(event, reqquest.id)}>
                    <ListItemText primary={reqquest.name} />
                </ListItem>
              );
            })
          }
            </List>
        </div>
    );
}
