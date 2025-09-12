import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Github,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  HelpCircle,
  Menu,
  Home,
  PlayCircle,
  FileText,
  Lightbulb,
  Component,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Navbar({ className, ...props }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const MobileMenuItems = () => (
    <div className="flex flex-col space-y-3 pt-4">
      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => {
          navigate("/");
          setIsOpen(false);
        }}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Button>

      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => {
          navigate("/playground");
          setIsOpen(false);
        }}
      >
        <PlayCircle className="mr-2 h-4 w-4" />
        Playground
      </Button>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground px-3">
          Resources
        </p>
        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/getting-started");
            setIsOpen(false);
          }}
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          Getting Started
        </Button>

        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/tutorials");
            setIsOpen(false);
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          Tutorials
        </Button>

        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/roadmap");
            setIsOpen(false);
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          Roadmap
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground px-3">
          Components
        </p>
        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/components/input");
            setIsOpen(false);
          }}
        >
          <Component className="mr-2 h-4 w-4" />
          Input Fields
        </Button>

        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/components/select");
            setIsOpen(false);
          }}
        >
          <Component className="mr-2 h-4 w-4" />
          Select Boxes
        </Button>

        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/components/checkbox");
            setIsOpen(false);
          }}
        >
          <Component className="mr-2 h-4 w-4" />
          Checkboxes
        </Button>

        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            navigate("/components/button");
            setIsOpen(false);
          }}
        >
          <Component className="mr-2 h-4 w-4" />
          Buttons
        </Button>
      </div>

      <Button
        variant="ghost"
        className="justify-start"
        onClick={() => {
          navigate("/templates");
          setIsOpen(false);
        }}
      >
        <FileText className="mr-2 h-4 w-4" />
        Templates
      </Button>

      <div className="border-t pt-4 space-y-2">
        <Button
          variant="ghost"
          className="justify-start w-full"
          onClick={() => {
            window.open("https://github.com", "_blank");
          }}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        <Button variant="ghost" className="justify-start w-full">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help
        </Button>
      </div>
    </div>
  );

  return (
    <nav
      className={cn(
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50 top-0",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  FB
                </span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">
                Form Builder
              </span>
              <span className="font-semibold text-base sm:hidden">FB</span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  Hi 👋
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Welcome to Form Builder
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Create beautiful forms with drag and drop interface.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/getting-started"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Getting Started
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn how to use the form builder
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/tutorials"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Tutorials
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Step by step guides
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="/roadmap"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Roadmap →
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/components/input"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Input Fields
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Text, email, password inputs
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/components/select"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Select Boxes
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Dropdown and multi-select
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/components/checkbox"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Checkboxes
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Single and multiple choice
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="/components/button"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Buttons
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Submit and action buttons
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="/templates"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Templates
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Desktop Playground Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex text-xs px-3"
              onClick={() => navigate("/playground")}
            >
              <span className="mr-1">🎨</span>
              Playground
            </Button>

            {/* Medium Screen Playground Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex lg:hidden"
              onClick={() => navigate("/playground")}
            >
              🎨
            </Button>

            {/* GitHub Button - Hidden on small screens */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Github className="h-4 w-4" />
            </Button>

            {/* Help Button - Hidden on small screens */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <HelpCircle className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* User Avatar Dropdown - Hidden on small screens */}
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Muhammad Umair</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        umair@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">
                        FB
                      </span>
                    </div>
                    <span>Form Builder</span>
                  </SheetTitle>
                  <SheetDescription>
                    Navigate through the application
                  </SheetDescription>
                </SheetHeader>

                <MobileMenuItems />

                {/* Mobile User Section */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatars/01.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">Muhammad Umair</p>
                      <p className="text-xs text-muted-foreground">
                        umair@example.com
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
