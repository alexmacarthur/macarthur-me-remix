import Logo from "./Logo";
import { useEffect, useState } from "react";
import MenuToggle from "./MenuToggle";
import { Link, useLocation } from "@remix-run/react";
import { useRequestPath } from "~/utils";

const navItems = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Posts",
    link: "/posts",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Nav = ({ isAbsolute = false }) => {
  const requestPath = useRequestPath();
  const location = useLocation();

  const [shouldHideLogo, setShouldHideLogo] = useState(() => {
    return location.pathname === "/";
  });

  useEffect(() => {
    setShouldHideLogo(location.pathname === "/");
  }, [requestPath]);

  const positionClass = isAbsolute ? "absolute" : "relative";

  return (
    <nav
      className={`nav z-10 flex w-full items-center justify-between py-10 px-4 font-bold md:px-8 ${positionClass}`}
    >
      <input
        type="checkbox"
        id="menuToggle"
        className="absolute -z-10 opacity-0 lg:hidden"
        aria-labelledby="menuToggleLabel"
      />

      <span
        className={`flex-none text-2xl font-bold lg:text-3xl ${
          shouldHideLogo ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <Logo asLink={true} short={true} />
      </span>

      <div className="nav-menu-wrapper lg:l-0 left-0 top-0 h-0 w-full lg:relative lg:h-auto">
        <label
          className="nav-menu-label absolute right-3 z-20 cursor-pointer lg:hidden"
          htmlFor="menuToggle"
          style={{
            top: "2.25rem",
          }}
          id="menuToggleLabel"
        >
          <MenuToggle />
        </label>

        <div
          className="
          nav-menu-items
          invisible
          absolute
          top-0
          left-0
          flex
          h-screen
          flex-col
          justify-center
          bg-gray-700
          p-6
          opacity-0
          transition-all
          lg:visible
          lg:relative
          lg:top-auto
          lg:block
          lg:h-auto
          lg:w-auto
          lg:bg-transparent
          lg:p-0
          lg:opacity-100
        "
        >
          <ul
            className="
            flex
            -translate-x-full
            transform
            flex-col
            justify-end
            space-y-4
            transition-all
            lg:translate-x-0
            lg:flex-row lg:space-x-6
            lg:space-y-0
            "
          >
            {navItems.map((item) => {
              return (
                <li
                  className="lg:font-200 text-6xl font-bold text-white hover:text-white lg:text-xl lg:font-light lg:text-gray-500 lg:hover:text-gray-900"
                  key={item.link}
                >
                  <Link
                    to={item.link}
                    className="border-b-4 border-transparent py-2 hover:border-gray-200"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
