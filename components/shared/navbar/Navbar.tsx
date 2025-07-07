import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Theme from './Theme'
import MobileNav from './MobileNav'
import GlobalSearch from '../search/GlobalSearch'
import GlobalSearchMobile from '../search/GlobalSerachMobile'

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 
    fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none 
    sm:px-12">
      { /* <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo1.svg"
          width={15}
          height={15}
          alt="PostalDashboard"
        /> */ }

        <p className="h2-bold font-spaceGrotesk text-dark-100
         dark:text-light-900 max-sm:hidden">Postal <span className="text-primary-500">
          Dashboard</span></p>
      </Link>
{/* Desktop/Tablet Global Search */}
      <div className="hidden md:block w-full max-w-xl">
        <GlobalSearch />
      </div>

      {/* Mobile Global Search */}
      <div className="block md:hidden w-full max-w-xs">
        <GlobalSearchMobile />
      </div>
      

      <div className="flex-between gap-5">
        <Theme />

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#ff7000'
              }
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
