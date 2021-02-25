import { navigate } from '@reach/router';
import React, {useEffect, useState} from 'react'
import { IUser} from '../../interfaces/user';
import { Container, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function Home() {

    const classes = useStyles();
    const [userData, setUserData] = useState<IUser>()

    function getUserData(): IUser {
        var userData = localStorage.getItem('userData') || '{}'
        return JSON.parse(userData)
    }

    useEffect(() => {
    if (localStorage.getItem('loggedIn') !== 'true') {
        navigate('/');
    } else {
        setUserData(getUserData())
    }
    }, []);

    function logout() {
        localStorage.setItem('loggedIn', 'false')
        localStorage.setItem('userData', '{}')
        navigate('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                {userData?.firstName} {userData?.lastName}
                <br/>
                {userData?.email}
                <br/>
                {userData?.createdAt}
                <br/>
                {userData?.language}
                <br/>
                {userData?.country}
                <br/>
                <Button fullWidth variant="outlined" color="primary" className={classes.submit} onClick={logout}>
                    Logout
                </Button>
            </div>
        </Container>
    )
}
