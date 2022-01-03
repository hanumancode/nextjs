import React, {useState, useEffect} from 'react';
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import Link from "next/link";
import UserSidebar from './UserSidebar';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "#4169e1",
        fontFamily: "Montserrat",
        fontWeight: 700,
        cursor: "pointer",
    }
}));

const Header = ({title, unit, setUnit, symbol, setSymbol}) => {
    
    const classes = useStyles();
    
    console.log(unit);

    return (
        <ThemeProvider>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography 
                            onClick ={() => history.push("/")} 
                            className={classes.title}
                            variant='h3'
                        >
                            WI 🌦🕵🏻‍♂️
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{
                                width: 70,
                                height: 40,
                                marginLeft: 15,
                            }}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <MenuItem value="imperial">&deg;F</MenuItem>
                            <MenuItem value="metric">&deg;C</MenuItem>
                        </Select>
                        <UserSidebar />
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>                    
    )
}

export default Header
