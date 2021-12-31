import React from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from "next/link";
import UserSidebar from './UserSidebar';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        // margin: "margin: 0 auto",
        color: "white",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }
}))

const Header = () => {
    
    const classes = useStyles();

    return (
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/">
                            <a className="back-link" style={{color: "white"}}>
                            Weather Inspector 🌦🕵🏻‍♂️
                            </a>
                        </Link>
                    </Typography>
                    <Select
                        variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                        }}
                    >
                        <MenuItem value="metric">Metric</MenuItem>
                        <MenuItem value="imperial">Imperial</MenuItem>
                    </Select>
                    <UserSidebar />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
