import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState('')
  const filteredCountries = countries.filter((country) => {
    return (
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
    )
  })

  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} Countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder='Filter by Name,Region or SubRegion'
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all')
  const countries = await res.json()
  return {
    props: {
      countries,
    },
  }
}
