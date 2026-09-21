import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Gauge, MapPin, Settings2, Sparkles, Star } from "lucide-react";
import { notFound } from "next/navigation";

import Navbar from "../../../../components/layout/navbar";
import Footer from "../../../../components/layout/footer";
import { cars } from "../../../../data/cars";

const galleryImages = [
    "/showroom-gallery-1.jpg",
    "/showroom-gallery-2.jpg",
    "/showroom-gallery-3.jpg",
    "/showroom-gallery-4.jpg",
    "/showroom-gallery-5.jpg",
    "/showroom-gallery-6.jpg",
];

export default async function CarDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const car = cars.find((item) => item.id === Number(id));

    if (!car) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#191610] text-white">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link
                        href="/showroom"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#BF980D] transition-colors hover:text-[#dbc15b]"
                    >
                        <ArrowLeft size={16} />
                        Back to showroom
                    </Link>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0d0a] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-6">
                            <div className="relative overflow-hidden rounded-[22px] bg-[#111111]">
                                <div className="absolute inset-x-10 bottom-4 h-12 rounded-full bg-[#BF980D]/20 blur-3xl" />
                                <Image
                                    src={car.image}
                                    alt={car.name}
                                    width={1200}
                                    height={800}
                                    priority
                                    className="relative z-10 h-[360px] w-full object-contain sm:h-[460px] lg:h-[560px]"
                                />
                            </div>
                            
                                <div className="mt-4">
                                    <div className="mt-2 grid grid-cols-3 gap-4">
                                        {galleryImages.map((image, index) => (  
                                            <Image
                                                key={index}
                                                src={image}
                                                alt={`Gallery image ${index + 1}`}
                                                width={400}
                                                height={300}
                                                className="h-24 w-full rounded-lg object-cover sm:h-32 border border-white/10 bg-[#0f0d0a]/50 p-4"
                                            />
                                        ))}
                                    </div>
                                </div>
                        </div>

                        <aside className="rounded-[28px] border border-[#BF980D]/20 bg-[#120f0d] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <span className="rounded-full border border-[#BF980D]/40 bg-[#BF980D]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F3D77A]">
                                    {car.badge}
                                </span>
                                <span className="flex items-center gap-1 text-sm text-[#F3D77A]">
                                    <Star size={14} fill="currentColor" />
                                    Featured
                                </span>
                            </div>

                            <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                                {car.year} • {car.type}
                            </p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                {car.name}
                            </h1>

                            <div className="mt-6 flex items-end gap-3">
                                <span className="text-4xl font-black text-[#BF980D]">{car.price}</span>
                                <span className="pb-1 text-sm text-zinc-400">Starting price</span>
                            </div>

                            <div className="mt-7 space-y-4 border-y border-white/10 py-6 text-sm text-zinc-300">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Mileage</span>
                                    <span className="font-semibold text-white">{car.mileage}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Engine</span>
                                    <span className="font-semibold text-white">{car.engine}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Power</span>
                                    <span className="font-semibold text-white">{car.horsepower}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Transmission</span>
                                    <span className="font-semibold text-white">{car.transmission}</span>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-[#BF980D] px-6 py-3 text-sm font-bold text-black transition-all hover:bg-[#d8b53c]"
                                >
                                    Book a test drive
                                </Link>
                                <Link
                                    href="/showroom"
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#BF980D] hover:bg-[#BF980D]/10"
                                >
                                    Browse more cars
                                </Link>
                            </div>
                        </aside>
                    </div>

                    <section className="mt-12 rounded-[28px] border border-white/10 bg-[#100e0c] p-6 sm:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <Sparkles className="text-[#BF980D]" size={18} />
                            <h2 className="text-xl font-bold text-white">Vehicle highlights</h2>
                        </div>

                        <p className="max-w-3xl text-base leading-7 text-zinc-300">
                            {car.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-[#171410] p-4">
                                <Gauge className="text-[#BF980D]" size={18} />
                                <p className="mt-3 text-sm text-zinc-400">Engine</p>
                                <p className="mt-1 text-lg font-bold text-white">{car.engine}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#171410] p-4">
                                <Settings2 className="text-[#BF980D]" size={18} />
                                <p className="mt-3 text-sm text-zinc-400">Transmission</p>
                                <p className="mt-1 text-lg font-bold text-white">{car.transmission}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#171410] p-4">
                                <MapPin className="text-[#BF980D]" size={18} />
                                <p className="mt-3 text-sm text-zinc-400">Location</p>
                                <p className="mt-1 text-lg font-bold text-white">{car.location}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#171410] p-4">
                                <Sparkles className="text-[#BF980D]" size={18} />
                                <p className="mt-3 text-sm text-zinc-400">Fuel</p>
                                <p className="mt-1 text-lg font-bold text-white">{car.fuel}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
