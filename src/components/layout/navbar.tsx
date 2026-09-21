"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CarFront, Phone } from "lucide-react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Showroom", href: "/showroom" },
    { name: "Sell / Trade", href: "/sell-your-car" },
    { name: "Financing", href: "/financing" },
    { name: "About", href: "/about" },
];

const LINK_PADDING = 14;

const HEADER_OFFSET = "-mb-[81px]";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF980D]";

export default function Navbar() {
    const pathname = usePathname() ?? "";

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [indicator, setIndicator] = useState({
        x: 0,
        width: 0,
        visible: false,
        animate: false,
    });

    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const isHome = pathname === "/";

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const activeIndex = navigation.findIndex((item) => isActive(item.href));

    const targetIndex = hoveredIndex ?? activeIndex;

    const isSolid = !isHome || isScrolled || isMenuOpen;

    /* ---------- Scroll state ---------- */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------- Gold line position ---------- */
    useEffect(() => {
        const measure = () => {
            const el = targetIndex >= 0 ? linkRefs.current[targetIndex] : null;

            /* offsetWidth is 0 while the desktop nav is hidden (mobile). */
            if (!el || el.offsetWidth === 0) {
                setIndicator((prev) => ({ ...prev, visible: false, animate: true }));
                return;
            }

            setIndicator((prev) => ({
                x: el.offsetLeft + LINK_PADDING,
                width: el.offsetWidth - LINK_PADDING * 2,
                visible: true,
                /* Snap into place the first time; glide afterwards. */
                animate: prev.visible,
            }));
        };

        measure();
        window.addEventListener("resize", measure);

        return () => window.removeEventListener("resize", measure);
    }, [targetIndex]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };

        const onResize = () => {
            if (window.innerWidth >= 1024) setIsMenuOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", onResize);
        };
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={`
                    sticky top-0 z-50 border-b
                    transition-[background-color,border-color,backdrop-filter]
                    duration-300 motion-reduce:transition-none
                    ${isHome ? HEADER_OFFSET : ""}
                    ${isMenuOpen
                        ? "border-white/10 bg-[#051524]"
                        : isSolid
                            ? "border-white/10 bg-gray-800/10 backdrop-blur-xl"
                            : "border-transparent bg-transparent"
                    }
                `}
            >
                <nav
                    aria-label="Main"
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="flex h-20 items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BF980D]/70 text-white/80 transition-transform duration-300 group-hover:scale-105">
                                <CarFront size={22} strokeWidth={2.5} />
                            </div>

                            <div className="leading-none">
                                <div className="text-lg font-black tracking-tight text-zinc-100">
                                    Auto<span className="text-zinc-400">Trade</span>
                                </div>
                                <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#BF980D]">
                                    Automotive
                                </div>
                            </div>
                        </Link>

                        {/* Desktop navigation (centered) */}
                        <div
                            className="relative hidden h-full lg:flex"
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {navigation.map((item, index) => {
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        ref={(el) => {
                                            linkRefs.current[index] = el;
                                        }}
                                        aria-current={active ? "page" : undefined}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onFocus={() => setHoveredIndex(index)}
                                        onBlur={() => setHoveredIndex(null)}
                                        className={`
                                            flex h-full items-center px-4 text-sm font-medium
                                            outline-none transition-colors duration-300
                                            focus-visible:text-white
                                            ${active
                                                ? "text-white"
                                                : "text-zinc-400 hover:text-white"
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}

                            {/* Gold line that sits on the header's bottom edge */}
                            <span
                                aria-hidden
                                className="
                                    pointer-events-none absolute bottom-0 left-0
                                    h-0.5 w-px origin-left bg-[#BF980D]
                                    ease-[cubic-bezier(0.22,1,0.36,1)]
                                    motion-reduce:transition-none
                                "
                                style={{
                                    transform: `translate3d(${indicator.x}px, 0, 0) scaleX(${Math.max(indicator.width, 0)})`,
                                    opacity: indicator.visible ? 1 : 0,
                                    transitionProperty: indicator.animate
                                        ? "transform, opacity"
                                        : "opacity",
                                    transitionDuration: indicator.animate
                                        ? "500ms, 200ms"
                                        : "200ms",
                                }}
                            />
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden justify-self-end lg:block">
                            <Link
                                href="/contact"
                                className={`inline-flex items-center gap-2 rounded-full border border-[#BF980D]/70 bg-black/30 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:border-[#BF980D] hover:bg-[#BF980D] hover:text-black ${focusRing}`}
                            >
                                <Phone size={15} />
                                Contact
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-md transition-colors hover:border-[#BF980D] lg:hidden ${focusRing}`}
                        >
                            <span aria-hidden className="relative block h-3.5 w-5">
                                <span
                                    className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-white transition-transform duration-300 motion-reduce:transition-none ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                                        }`}
                                />
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-white transition-transform duration-300 motion-reduce:transition-none ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                                        }`}
                                />
                            </span>
                        </button>
                    </div>
                </nav>
            </header>

            {/*
              * Mobile menu. It lives OUTSIDE the header on purpose: the header
              * uses backdrop-filter, which would turn `fixed` into "fixed to
              * the header" instead of "fixed to the screen".
              */}
            <div
                id="mobile-menu"
                aria-hidden={!isMenuOpen}
                className={`
                    fixed inset-0 z-40 bg-black lg:hidden
                    transition-[opacity,visibility] duration-300 motion-reduce:transition-none
                    ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
                `}
            >
                {/* Gold ambient glow, same as the hero */}
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-[280px] w-[650px] -translate-x-1/2 rounded-full bg-[#BF980D]/10 blur-[120px]" />

                <div className="relative mx-auto flex h-full max-w-7xl flex-col overflow-y-auto px-4 pb-8 pt-28 sm:px-6">

                    <ul className="border-t border-white/10">
                        {navigation.map((item, index) => {
                            const active = isActive(item.href);

                            return (
                                <li
                                    key={item.name}
                                    style={{
                                        transitionDelay: isMenuOpen
                                            ? `${100 + index * 50}ms`
                                            : "0ms",
                                    }}
                                    className={`
                                        border-b border-white/10
                                        transition-[opacity,transform] duration-500 ease-out
                                        motion-reduce:transition-none
                                        ${isMenuOpen
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-3 opacity-0"
                                        }
                                    `}
                                >
                                    <Link
                                        href={item.href}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`
                                            flex items-center justify-between py-5
                                            text-3xl font-semibold tracking-tight
                                            transition-colors duration-300 ${focusRing}
                                            ${active
                                                ? "text-white"
                                                : "text-zinc-500 hover:text-white"
                                            }
                                        `}
                                    >
                                        {item.name}

                                        {active && (
                                            <span className="h-2 w-2 rounded-full bg-[#BF980D]" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile CTA */}
                    <div
                        style={{
                            transitionDelay: isMenuOpen
                                ? `${100 + navigation.length * 50}ms`
                                : "0ms",
                        }}
                        className={`
                            mt-auto pt-10
                            transition-[opacity,transform] duration-500 ease-out
                            motion-reduce:transition-none
                            ${isMenuOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-3 opacity-0"
                            }
                        `}
                    >
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex w-full items-center justify-center gap-2 rounded-full bg-[#BF980D] px-7 py-4 text-sm font-bold text-black shadow-lg shadow-[#BF980D]/10 transition-colors duration-300 hover:bg-[#d4ad20] ${focusRing}`}
                        >
                            <Phone size={16} />
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}