'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { useRouter } from "next/navigation";

export function UserDropdown() {

  const router = useRouter();
  
  const handleSignOut = async()=>{
    router.push("/signOut");
  }

  const user = {name:"Ben Tennyson"  , email :'saviour@gmail.com'}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-centergap-3 text-gray-4 hover:yelloe-500" >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZUqWXB1qGHcyOnuEyZ0LGhq59aZwM54-wuw&s" />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator/>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuLabel>Billing</DropdownMenuLabel>
        <DropdownMenuLabel>Team</DropdownMenuLabel>
        <DropdownMenuLabel>Subscription</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
