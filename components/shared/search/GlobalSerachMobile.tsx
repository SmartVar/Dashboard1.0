// components/shared/search/GlobalSearchMobile.tsx
"use client"

import React from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import GlobalResultMobile from "./GlobalResultMobile"
import { useGlobalSearch } from "@/components/shared/hooks/useGlobalSearch"

const GlobalSearchMobile = () => {
  const { search, setSearch, isOpen, setIsOpen, searchContainerRef } = useGlobalSearch();

  return (
    <div ref={searchContainerRef} className="relative w-full mt-6 px-2">
      <div className="background-light800_darkgradient relative flex min-h-[48px] items-center gap-2 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          onFocus={() => setIsOpen(true)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
          />
      </div>
      {isOpen && <GlobalResultMobile showOnlyResults />}
    </div>
  )
}

export default GlobalSearchMobile
