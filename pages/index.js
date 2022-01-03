import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBox from '../components/SearchBox'

export default function Home() {

  const d = new Date().getFullYear();

  return (
    <div className={styles.container} >
      <Head>
        <title>Weather Inspector</title>
        <meta name="description" content="Weather Inspector" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{fontSize: "7rem"}}>🌦🕵🏻‍♂️</div>
        <h1 className={styles.title}>
          Weather Inspector
        </h1>

        <div className="container">
          <SearchBox />
        </div>

      </main>
    </div>
  )
}
