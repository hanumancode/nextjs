import React from 'react'
import styles from '../styles/Home.module.css'

const Footer = () => {

    const d = new Date().getFullYear();
    
    return (
        <footer className={styles.footer}>
            <span className={styles.logo}>
                Weather Inspector &copy; {d}
            </span>
        </footer>

    )
}

export default Footer
