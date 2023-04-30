import Image from "next/image";
import { 
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  Bars4Icon,
  PlusCircleIcon,
  GlobeAltIcon,
  UserGroupIcon,
  HeartIcon } from "@heroicons/react/24/outline"

  import{ HomeIcon } from "@heroicons/react/24/solid"

export default function Header() {
  return (
    <div className="shadow-sm bg-white border-b z-50 sticky top-0">

      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">

        {/*ig logo*/}
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer" >
          <Image src="https://links.papareact.com/ocw" layout="fill" alt="" objectFit="contain" />
        </div>
          <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image src="https://links.papareact.com/jjm" layout="fill" alt="" objectFit="contain" />
          </div>

        {/*search bar*/}
        <div className="max-w-xs">
        <div className="relative mt-1 p-3 rounded-md">
        <div className="absolute inset-y-0 pl-3 flex items-center  pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500"/>
        </div>
        
            <input className="bg-gray-50 block w-full pl-10 sm:text-sm
            border-gray-300 focus:ring-black focus:border-black rounded-md" 
            type={"text"} placeholder="search"/>
        </div>
        </div>
        
       
       

        {/*right*/}
        <div className=" flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn"/>
          <Bars4Icon className="h-6 w-6 md:hidden cursor-pointer"/>
          <div className="relative navBtn">

              <PaperAirplaneIcon className="navBtn -rotate-45"/>
              <div className="absolute -top-1 -right-1 text-xs w-4 bg-red-600 rounded-full text-white 
              flex items-center justify-center
              ">3</div>
          </div>
          
          <GlobeAltIcon className="navBtn"/>
          <PlusCircleIcon className="navBtn"/>
          <HeartIcon className="navBtn"/>
            
          <img src="https://images.unsplash.com/photo-1507081323647-4d250478b919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fG1hbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="profile pic" 
          className="h-10  w-10 rounded-full hover:cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
