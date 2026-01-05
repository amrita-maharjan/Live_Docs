import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="Logo without name"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>

      {children}
    </div>
  );
};

export default Header;
