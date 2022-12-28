import '../styles/globals.css'
import { useState } from 'react'
import ModeContext from '../context/ModeContext'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps : { session , ...pageProps } }) {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
      <ModeContext.Provider value={{ darkMode, setDarkMode }}>
        <Component {...pageProps} />
      </ModeContext.Provider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
