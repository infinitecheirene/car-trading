"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
    ArrowRight,
    CarFront,
    Menu,
    Phone,
    X,
} from "lucide-react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Showroom", href: "/showroom" },
    { name: "Sell / Trade", href: "/sell-your-car" },
    { name: "Financing", href: "/financing" },
    { name: "About", href: "/about" },
];

const HEADER_OFFSET = "-mb-[81px]";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF980D]";

export default function Navbar() {
    const pathname = usePathname() ?? "";

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHome = pathname === "/";

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";

        return (
            pathname === href ||
            pathname.startsWith(`${href}/`)
        );
    };

    const isSolid = !isHome || isScrolled || isMenuOpen;

    /* --------------------------------
       Scroll detection
    -------------------------------- */

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    /* --------------------------------
       Close menu on route change
    -------------------------------- */

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    /* --------------------------------
       Lock body scroll
    -------------------------------- */

    useEffect(() => {
        if (!isMenuOpen) return;

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* =========================================
                HEADER
            ========================================== */}

            <header
                className={`
                    sticky top-0 z-50
                    border-b
                    transition-all duration-300
                    motion-reduce:transition-none
                    ${isHome ? HEADER_OFFSET : ""}
                    ${
                        isSolid
                            ? "border-white/10 bg-[#080b0f]/90 backdrop-blur-xl"
                            : "border-transparent bg-transparent"
                    }
                `}
            >
                <nav
                    aria-label="Main"
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div
                        className="
                            flex h-[72px]
                            items-center justify-between
                            gap-4
                            sm:h-[76px]
                            lg:h-20
                            lg:grid
                            lg:grid-cols-[1fr_auto_1fr]
                        "
                    >

                        {/* =================================
                            LOGO
                        ================================== */}

                        <Link
                            href="/"
                            className={`
                                group flex items-center
                                gap-2.5 sm:gap-3
                                ${focusRing}
                            `}
                        >
                            <div
                                className="
                                    flex
                                    h-10 w-10
                                    sm:h-11 sm:w-11
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#BF980D]
                                    text-black
                                    shadow-[0_10px_30px_rgba(191,152,13,0.22)]
                                    transition-all
                                    duration-300
                                    group-hover:scale-105
                                    group-hover:shadow-[0_12px_35px_rgba(191,152,13,0.35)]
                                "
                            >
                                <CarFront
                                    size={21}
                                    strokeWidth={2.5}
                                />
                            </div>

                            <div className="leading-none">
                                <div
                                    className="
                                        text-base
                                        font-black
                                        tracking-tight
                                        text-white
                                        sm:text-lg
                                    "
                                >
                                    Auto
                                    <span className="text-zinc-400">
                                        Trade
                                    </span>
                                </div>

                                <div
                                    className="
                                        mt-1
                                        text-[8px]
                                        font-medium
                                        uppercase
                                        tracking-[0.25em]
                                        text-[#BF980D]
                                        sm:text-[9px]
                                    "
                                >
                                    Automotive
                                </div>
                            </div>
                        </Link>


                        {/* =================================
                            DESKTOP NAVIGATION
                        ================================== */}

                        <div className="hidden h-full lg:flex">
                            {navigation.map((item) => {
                                const active = isActive(
                                    item.href
                                );

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={
                                            active
                                                ? "page"
                                                : undefined
                                        }
                                        className={`
                                            relative
                                            flex
                                            h-full
                                            items-center
                                            px-4
                                            text-sm
                                            font-medium
                                            transition-colors
                                            duration-300
                                            ${focusRing}
                                            ${
                                                active
                                                    ? "text-white"
                                                    : "text-zinc-400 hover:text-white"
                                            }
                                        `}
                                    >
                                        {item.name}

                                        {active && (
                                            <span
                                                className="
                                                    absolute
                                                    bottom-0
                                                    left-4
                                                    right-4
                                                    h-0.5
                                                    rounded-full
                                                    bg-[#BF980D]
                                                    shadow-[0_0_12px_rgba(191,152,13,0.45)]
                                                "
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>


                        {/* =================================
                            DESKTOP CONTACT
                        ================================== */}

                        <div className="hidden justify-self-end lg:block">
                            <Link
                                href="/contact"
                                className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-[#BF980D]/70
                                    bg-black/30
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:border-[#BF980D]
                                    hover:bg-[#BF980D]
                                    hover:text-black
                                    ${focusRing}
                                `}
                            >
                                <Phone size={15} />
                                Contact
                            </Link>
                        </div>


                        {/* =================================
                            TABLET ACTIONS
                        ================================== */}

                        <div className="ml-auto flex items-center gap-2 lg:hidden">

                            {/* Tablet Contact */}
                            <Link
                                href="/contact"
                                className={`
                                    hidden
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-[#BF980D]/50
                                    bg-[#BF980D]/10
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-[#F3D77A]
                                    transition-all
                                    duration-300
                                    hover:border-[#BF980D]
                                    hover:bg-[#BF980D]
                                    hover:text-black
                                    sm:inline-flex
                                    ${focusRing}
                                `}
                            >
                                <Phone size={14} />
                                Contact
                            </Link>


                            {/* Mobile / Tablet Menu */}
                            <button
                                type="button"
                                aria-label={
                                    isMenuOpen
                                        ? "Close menu"
                                        : "Open menu"
                                }
                                aria-expanded={
                                    isMenuOpen
                                }
                                aria-controls="mobile-menu"
                                onClick={() =>
                                    setIsMenuOpen(
                                        (open) => !open
                                    )
                                }
                                className={`
                                    flex
                                    h-11 w-11
                                    sm:h-12 sm:w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    ${
                                        isMenuOpen
                                            ? "border-[#BF980D]/60 bg-[#BF980D]/10 text-[#F3D77A]"
                                            : "border-white/15 bg-black/30 text-white"
                                    }
                                    backdrop-blur-md
                                    shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                                    transition-all
                                    duration-300
                                    hover:border-[#BF980D]
                                    ${focusRing}
                                `}
                            >
                                {isMenuOpen ? (
                                    <X
                                        size={21}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <Menu
                                        size={21}
                                        strokeWidth={2}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>


            {/* =========================================
                MOBILE / TABLET MENU
            ========================================== */}

            <div
                id="mobile-menu"
                aria-hidden={!isMenuOpen}
                className={`
                    fixed
                    inset-0
                    z-40
                    lg:hidden
                    transition-all
                    duration-500
                    ${
                        isMenuOpen
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                    }
                `}
            >

                {/* Backdrop */}
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() =>
                        setIsMenuOpen(false)
                    }
                    className="
                        absolute
                        inset-0
                        cursor-default
                        bg-black/70
                        backdrop-blur-md
                    "
                />

                {/* Navigation Drawer */}
                <div
                    className={`
                        absolute
                        right-0
                        top-0
                        h-full
                        w-full
                        max-w-md
                        border-l
                        border-white/10
                        bg-[#080c11]
                        shadow-[-20px_0_80px_rgba(0,0,0,0.55)]
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${
                            isMenuOpen
                                ? "translate-x-0"
                                : "translate-x-full"
                        }
                    `}
                >

                    {/* Drawer Header */}
                    <div
                        className="
                            flex
                            h-[72px]
                            items-center
                            justify-between
                            border-b
                            border-white/10
                            px-5
                            sm:h-[76px]
                            sm:px-6
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-9 w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#BF980D]
                                    text-black
                                "
                            >
                                <CarFront
                                    size={19}
                                    strokeWidth={2.5}
                                />
                            </div>

                            <div className="leading-none">
                                <div
                                    className="
                                        text-base
                                        font-black
                                        text-white
                                    "
                                >
                                    Auto
                                    <span className="text-zinc-400">
                                        Trade
                                    </span>
                                </div>

                                <div
                                    className="
                                        mt-1
                                        text-[8px]
                                        uppercase
                                        tracking-[0.25em]
                                        text-[#BF980D]
                                    "
                                >
                                    Automotive
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className={`
                                flex
                                h-10 w-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.03]
                                text-zinc-300
                                transition-all
                                hover:border-[#BF980D]
                                hover:text-[#F3D77A]
                                ${focusRing}
                            `}
                        >
                            <X size={19} />
                        </button>
                    </div>


                    {/* Drawer Content */}
                    <div className="flex h-[calc(100%-72px)] flex-col overflow-y-auto px-5 py-7 sm:h-[calc(100%-76px)] sm:px-6">

                        {/* Label */}
                        <div
                            className={`
                                mb-5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.3em]
                                text-zinc-500
                                transition-all
                                duration-500
                                ${
                                    isMenuOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-3 opacity-0"
                                }
                            `}
                        >
                            Explore AutoTrade
                        </div>


                        {/* Navigation */}
                        <nav>
                            <ul className="space-y-1">

                                {navigation.map(
                                    (item, index) => {
                                        const active =
                                            isActive(
                                                item.href
                                            );

                                        return (
                                            <li
                                                key={
                                                    item.name
                                                }
                                                style={{
                                                    transitionDelay:
                                                        isMenuOpen
                                                            ? `${
                                                                  80 +
                                                                  index *
                                                                      55
                                                              }ms`
                                                            : "0ms",
                                                }}
                                                className={`
                                                    transition-all
                                                    duration-500
                                                    ease-out
                                                    ${
                                                        isMenuOpen
                                                            ? "translate-x-0 opacity-100"
                                                            : "translate-x-5 opacity-0"
                                                    }
                                                `}
                                            >
                                                <Link
                                                    href={
                                                        item.href
                                                    }
                                                    aria-current={
                                                        active
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    onClick={() =>
                                                        setIsMenuOpen(
                                                            false
                                                        )
                                                    }
                                                    className={`
                                                        group
                                                        relative
                                                        flex
                                                        min-h-[62px]
                                                        items-center
                                                        justify-between
                                                        border-b
                                                        border-white/[0.07]
                                                        px-1
                                                        text-xl
                                                        font-semibold
                                                        tracking-tight
                                                        transition-all
                                                        duration-300
                                                        sm:min-h-[68px]
                                                        sm:text-2xl
                                                        ${focusRing}
                                                        ${
                                                            active
                                                                ? "text-white"
                                                                : "text-zinc-400 hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    <span className="flex items-center gap-4">

                                                        {/* Active indicator */}
                                                        <span
                                                            className={`
                                                                h-1.5
                                                                w-1.5
                                                                rounded-full
                                                                transition-all
                                                                duration-300
                                                                ${
                                                                    active
                                                                        ? "bg-[#BF980D] shadow-[0_0_14px_rgba(191,152,13,0.8)]"
                                                                        : "bg-transparent group-hover:bg-[#BF980D]/50"
                                                                }
                                                            `}
                                                        />

                                                        {item.name}
                                                    </span>

                                                    <ArrowRight
                                                        size={19}
                                                        className={`
                                                            transition-all
                                                            duration-300
                                                            ${
                                                                active
                                                                    ? "translate-x-0 text-[#BF980D] opacity-100"
                                                                    : "translate-x-[-6px] text-zinc-600 opacity-0 group-hover:translate-x-0 group-hover:text-[#BF980D] group-hover:opacity-100"
                                                            }
                                                        `}
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    }
                                )}

                            </ul>
                        </nav>


                        {/* Bottom CTA */}
                        <div
                            style={{
                                transitionDelay: isMenuOpen
                                    ? `${
                                          100 +
                                          navigation.length *
                                              55
                                      }ms`
                                    : "0ms",
                            }}
                            className={`
                                mt-auto
                                pt-8
                                transition-all
                                duration-500
                                ${
                                    isMenuOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-5 opacity-0"
                                }
                            `}
                        >

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-[#BF980D]/20
                                    bg-[#BF980D]/[0.06]
                                    p-5
                                "
                            >
                                {/* Glow */}
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-16
                                        -top-16
                                        h-32
                                        w-32
                                        rounded-full
                                        bg-[#BF980D]/10
                                        blur-3xl
                                    "
                                />

                                <div className="relative">
                                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#BF980D]">
                                        Ready to drive?
                                    </div>

                                    <p className="max-w-xs text-sm leading-6 text-zinc-400">
                                        Browse our collection or
                                        speak with our team about
                                        your next vehicle.
                                    </p>

                                    <Link
                                        href="/contact"
                                        onClick={() =>
                                            setIsMenuOpen(false)
                                        }
                                        className={`
                                            mt-5
                                            flex
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            bg-[#BF980D]
                                            px-6
                                            py-3.5
                                            text-sm
                                            font-bold
                                            text-black
                                            shadow-[0_15px_35px_rgba(191,152,13,0.2)]
                                            transition-all
                                            duration-300
                                            hover:bg-[#d5b443]
                                            hover:shadow-[0_18px_45px_rgba(191,152,13,0.3)]
                                            ${focusRing}
                                        `}
                                    >
                                        <Phone size={16} />
                                        Contact Us
                                        <ArrowRight
                                            size={15}
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Small footer text */}
                            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                                Premium Automotive
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}