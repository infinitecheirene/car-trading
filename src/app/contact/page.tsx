"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, Phone, Send } from "lucide-react";

import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

const contactOptions = [
    {
        icon: Phone,
        title: "Call us",
        value: "+1 (415) 555-0148",
        href: "tel:+14155550148",
    },
    {
        icon: Mail,
        title: "Email",
        value: "hello@autotrade.com",
        href: "mailto:hello@autotrade.com",
    },
    {
        icon: MapPin,
        title: "Visit us",
        value: "214 Harbor Drive, San Francisco, CA",
        href: "https://maps.google.com/?q=214+Harbor+Drive+San+Francisco+CA",
    },
];

const hours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "10:00 AM - 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
];

export default function Contact() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                                    Contact us
                                </span>
                            </div>

                            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Let’s find your
                                <span className="block text-[#BF980D]">next ideal drive.</span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                                Tell us what you’re looking for, and our team will guide you toward a vehicle that feels right for your life, your budget, and your driving style.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="space-y-5">
                            {contactOptions.map(({ icon: Icon, title, value, href }) => (
                                <a
                                    key={title}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                                    className="group flex items-start gap-4 rounded-[24px] border border-white/10 bg-[#120f0d] p-5 transition-all duration-300 hover:border-[#BF980D]/50 hover:bg-[#15120f]"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#BF980D]/30 bg-[#BF980D]/10 text-[#BF980D]">
                                        <Icon size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                                            {title}
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-[#F3D77A]">
                                            {value}
                                        </p>
                                    </div>
                                </a>
                            ))}

                            <div className="rounded-[24px] border border-white/10 bg-[#120f0d] p-5">
                                <div className="mb-4 flex items-center gap-3 text-[#BF980D]">
                                    <Clock3 size={18} />
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                                        Opening hours
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {hours.map((item) => (
                                        <div key={item.day} className="flex items-center justify-between gap-4 border-t border-white/10 pt-3 text-sm text-zinc-300 first:border-t-0 first:pt-0">
                                            <span>{item.day}</span>
                                            <span className="font-medium text-white">{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-[#BF980D]/20 bg-[#120f0d] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-7">
                            <div className="mb-6 flex items-center gap-3 text-[#BF980D]">
                                <Send size={18} />
                                <span className="text-xs font-semibold uppercase tracking-[0.28em]">
                                    Enquire now
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="mb-2 block text-sm text-zinc-300">First name</span>
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="w-full rounded-2xl border border-white/10 bg-[#0f0d0a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#BF980D] focus:outline-none"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="mb-2 block text-sm text-zinc-300">Last name</span>
                                        <input
                                            type="text"
                                            placeholder="Smith"
                                            className="w-full rounded-2xl border border-white/10 bg-[#0f0d0a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#BF980D] focus:outline-none"
                                        />
                                    </label>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="mb-2 block text-sm text-zinc-300">Email</span>
                                        <input
                                            type="email"
                                            placeholder="john@email.com"
                                            className="w-full rounded-2xl border border-white/10 bg-[#0f0d0a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#BF980D] focus:outline-none"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="mb-2 block text-sm text-zinc-300">Phone</span>
                                        <input
                                            type="tel"
                                            placeholder="(555) 123-4567"
                                            className="w-full rounded-2xl border border-white/10 bg-[#0f0d0a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#BF980D] focus:outline-none"
                                        />
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="mb-2 block text-sm text-zinc-300">Looking for</span>
                                    <input
                                        type="text"
                                        placeholder="Luxury SUV, sedan, electric vehicle..."
                                        className="w-full rounded-2xl border border-white/10 bg-[#0f0d0a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#BF980D] focus:outline-none"
                                    />
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm text-zinc-300">Message</span>
                                    <textarea
                                        rows={5}
                                        placeholder="Tell us about your ideal vehicle, budget, and timeline..."
                                        className="w-full resize-none rounded-2xl border border-white/10 bg-[#0f0d0a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#BF980D] focus:outline-none"
                                    />
                                </label>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm text-zinc-400">
                                        We usually respond within 1 business day.
                                    </p>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#BF980D] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#d4ad20]"
                                    >
                                        Send inquiry
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="bg-black py-16">
                    <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="rounded-[30px] border border-[#BF980D]/25 bg-[#120f0d] px-6 py-10 sm:px-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#BF980D]">
                                Visit the showroom
                            </p>
                            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                See the collection in person.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                                Explore our inventory, compare models side by side, and speak with an expert about the right fit for your next move.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href="/showroom"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#BF980D]/60 hover:bg-white/10"
                                >
                                    Browse inventory
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
