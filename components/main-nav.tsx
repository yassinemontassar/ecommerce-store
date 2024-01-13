"use client";

import Link from "next/link";
import { usePathname } from "next//navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface MainNavProps {
  data: Category[];
}

interface NavLinkProps {
  route: {
    href: string;
    label: string;
    active: boolean;
  };
}

const NavLink: React.FC<NavLinkProps> = ({ route }) => (
  <Link
    href={route.href}
    className={cn(
      "text-sm font-medium transition-colors hover:text-black",
      route.active ? "text-black" : "text-neutral-500"
    )}
    onClick={() => {
      // Close the dropdown menu when a link is clicked
      const dropdownMenu = document.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.classList.remove('show');
      }
    }}
  >
    {route.label}
  </Link>
);

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="dropdown-menu-trigger">
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-600 hover:to-gray-800 text-white font-bold py-2 px-4 rounded shadow focus:outline-none active:bg-gray-700">
          Boutique
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dropdown-menu">
        <DropdownMenuLabel>
          <div className="flex flex-col items-center space-y-2 lg:space-y-4 mx-6">
            Categories
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <nav className="flex flex-col items-start space-y-2 lg:space-y-4">
            {routes.map((route) => (
              <NavLink key={route.href} route={route} />
            ))}
          </nav>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainNav;