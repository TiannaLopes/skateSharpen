import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { UserToken } from './Login';

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
    
export default function ClassList() {
    const classes = useStyles();
    const [classList, setClassList] = useState([]);
    let history = useHistory();

    const handleListItemClick = (event, classId) => {
        history.replace({ pathname: `/projects/${classId}` });
    };    

    useEffect(() => {
        console.log('calling fetch with token ' + UserToken);
        let fetchOptions = {
            method: 'GET', 
            headers: {'Authorization':'Bearer ' + UserToken}            
        }
        fetch('/v1/classes', fetchOptions).then(res => res.json()).then(response => {
          setClassList(response.data.classes);
          console.log('set class list');
        })
      }, []);
    
    console.log('rendering class list');
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography variant="h6" color="textPrimary">Classes</Typography>
                </Breadcrumbs>
            </div>
            <List component="nav" aria-label="list of classes">
            {
            classList.map((clazz, i) => {
              return (
                <ListItem button key={clazz.id} onClick={(event) => handleListItemClick(event, clazz.id)}>
                    <ListItemText primary={clazz.name} secondary="Spring '21"/>
                </ListItem>
              );
            })
          }
            </List>
        </div>
    );
}
