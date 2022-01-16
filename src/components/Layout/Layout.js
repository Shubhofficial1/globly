import { Brightness6Rounded } from '@material-ui/icons'
import Head from 'next/head'
import Link from 'next/link'
import styles from './Layout.module.css'
import { useState, useEffect } from 'react'

const Layout = ({ children, title = 'World Ranking' }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme')
    )
    setTheme(localStorage.getItem('theme'))
  }, [])

  const saveTheme = (theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  const switchTheme = () => {
    if (theme === 'light') {
      saveTheme('dark')
    } else {
      saveTheme('light')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta
          name='globly'
          content='Globly can help us analyze difference countries based on certain parameters'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <Link href='/'>
          <h1>Globly </h1>
        </Link>
        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <Brightness6Rounded />
        </button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Developed with ❤ By Shubham Kumar
      </footer>
    </div>
  )
}

export default Layout
