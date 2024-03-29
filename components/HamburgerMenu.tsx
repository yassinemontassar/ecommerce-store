
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Category } from "@/types";
import { cn } from "@/lib/utils";
import {SearchIcon } from "lucide-react";
interface MainNavProps {
  data: Category[];
}

const HamburgerMenu: React.FC<MainNavProps> = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        performSearch();
      };
    
      const performSearch = () => {
    
          const encodedQuery = encodeURIComponent(searchQuery);
          router.push(`/products?name=${encodedQuery}`);
          setSearchQuery('');
      };

      

  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <div className="block rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 z-[100] md:hidden">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
          <span  className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:animate-spin "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fixed right-0 mt-4 w-9/12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none h-screen">
          <p className="flex flex-col items-center text-xl text-zinc-800 bg-slate-200">Catégories:</p>
            <div className="flex flex-col items-center px-1 py-1 ">
              {routes.map((route) => (
                <Menu.Item key={route.href} as={Fragment}>
                    {({ close }) => (
                    <div className="border-b w-full text-center">
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={(e) => {
                          
                          close()
                        }}
                        className={cn(
                          "text-lg font-semibold transition-colors hover:text-black",
                          route.active ? "text-black animate-pulse " : "text-neutral-500 "
                        )}
                      >
                        {route.label}
                      </Link>
                    </div>
                    )}
                </Menu.Item>
              ))}
            </div>  
            <p className="flex flex-col items-center text-xl text-zinc-800 bg-slate-200 -mt-2">Recherche</p>
            <div className="flex flex-col items-start px-2 py-4">
                <div className="flex  items-center">
                <input 
                  type="text"
                  placeholder=""
                  value={searchQuery}
                  onChange={handleInputChange}
                className=" border border-gray-300 px-1 py-1 w-fit  rounded-full focus:outline-none focus:ring focus:border-blue-300 "
                />
                <div className="px-4">
                 <SearchIcon
                      onClick={handleSearchClick}
                      size={33}
                      
                 />
                 </div>
            </div>  
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default HamburgerMenu;
