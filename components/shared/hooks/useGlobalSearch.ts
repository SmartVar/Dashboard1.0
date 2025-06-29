// hooks/useGlobalSearch.ts
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"

export const useGlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("global");

  const searchContainerRef = useRef(null);
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !(searchContainerRef.current as Node).contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [pathname]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["global", "type"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, router, pathname, searchParams, query]);

  return { search, setSearch, isOpen, setIsOpen, searchContainerRef };
};
