import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Welcome from '@/components/Welcome'
import WhyExists from '@/components/WhyExists'
import Services from '@/components/Services'
import Companies from '@/components/Companies'
import WhatYouGet from '@/components/WhatYouGet'
import WhoItsFor from '@/components/WhoItsFor'
import FAQ from '@/components/FAQ'
import WaitlistForm from '@/components/WaitlistForm'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Head>
        <title>Growth Authority - The Private Membership for CMOs and Marketing Leaders</title>
        <meta name="description" content="The private membership for CMOs and leaders who drive growth. Get weekly insights, proven toolkits, exclusive access, and everything designed to save you time and hit your KPIs." />
        <meta name="keywords" content="CMO, marketing leaders, growth marketing, AI marketing, performance marketing, revenue engine, marketing community, executive membership" />
        <meta name="author" content="Growth Authority" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growthauthority.com/" />
        <meta property="og:title" content="Growth Authority - The Private Membership for CMOs and Marketing Leaders" />
        <meta property="og:description" content="The private membership for CMOs and leaders who drive growth. Get weekly insights, proven toolkits, exclusive access, and everything designed to save you time and hit your KPIs." />
        <meta property="og:image" content="https://growthauthority.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://growthauthority.com/" />
        <meta property="twitter:title" content="Growth Authority - The Private Membership for CMOs and Marketing Leaders" />
        <meta property="twitter:description" content="The private membership for CMOs and leaders who drive growth. Get weekly insights, proven toolkits, exclusive access, and everything designed to save you time and hit your KPIs." />
        <meta property="twitter:image" content="https://growthauthority.com/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://growthauthority.com/" />
        
        {/* Favicon - Modern Minimal Setup */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Growth Authority",
              description: "The private membership for CMOs and marketing leaders who drive growth",
              url: "https://growthauthority.com",
              logo: "https://growthauthority.com/logo.png",
              sameAs: [
                "https://linkedin.com/company/growth-authority",
                "https://twitter.com/growthauthority"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English"
              }
            })
          }}
        />
      </Head>

      <Header />
      
      <main>
        <Hero />
        <Stats />
        <Welcome />
        <WhyExists />
        <Services />
        <Companies />
        <WhatYouGet />
        <WhoItsFor />
        <FAQ />
        <WaitlistForm />
      </main>
      
      <Footer />
    </>
  )
} 