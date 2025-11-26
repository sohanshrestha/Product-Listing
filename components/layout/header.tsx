import { ModeToggle } from "../ui/ModeToggle";

export const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto flex flex-wrap sm:flex-row items-center justify-between gap-4 p-4 sm:px-6 lg:px-16">
        <div className="text-xl font-bold pl-4 sm:pl-0">Product Shop</div>
        <div className="pl-4 sm:pl-0">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
