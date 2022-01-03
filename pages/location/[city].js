import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import cities from '../../lib/city.list.json';
import moment from "moment-timezone";
import Head from "next/head";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SearchBox from '../../components/SearchBox';
import Header from "../../components/Header"

export async function getServerSideProps(context) {
    
    const city = getCity(context.params.city);

    if (!city) {
        return {
            notFound: true,
        };
    }
    
    const unitValue = "imperial";

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=ac683ae71d7181afc01abb7dd1e0b931&exclude=minutely&units=${unitValue}`
    );

    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }
        
    return {
        props: {
            data: data,
            city: city,
        }
    }
}

const getCity = param => {
    const cityParam = param.trim();
    // get city id
    const spiltCity = cityParam.split("-");
    const id = spiltCity[spiltCity.length - 1];
    
    if(!id) {
        return null;
    }
    
    const city = cities.find(city => city.id.toString() == id);

    if(city) {
        return city;
    } else {
        return null;
    }

}

export default function City({ data, city }) {
    // console.log(data);

    const useStyles = makeStyles(() => ({
        title: {
            flex: 1,
            // margin: "margin: 10px, 10px, 0, 10px",
            color: "white",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer",
        }
    }))

    const classes = useStyles();
    
    const [unit, setUnit] = useState('imperial');
    const [symbol, setSymbol] = useState('F');

    useEffect(() => {
        if (unit === "imperial") setSymbol("F");
        else if (unit === "metric") setSymbol("C");
    }, [unit]);

    console.log(unit);

    return (

        <main className='main-container'>
            <Head>
            <title>{city.name} - Weather Inspector</title>
            </Head>

             <Header title="Weather Inspector 🌦🕵🏻‍♂️"
                unit = {unit}
                setUnit = {setUnit}
                symbol = {symbol}
                setSymbol = {setSymbol}
            />
            <div className="container" style={{marginTop: 20}}>
                <SearchBox />
            </div>

{/* Rendered Weather Data */}

            <div className="location-and-date" style={{marginBottom: "10px"}}>
                <h1 className="location-and-date__location">{city.name}</h1>
                <div>{moment.unix(data.current.dt).tz(data.timezone).format("LT")}</div>
            </div>
            <div className={(typeof data?.current != "undefined") 
            
            ? ((data.current.temp > 80)
            
            ? "current-temperature current-temperature-hot" : 'current-temperature')
            : 'current-temperature'}
            >

                <div className="current-temperature__icon-container">  
                    <img
                        src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`}
                        alt="Weather icon"
                        
                    />
                </div>  
            <div className="current-temperature__content-container">  
                <div className="current-temperature__value">{(data.current.temp).toFixed(0)}&deg;{symbol}</div>  
                <div className="current-stats__value" style={{marginBottom:"20px"}}>
                    Feels like: {(data.current.feels_like).toFixed(0)}&deg;{symbol}
                </div>  
                <div className="current-temperature__summary">
                    {data.current.weather[0].description.charAt(0).toUpperCase()+data.current.weather[0].description.slice(1)}
                </div>  
            </div>  
            </div>        

            <div className="current-stats">
                <div>
                <div className="current-stats__value">{(data.daily[0].temp.max).toFixed(0)}/{(data.daily[0].temp.min).toFixed(0)}&deg;{symbol}</div>
                <div className="current-stats__label">High/Low</div>
                <div className="current-stats__value">{(data.current.pressure)}hPa</div>
                <div className="current-stats__label">Pressure</div>
                <div className="current-stats__value">{(data.current.dew_point)}&deg;C</div>
                <div className="current-stats__label">Dew Point</div>
                </div>
                <div>
                <div className="current-stats__value">
                     <ArrowRightAltIcon style={{ transform: `rotateZ(${data.current.wind ? data.current.wind.deg + 90 : null}deg)` }} />                    
                    {(data.current.wind_speed).toFixed(0)}m/s
                </div>
                <div className="current-stats__label">Wind</div>
                <div className="current-stats__value">{data.current.humidity}%</div>
                <div className="current-stats__label">Humidity</div>
                <div className="current-stats__value">{((data.current.visibility)/1000).toFixed(2)}km</div>
                <div className="current-stats__label">Visibility</div>                
                </div>
                <div>
                <div className="current-stats__value" style={{color:"yellow", fontWeight: "bold"}}>{moment.unix(data.current.sunrise).tz(data.timezone).format("LT")}</div>
                <div className="current-stats__label">Sunrise</div>
                <div className="current-stats__value" style={{color: "black", fontWeight: "bold"}}>{moment.unix(data.current.sunset).tz(data.timezone).format("LT")}</div>
                <div className="current-stats__label">Sunset</div>
                {/* <div className="current-stats__value">{(data.current.uvi)}</div>
                <div className="current-stats__label">UV</div>                 */}
                </div>
            </div>


            <div className="weather-by-hour">
                <h2 className="weather-by-hour__heading">Today&apos;s weather</h2>
                <div className="weather-by-hour__container">
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">       
                        {moment.unix(data.hourly[1].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[1].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    />        
                    <div>{(data.hourly[1].temp).toFixed(0)}&deg;{symbol}</div>
                </div>
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">
                        {moment.unix(data.hourly[2].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[2].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    />                     
                    <div>{(data.hourly[2].temp).toFixed(0)}&deg;{symbol}    </div>
                </div>
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">                        
                    {moment.unix(data.hourly[3].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[3].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    /> 
                    <div>{(data.hourly[3].temp).toFixed(0)}&deg;{symbol}</div>
                </div>
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">                        
                    {moment.unix(data.hourly[4].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[4].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    /> 
                    <div>{(data.hourly[4].temp).toFixed(0)}&deg;{symbol}</div>
                </div>
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">
                        {moment.unix(data.hourly[5].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[5].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    /> 
                    <div>{(data.hourly[5].temp).toFixed(0)}&deg;{symbol}</div>
                </div>
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">
                        {moment.unix(data.hourly[6].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[6].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    />                     
                    <div>{(data.hourly[6].temp).toFixed(0)}&deg;{symbol}</div>
                </div>
                <div className="weather-by-hour__item">
                    <div className="weather-by-hour__hour">
                        {moment.unix(data.hourly[7].dt).format("LT")}
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${data.hourly[7].weather[0].icon}@2x.png`}
                        alt="Weather icon"
                        
                    /> 
                    <div>{(data.hourly[7].temp).toFixed(0)}&deg;{symbol}</div>
                </div>
                </div>
            </div>
            
  <div className="next-5-days">
    <h2 className="next-5-days__heading">Next 5 days</h2>
    <div className="next-5-days__container">

      <div className="next-5-days__row">
{/* 1 */}
        <div className="next-5-days__date"> 
          <div className="next-5-days__label">
              {moment.unix(data.daily[1].dt).format("dddd")}
          </div>
        </div>

        <div className="next-5-days__low">
          {(data.daily[1].temp.max).toFixed(0)}/{(data.daily[1].temp.min).toFixed(0)}&deg;{symbol}
        </div>

        <div className="next-5-days__icon">
            <img
                src={`https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`}
                alt="Weather icon"
                
            />          
        </div>

        <div className="next-5-days__rain">
          {(data.daily[1].humidity)}%
          <div className="next-5-days__label">Humidity</div>
        </div>

        <div className="next-5-days__wind">
            <ArrowRightAltIcon style={{ transform: `rotateZ(${data.daily[1].wind_deg ? data.daily[1].wind_deg + 90 : null}deg)` }} />                 
          {data.daily[1].wind_speed.toFixed(1)}mph
          <div className="next-5-days__label">Wind</div>
        </div>

      </div>

      <div className="next-5-days__row">
{/* 2 */}
        <div className="next-5-days__date">
          <div className="next-5-days__label">
              {moment.unix(data.daily[2].dt).format("dddd")}
          </div>
        </div>

        <div className="next-5-days__low">
          {(data.daily[2].temp.max).toFixed(0)}/{(data.daily[2].temp.min).toFixed(0)}&deg;{symbol}
        </div>

        <div className="next-5-days__icon">
            <img
                src={`https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`}
                alt="Weather icon"
                
            />          
        </div>

        <div className="next-5-days__rain">
          {(data.daily[2].humidity)}%          
          <div className="next-5-days__label">Humidity</div>
        </div>

        <div className="next-5-days__wind">
            <ArrowRightAltIcon style={{ transform: `rotateZ(${data.daily[2].wind_deg ? data.daily[2].wind_deg + 90 : null}deg)` }} />              
          {data.daily[2].wind_speed.toFixed(1)}mph
          <div className="next-5-days__label">Wind</div>
        </div>

      </div>

      <div className="next-5-days__row">
{/* 3 */}
        <div className="next-5-days__date">
          <div className="next-5-days__label">
              {moment.unix(data.daily[3].dt).format("dddd")}
          </div>
        </div>

        <div className="next-5-days__low">
          {(data.daily[3].temp.max).toFixed(0)}/{(data.daily[3].temp.min).toFixed(0)}&deg;{symbol}
        </div>

        <div className="next-5-days__icon">
            <img
                src={`https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`}
                alt="Weather icon"
                
            />          
        </div>

        <div className="next-5-days__rain">
          {(data.daily[3].humidity)}%          
          <div className="next-5-days__label">Humidity</div>
        </div>

        <div className="next-5-days__wind">
            <ArrowRightAltIcon style={{ transform: `rotateZ(${data.daily[3].wind_deg ? data.daily[3].wind_deg + 90 : null}deg)` }} />              
          {data.daily[3].wind_speed.toFixed(1)}mph
          <div className="next-5-days__label">Wind</div>
        </div>

      </div>

      <div className="next-5-days__row">
{/* 4 */}
        <div className="next-5-days__date">
          <div className="next-5-days__label">
              {moment.unix(data.daily[4].dt).format("dddd")}
          </div>
        </div>

        <div className="next-5-days__low">
          {(data.daily[4].temp.max).toFixed(0)}/{(data.daily[4].temp.min).toFixed(0)}&deg;{symbol}
        </div>

        <div className="next-5-days__icon">
            <img
                src={`https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`}
                alt="Weather icon"
            />  
        </div>

        <div className="next-5-days__rain">
          2%
          <div className="next-5-days__label">Humidity</div>
        </div>

        <div className="next-5-days__wind">
            <ArrowRightAltIcon style={{ transform: `rotateZ(${data.daily[4].wind_deg ? data.daily[4].wind_deg + 90 : null}deg)` }} />              
          {data.daily[4].wind_speed.toFixed(1)}mph
          <div className="next-5-days__label">Wind</div>
        </div>

      </div>
      
      <div className="next-5-days__row">
{/* 5 */}
        <div className="next-5-days__date">
          <div className="next-5-days__label">
              {moment.unix(data.daily[5].dt).format("dddd")}
          </div>
        </div>

        <div className="next-5-days__low">
          {(data.daily[5].temp.max).toFixed(0)}/{(data.daily[5].temp.min).toFixed(0)}&deg;{symbol}
        </div>

        <div className="next-5-days__icon">
            <img
                src={`https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`}
                alt="Weather icon"
            />  
        </div>

        <div className="next-5-days__rain">
          0%
          <div className="next-5-days__label">Humidity</div>
        </div>

        <div className="next-5-days__wind">
            <ArrowRightAltIcon style={{ transform: `rotateZ(${data.daily[5].wind_deg ? data.daily[5].wind_deg + 90 : null}deg)` }} />              
          {data.daily[5].wind_speed.toFixed(1)}mph
          <div className="next-5-days__label">Wind</div>
        </div>

      </div>

    </div>
  </div>

</main>
    )
}
