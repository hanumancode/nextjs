import "../styles/main.scss"
// import Header from "../components/Header"
import CryptoContext from "../CryptoContext"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CryptoContext>
          {/* <Header /> */}
          <Component {...pageProps} />
      </CryptoContext>
    </>
  )
}

export default MyApp
