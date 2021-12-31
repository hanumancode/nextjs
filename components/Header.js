import React from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from "next/link";

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "white",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: "2rem",
        cursor: "pointer",
    }
}))

const Header = () => {
    
    const classes = useStyles();

    return (
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography className={classes.title}>
                        
                        
                <Link href="/">
                    <a className="back-link" style={{color: "white"}}>
                       🌦🕵🏻‍♂️ Weather Inspector
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
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
