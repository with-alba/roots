import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui";
import { BrandButton } from "../brand-button";
import { QuerySearch } from "./navbar-query-search";
import { NavbarMobileMenu } from "./navbar-mobile-menu";

export function Navbar() {
  return (
    <nav className="relative flex h-[62px] w-full items-center justify-between px-2">
      <div className="flex items-center gap-5">
        <Link
          className="relative isolate cursor-pointer before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:size-9 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:transition-colors hover:before:bg-zinc-200"
          href="/"
        >
          <svg
            fill="none"
            height="22"
            viewBox="0 0 25 22"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_71_5949)">
              <mask
                height="22"
                id="mask0_71_5949"
                maskUnits="userSpaceOnUse"
                width="25"
                x="0"
                y="0"
              >
                <path d="M25 0H0V22H25V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_71_5949)">
                <path
                  d="M12.5 14.4571L4.11585 22L0 15.2429L7.31707 12.4143L0 9.9L4.11585 2.82857L9.7561 7.38571L8.53659 0H16.4634L15.2439 7.38571L20.8841 2.82857L24.8476 9.9L17.5305 12.4143L24.6951 15.4L20.7317 22L12.5 14.4571Z"
                  fill="#27272A"
                />
                <path
                  d="M12.6108 17.3684L6.81812 22.7113H18.4035L12.6108 17.3684Z"
                  fill="#27272A"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_71_5949">
                <rect fill="white" height="22" width="25" />
              </clipPath>
            </defs>
          </svg>
        </Link>
        <QuerySearch />
      </div>
      <div className="flex items-center gap-4 max-[960px]:hidden">
        <BrandButton />
        <hr className="h-5 w-px bg-zinc-200" />
        <div className="flex items-center gap-2">
          <a
            className={buttonVariants().base({
              variant: "secondary",
            })}
            href="https://github.com/with-alba/roots"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="px-1">Ver código</span>
          </a>
          <Button disabled>Contribuir</Button>
        </div>
      </div>
      <NavbarMobileMenu />
    </nav>
  );
}
