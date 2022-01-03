import "../styles/main.scss"
import React, {useState} from 'react';
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {

  const [unit, setUnit] = useState('imperial');
  const [symbol, setSymbol] = useState('F');

  return (
    <>
          <Component {...pageProps} 
          unit = {unit}
          setUnit = {setUnit}
          symbol = {symbol}
          setSymbol = {setSymbol}
          />
          <Footer />
    </>
  )
}

export default MyApp
