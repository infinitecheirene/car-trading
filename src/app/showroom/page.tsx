"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, MapPin, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";

import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { cars } from "../../data/cars";

const getPriceValue = (price: string) => Number(price.replace(/[$,]/g, ""));

export default function ShowroomPage() {
    const [search, setSearch] = useState("");
    const [selectedModel, setSelectedModel] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");
    const [priceRange, setPriceRange] = useState("all");

    const modelOptions = ["all", ...cars.map((car) => car.name)];

    const filteredCars = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        const filtered = cars.filter((car) => {
            const matchesSearch =
                normalizedSearch.length === 0 ||
                [car.name, car.type, car.location].some((value) =>
                    value.toLowerCase().includes(normalizedSearch)
                );

            const matchesModel =
                selectedModel === "all" || car.name === selectedModel;

            const matchesPrice =
                priceRange === "all" ||
                (() => {
                    const priceValue = getPriceValue(car.price);

                    if (priceRange === "under-50k") return priceValue < 50000;
                    if (priceRange === "50k-70k")
                        return priceValue >= 50000 && priceValue <= 70000;
                    if (priceRange === "70k-plus") return priceValue > 70000;
                    return true;
                })();

            return matchesSearch && matchesModel && matchesPrice;
        });

        return [...filtered].sort((a, b) => {
            if (sortOrder === "newest") {
                return Number(b.year) - Number(a.year);
            }

            if (sortOrder === "oldest") {
                return Number(a.year) - Number(b.year);
            }

            if (sortOrder === "price-low") {
                return getPriceValue(a.price) - getPriceValue(b.price);
            }

            if (sortOrder === "price-high") {
                return getPriceValue(b.price) - getPriceValue(a.price);
            }

            return 0;
        });
    }, [search, selectedModel, sortOrder, priceRange]);

    const clearFilters = () => {
        setSearch("");
        setSelectedModel("all");
        setSortOrder("newest");
        setPriceRange("all");
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#191610] text-white">
                <section className="relative overflow-hidden border-b border-[#BF980D]/20 bg-[#0d0b09]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,152,13,0.18),transparent_50%)]" />
                    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                        <div className="max-w-3xl">
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-px w-10 bg-[#BF980D]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#BF980D]">
                                    Featured Collection
                                </span>
                            </div>

                            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Discover the
                                <span className="block text-[#BF980D]">showroom collection</span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                                Handpicked models that balance confidence, comfort, and design. Explore high-performance sedans and luxury SUVs tailored for modern life.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="mb-8 rounded-[28px] border border-white/10 bg-[#120f0d] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-5">
                        <div className="mb-4 flex items-center justify-between gap-3 text-[#BF980D]">
                            <div className="flex gap-2 items-center">
                                <SlidersHorizontal size={18} />
                                <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                                    Search & filter
                                </p>
                            </div>

                            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 sm:block">
                                {cars.length} vehicles ready to drive
                            </div>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
                            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                                <Search size={16} className="text-[#BF980D]" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search model, type, or city"
                                    className="w-full border-none bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
                                />
                            </label>

                            <select
                                value={selectedModel}
                                onChange={(event) => setSelectedModel(event.target.value)}
                                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#BF980D]"
                            >
                                {modelOptions.map((model) => (
                                    <option key={model} value={model} className="bg-[#120f0d]">
                                        {model === "all" ? "All models" : model}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortOrder}
                                onChange={(event) => setSortOrder(event.target.value)}
                                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#BF980D]"
                            >
                                <option value="newest" className="bg-[#120f0d]">Newest first</option>
                                <option value="oldest" className="bg-[#120f0d]">Oldest first</option>
                                <option value="price-low" className="bg-[#120f0d]">Price: low to high</option>
                                <option value="price-high" className="bg-[#120f0d]">Price: high to low</option>
                            </select>

                            <select
                                value={priceRange}
                                onChange={(event) => setPriceRange(event.target.value)}
                                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#BF980D]"
                            >
                                <option value="all" className="bg-[#120f0d]">All price ranges</option>
                                <option value="under-50k" className="bg-[#120f0d]">Under $50k</option>
                                <option value="50k-70k" className="bg-[#120f0d]">$50k - $70k</option>
                                <option value="70k-plus" className="bg-[#120f0d]">$70k+</option>
                            </select>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-[#BF980D] hover:text-[#BF980D]"
                            >
                                <X size={15} />
                                Clear
                            </button>
                        </div>
                    </div>

                    {filteredCars.length === 0 ? (
                        <div className="rounded-[28px] border border-dashed border-white/15 bg-[#120f0d] px-6 py-16 text-center">
                            <p className="text-xl font-semibold text-white">No matching vehicles found</p>
                            <p className="mt-2 text-sm text-zinc-400">Try changing your search or clearing the filters.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {filteredCars.map((car) => (
                                <Link
                                    key={car.id}
                                    href={`/showroom/car/${car.id}`}
                                    className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#12110f] transition-all duration-300 hover:-translate-y-1 hover:border-[#BF980D]/50 hover:shadow-[0_25px_60px_rgba(191,152,13,0.12)]"
                                >
                                    <div className="relative overflow-hidden bg-[#0d0d0d] p-3">
                                        <div className="absolute right-4 top-4 rounded-full border border-[#BF980D]/40 bg-[#BF980D]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F3D77A]">
                                            {car.badge}
                                        </div>
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            width={800}
                                            height={500}
                                            className="h-52 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="space-y-4 p-5">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                                                    {car.year} • {car.type}
                                                </p>
                                                <h3 className="mt-2 text-2xl font-bold text-white">{car.name}</h3>
                                            </div>
                                            <span className="text-base font-black text-[#BF980D]">{car.price}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
                                            <div className="rounded-xl border border-white/10 bg-white/3 p-3">
                                                <span className="block text-[10px] uppercase tracking-[0.18em] text-zinc-400">Mileage</span>
                                                <span className="mt-2 block font-semibold text-white">{car.mileage}</span>
                                            </div>
                                            <div className="rounded-xl border border-white/10 bg-white/3 p-3">
                                                <span className="block text-[10px] uppercase tracking-[0.18em] text-zinc-400">Engine</span>
                                                <span className="mt-2 block font-semibold text-white">{car.engine}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-zinc-300">
                                            <span className="inline-flex items-center gap-2">
                                                <MapPin size={14} className="text-[#BF980D]" />
                                                {car.location}
                                            </span>
                                            <span className="inline-flex items-center gap-2 font-semibold text-[#BF980D]">
                                                Details
                                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="rounded-[28px] border border-[#BF980D]/20 bg-[#120f0d] p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <Sparkles className="text-[#BF980D]" size={18} />
                            <h3 className="text-xl font-bold text-white">Why drivers choose AutoTrade</h3>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <Gauge className="text-[#BF980D]" size={18} />
                                <h4 className="mt-4 text-lg font-bold text-white">Inspected quality</h4>
                                <p className="mt-2 text-sm leading-6 text-zinc-300">Every vehicle is reviewed for condition, safety, and performance before it reaches the showroom floor.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <Sparkles className="text-[#BF980D]" size={18} />
                                <h4 className="mt-4 text-lg font-bold text-white">Transparent pricing</h4>
                                <p className="mt-2 text-sm leading-6 text-zinc-300">No hidden surprises—just clear value, competitive pricing, and straightforward buying guidance.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <MapPin className="text-[#BF980D]" size={18} />
                                <h4 className="mt-4 text-lg font-bold text-white">Local experts</h4>
                                <p className="mt-2 text-sm leading-6 text-zinc-300">Our team helps you compare the right fit for your lifestyle, goals, and long-term value.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
