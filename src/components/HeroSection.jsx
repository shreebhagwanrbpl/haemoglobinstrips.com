"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "haemoglobinstripscom", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  // Helper to highlight the last word of the title in purple
  const renderTitle = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length <= 1) return title;
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <span className="text-[#5B21B6]">{lastWord}</span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between bg-gradient-to-br from-[#FAFAFE] via-white to-[#F5F3FF] pt-12 pb-8 lg:pt-16 lg:pb-10">
      {/* Decorative background shapes */}
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />
      <div className="absolute right-1/2 bottom-20 h-[500px] w-[500px] rounded-full bg-purple-50/30 blur-3xl pointer-events-none" />

      {/* Main content grid (Content Left, Image Right) */}
      <div className="container-custom relative z-10 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 xl:gap-14 items-center">

        {/* LEFT COLUMN: HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start text-left z-10 lg:pr-6"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4.5 py-2 text-sm font-semibold text-[#5B21B6] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5B21B6] animate-pulse" />
            Trusted by Labs. Chosen for Excellence.
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-[#1F2937] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 w-[85%] rounded-xl bg-violet-100"></div>
                <div className="h-12 w-[70%] rounded-xl bg-violet-100"></div>
              </div>
            ) : (
              <>
                {renderTitle(heroData.title)}

                {city && (
                  <>
                    <br />
                    <span className="mt-2 inline-block text-2xl font-bold text-violet-600 sm:text-3xl lg:text-4xl">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="mt-7 animate-pulse space-y-3 w-full">
              <div className="h-4 w-full rounded bg-violet-100"></div>
              <div className="h-4 w-[90%] rounded bg-violet-100"></div>
            </div>
          ) : (
            <p className="mt-7 text-base md:text-lg leading-relaxed text-[#4B5563] font-medium">
              {heroData.description}

              {city && (
                <>
                  {" "}
                  across{" "}
                  <strong className="text-[#5B21B6] font-bold">{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
            {loading ? (
              <>
                <div className="h-12 w-44 animate-pulse rounded-xl bg-violet-100"></div>
                <div className="h-12 w-36 animate-pulse rounded-xl bg-violet-100"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/items")} className="w-full sm:w-auto">
                  <button className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#5B21B6] px-8 py-3.5 font-bold text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9]">
                    {heroData.button1Text || "Explore Products"}
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto rounded-xl border-2 border-violet-600 bg-white px-8 py-3.5 font-bold text-violet-750 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50 hover:text-violet-800">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Empty Spacer Column for layout spacing on desktop */}
        <div className="hidden lg:block h-10 pointer-events-none" />

        {/* RIGHT COLUMN: SCREEN BLEED IMAGE BANNER */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[46%] w-full h-[320px] sm:h-[400px] lg:h-full overflow-hidden z-0"
        >
          {/* Main lab image */}
          <Image
            src="/herobanner.png"
            alt="Biomedical diagnostics laboratory equipment and analyzer systems banner"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-left"
          />

          {/* CURVED OVERLAY DIVISION SHAPES (Visible on desktop lg screens) */}
          <div className="absolute left-0 top-0 bottom-0 w-72 z-10 pointer-events-none hidden lg:block -ml-36">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Layer 1: Soft light violet wave */}
              <path d="M 0 0 L 50 0 C 80 25, 90 75, 50 100 L 0 100 Z" fill="#DDD6FE" opacity="0.4" />
              {/* Layer 2: Medium purple accent wave */}
              <path d="M 0 0 L 50 0 C 70 25, 80 75, 50 100 L 0 100 Z" fill="#C084FC" opacity="0.25" />
              {/* Layer 3: Solid background color mask that blends with the left background */}
              <path d="M 0 0 L 50 0 C 60 25, 70 75, 50 100 L 0 100 Z" fill="#FAFAFE" />
            </svg>
          </div>

          {/* Soft shadow/fade overlay on the left boundary for mobile view */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAFAFE] to-transparent lg:hidden pointer-events-none" />
        </motion.div>

      </div>

      {/* BOTTOM AREA: HORIZONTAL STATISTICS PANEL CARD */}
      <div className="container-custom relative z-10 w-full mt-10 lg:mt-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-[2rem] border border-violet-100/60 bg-white/95 px-6 py-5 lg:px-12 lg:py-6 shadow-[0_15px_50px_rgba(91,33,182,0.06)] backdrop-blur-md flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 w-full"
        >
          {[
            { value: "10+", label: "Years Experience", icon: ShieldCheck },
            { value: "500+", label: "Products Delivered", icon: Microscope },
            { value: "100%", label: "Quality Assurance", icon: BadgeCheck }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-4 min-w-[200px] w-full md:w-auto justify-center md:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[#5B21B6] shadow-sm">
                  <Icon size={20} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-[#5B21B6] leading-none mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}