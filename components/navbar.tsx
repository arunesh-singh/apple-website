import Image from "next/image";

import { appleImg, bagImg, searchImg } from "@/lib/utils";
import { navLists } from "@/constants";

export const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width justify-between">
        <Image src={appleImg} alt="Apple" width={18} height={18} className="w-auto"  />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <div
              key={item}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image src={searchImg} alt="Search" width={18} height={18} />
          <Image src={bagImg} alt="Bag" width={18}  />
        </div>
      </nav>
    </header>
  );
};
