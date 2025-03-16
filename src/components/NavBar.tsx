"use client";
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link
            className={`navbar__link relative ${activeLink === "home" ? "active" : ""}`}
            href="/"
            onClick={() => handleLinkClick("home")}
          >
            HOME
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "category" ? "active" : ""}`}
            href="/category"
            onClick={() => handleLinkClick("category")}
          >
            CATEGORIES
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "mens" ? "active" : ""}`}
            href="#"
            onClick={() => handleLinkClick("mens")}
          >
            MEN&apos;S
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "womens" ? "active" : ""}`}
            href="#"
            onClick={() => handleLinkClick("womens")}
          >
            WOMEN&apos;S
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "jewelry" ? "active" : ""}`}
            href="#"
            onClick={() => handleLinkClick("jewelry")}
          >
            JEWELRY
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "perfume" ? "active" : ""}`}
            href="#"
            onClick={() => handleLinkClick("perfume")}
          >
            PREFUME
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "blog" ? "active" : ""}`}
            href="#"
            onClick={() => handleLinkClick("blog")}
          >
            BLOG
          </Link>
          <Link
            className={`navbar__link relative ${activeLink === "offers" ? "active" : ""}`}
            href="#"
            onClick={() => handleLinkClick("offers")}
          >
            HOT OFFERS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
