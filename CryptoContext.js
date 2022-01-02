import React, { useState, useEffect, useContext, createContext } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [unit, setUnit] = useState('imperial');
    const [symbol, setSymbol] = useState('F');

    useEffect(() => {
        if (unit === "imperial") setSymbol("F");
        else if (unit === "metric") setSymbol("C");
    }, [unit]);

    return (
        <Crypto.Provider value={{unit,symbol, setUnit}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}
