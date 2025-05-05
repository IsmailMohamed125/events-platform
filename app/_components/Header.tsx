import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className=" px-4 sm:px-8 py-4 sm:py-5" role="banner">
      <div className="flex flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
