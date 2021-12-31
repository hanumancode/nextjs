import React from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";

export default function CitySearchBox({ placeholder }) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const clearQuery = () => setQuery("");
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
          continue;
        }
      }
    }

    return setResults(matchingCities);
  };

  return (
    
    <div>  
          <input
              style={{
                  fontSize: "1rem",
                  color: "#242424",
                  border: "2px solid #4361ee",
                  borderRadius: "10px", 
                  padding: "15px 15px", 
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: "100%", 
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", 
                  transition: "all 0.3s ease", 
              }}
              type="text"
              value={query}
              onChange={onChange}
              placeholder={placeholder ? placeholder : "Search for a location"}
          />

          {query.length > 3 && (
              <ul style={{
                  top: "calc(100% + 10px)",
                  width: "100%",
                  padding: "5px 15px",
                  marginTop: "10px",
                  listStyle: "none",
                  border: "2px solid #4361ee",
                  borderRadius: "10px",
                  zIndex: "100",
                  backgroundColor: "#fff"
              }}>

              {results.length > 0 ? (
                  results.map((city) => {
                  return (
                      <li key={city.slug}>
                      <Link href={`/location/${city.slug}`}>
                          <a style={{
                              display: "block",
                              textDecoration: "none", 
                              color: "#242424", 
                              padding: "10px 0"
                              }}>
                          {city.name}
                          {city.state ? `, ${city.state}` : ""}{" "}
                          <span>({city.country})</span>
                          </a>
                      </Link>
                      </li>
                  );
                  })
              ) : (
                  <li className="search__no-results">No results found</li>
              )}
              </ul>
          )}
      </div>
    
  );
}