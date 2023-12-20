import Image from "next/image";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/narvbar-actions";
import SearchBar from "@/components/search"
import HamburgerMenu from "./HamburgerMenu";
import ScrollToTopButton from "./ScrollToTopButton";
const Navbar = async () => {
  const categories = await getCategories(); 
 

  return ( 
    <div className="border-b">
      <ScrollToTopButton />
      <Container>
      <header className="bg-white">
  <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <a className="block text-teal-600" href="/">
      <span className="sr-only">Home</span>
      <Image
        priority={true}
        src="/logo.jpg"  // Path to your logo in the "public" directory
        alt="Logo Alt Text"
        width={50}       // Set the width of your logo
        height={50}       // Set the height of your logo
      />
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <MainNav data={categories} />
        </ul>
      </nav>
      <div> 
          <SearchBar />
        </div>
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
        <NavbarActions />
        </div>
        
        <HamburgerMenu data={categories} />
      </div>
    </div>
  </div>
</header>
      </Container>
    </div> 
  );
}; 
 
export default Navbar;