import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { ChevronDown, FileText, GraduationCap, LayoutDashboardIcon, PenBox, StarsIcon } from 'lucide-react'
import ThemeToggle from './theme-toggle'
import { Button } from './ui/button'
import { checkUser } from '@/lib/checkUser'

const Header = async() => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/">
            <div className="w-[200px] h-[60px] relative logo-release logo-hue">
              <Image
                src="/logo.png"
                width={200}
                height={60}
                alt="SensAI"
                className="logo-default block dark:hidden filter invert object-contain"
              />

              <Image
                src="/logo.png"
                width={200}
                height={60}
                alt="SensAI"
                className="logo-default hidden dark:block object-contain"
              />

              <Image
                src="/logo.png"
                width={200}
                height={60}
                alt="SensAI color"
                className="logo-colored hidden object-contain"
              />
            </div>
          </Link>

          {/* Industry Insights */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50"
                aria-label="Industry insights"
              >
                <LayoutDashboardIcon className="h-4 w-4" />
                <span className='hidden md:block'>Industry Insights</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/insights/reports">Reports</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/insights/trends">Trends</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/insights/case-studies">Case Studies</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button> <StarsIcon/>
      <span className='hidden md:block'>  Growth Tools</span>
      <ChevronDown></ChevronDown>
    
      
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem>
        <Link href={"/resume"} className='flex items-center gap-2'>
        <FileText />
        <span>Build Resume</span>
        
        </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
        <Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
        <PenBox />
        <span>Cover Letter</span>
        </Link>
        </DropdownMenuItem>

          <DropdownMenuItem>
        <Link href={"/interview"} className='flex items-center gap-2'>
        <GraduationCap />
        <span>Interview Prep</span>
        </Link>
        </DropdownMenuItem>


      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuGroup>
      </DropdownMenuContent>
      </DropdownMenu>



















        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton />

            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  )
}

export default Header