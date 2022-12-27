import '../styles/globals.css'
import { useState } from 'react'
import ModeContext from '../context/ModeContext'

function MyApp({ Component, pageProps }) {

  const [ darkMode , setDarkMode ] = useState(false)

  return ( 
    <ModeContext.Provider value={{darkMode , setDarkMode}}>
  <Component {...pageProps} />
  </ModeContext.Provider>
  )
}

export default MyApp
