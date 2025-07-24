import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Analytics or other global side effects can go here
    console.log('Growth Authority website loaded successfully!')
  }, [])

  return <Component {...pageProps} />
} 