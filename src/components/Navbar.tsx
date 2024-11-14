// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { LogOut } from "lucide-react";
//  import { auth } from "@/auth";
// import { handleSignOut } from "@/actions/authAction";
// import ThemeMode from "./ThemeMode";

// export default async function Navbar() {
//   const session = await auth();

//   //   console.log("this is session", session);

//   return (
//     <nav className="flex items-center h-20 justify-between p-4 bg-background text-primary-background shadow-md  shadow-border">
//       <Link href="/" className="text-xl font-bold">
//         My App
//       </Link>

//       <div className="flex items-center space-x-4 ">
//         <div className=" flex items-center justify-center gap-x-10">
//           {session?.user ? (
//             <>
//               <span className="mr-2">
//                 Welcome, {session.user.name?.toUpperCase()}
//               </span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Avatar className="cursor-pointer">
//                     {/* <AvatarImage
//                       src={`https://avatars.dicebear.com/v2/${session.user.name}.svg?options[size]=32`}
//                     /> */}
//                     <AvatarFallback>
//                       {session.user.name?.slice(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   {/* {session.isAdmin && (
//                     <DropdownMenuItem>
//                       <Settings className="mr-2 h-4 w-4" />
//                       <span>Admin Settings</span>
//                     </DropdownMenuItem>
//                   )} */}
//                   <DropdownMenuItem asChild>
//                     <form action={handleSignOut}>
//                       <Button variant={"destructive"}>
//                         <LogOut className="mr-2 h-4 w-4" />
//                         <span>Log out</span>
//                       </Button>
//                     </form>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </>
//           ) : (
//             <Button>
//               <Link href={"/sign-in"}>Log in</Link>
//             </Button>
//           )}

//           <ThemeMode />
//         </div>
//       </div>
//     </nav>
//   );
// }
