"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("");
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const moreBtnRef = useRef(null);

  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const moreLinks = [
    { name: "Price Predictor", href: "/predictor" },
    { name: "Buy", href: "/pages/buyer/market" },
    { name: "Sell", href: "/pages/farmer" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const linkStyle =
    "relative px-2 py-1 text-gray-800 font-semibold hover:text-green-600 after:block after:scale-x-0 after:bg-green-500 after:h-[2px] after:rounded-full after:transition-transform hover:after:scale-x-100 transition-all duration-200";
  const activeStyle = "text-green-600 font-bold scale-105";

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        mobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
      if (dropdownOpen) {
        const clickedMore =
          moreBtnRef.current && moreBtnRef.current.contains(e.target);
        const insideDropdown =
          dropdownRef.current && dropdownRef.current.contains(e.target);
        if (!clickedMore && !insideDropdown) setDropdownOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, dropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {(mobileOpen || dropdownOpen) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40"
          onClick={() => {
            setMobileOpen(false);
            setDropdownOpen(false);
          }}
        />
      )}

      <nav className="fixed top-0 z-50 w-full transition-colors duration-300 bg-green-100 backdrop-blur-xl shadow-lg border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Haryali"
              className="h-20 w-auto object-contain"
            />
            <h1 className="font-bold text-4xl text-green-600">Haryali</h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex ms-auto items-center gap-8 text-lg">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setActive(name.toLowerCase())}
                className={`${linkStyle} ${
                  active === name.toLowerCase() ? activeStyle : ""
                }`}
              >
                {name}
              </Link>
            ))}

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                ref={moreBtnRef}
                onClick={() => setDropdownOpen((p) => !p)}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-md transition-colors"
              >
                More
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 font-semibold rounded-lg shadow-lg overflow-hidden border border-gray-200 z-50">
                  {moreLinks.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => {
                        setDropdownOpen(false);
                        setActive(name.toLowerCase());
                      }}
                      className={`block px-5 py-2 hover:bg-gray-100 transition-colors ${
                        active === name.toLowerCase()
                          ? "font-bold text-green-600"
                          : ""
                      }`}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Login & Signup */}
            <div className="flex gap-4 ms-4">
              <Link href="/login">
                <button className="px-5 py-2 rounded-xl border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-colors shadow-sm">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="text-white"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
