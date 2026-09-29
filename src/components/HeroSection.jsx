"use client";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, doc, collection, getDoc, getDocs, addDoc, onSnapshot } from "@/lib/firestore-shim";
import { WEBSITE_ID } from "@/lib/catalog-utils";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HeroSection({ city, initialHeroData = null }) {
  const [loading, setLoading] = useState(!initialHeroData);

  const [heroData, setHeroData] = useState(
    initialHeroData || {
      title: "",
      description: "",
      button1Text: "",
      button2Text: "",
      image: "",
      imageUrl: "",
      heroImage: "",
      bannerImage: "",
      images: [],
      media: [],
    }
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const hasMedia = (d) =>
      Boolean(
        d?.image ||
        d?.imageUrl ||
        d?.heroImage ||
        d?.bannerImage ||
        (Array.isArray(d?.images) && d.images.length > 0) ||
        (Array.isArray(d?.media) && d.media.length > 0)
      );

    let doc1Data = initialHeroData || null;
    let doc2Data = null;

    const applyMerged = () => {
      if (doc1Data && hasMedia(doc1Data)) {
        setHeroData(doc1Data);
      } else if (doc2Data && hasMedia(doc2Data)) {
        setHeroData({
          ...(doc1Data || {}),
          ...doc2Data,
          image: doc2Data.image || doc1Data?.image || "",
          imageUrl: doc2Data.imageUrl || doc1Data?.imageUrl || "",
          images: doc2Data.images?.length ? doc2Data.images : doc1Data?.images || [],
          media: doc2Data.media?.length ? doc2Data.media : doc1Data?.media || [],
        });
      } else if (doc1Data || doc2Data) {
        setHeroData(doc1Data || doc2Data);
      }
      setLoading(false);
    };

    const unsub1 = onSnapshot(
      doc(db, "websites", WEBSITE_ID, "pages", "home"),
      (snap) => {
        if (snap.exists()) {
          doc1Data = snap.data();
          applyMerged();
        }
      },
      (err) => console.error("Error listening to haemoglobinstripscom:", err)
    );

    const unsub2 = onSnapshot(
      doc(db, "websites", "haemoglobinstripcom", "pages", "home"),
      (snap) => {
        if (snap.exists()) {
          doc2Data = snap.data();
          applyMerged();
        }
      },
      (err) => console.error("Error listening to haemoglobinstripcom:", err)
    );

    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const slides = useMemo(() => {
    const list = [];

    if (Array.isArray(heroData.media) && heroData.media.length > 0) {
      heroData.media.forEach((m) => {
        const url = typeof m === "string" ? m : m.url;
        const type = m.type || (url?.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ? "video" : "image");
        if (url && !list.some((item) => item.url === url)) {
          list.push({ type, url });
        }
      });
    }

    if (Array.isArray(heroData.images) && heroData.images.length > 0) {
      heroData.images.forEach((img) => {
        const url = typeof img === "string" ? img : img?.url;
        if (url && !list.some((item) => item.url === url)) {
          list.push({ type: "image", url });
        }
      });
    }

    const singleImg =
      heroData.image ||
      heroData.imageUrl ||
      heroData.heroImage ||
      heroData.bannerImage;

    if (singleImg && !list.some((item) => item.url === singleImg)) {
      list.push({ type: "image", url: singleImg });
    }

    if (list.length === 0) {
      list.push({ type: "image", url: "/herobanner.png" });
    }

    return list;
  }, [heroData]);

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  const activeSlideIndex = slides.length > 0 ? currentSlideIndex % slides.length : 0;
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

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
    <section className="relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#FAFAFE] via-white to-[#F5F3FF] pt-8 pb-6 lg:pt-10 lg:pb-8">
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />
      <div className="absolute right-1/2 bottom-20 h-[500px] w-[500px] rounded-full bg-purple-50/30 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-8 xl:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left max-w-2xl py-2 lg:py-4 z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#5B21B6] shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#5B21B6] animate-pulse" />
            <span>Trusted by Labs. Chosen for Excellence.</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl leading-[1.15]">
            {loading ? (
              <div className="space-y-3 w-full animate-pulse">
                <div className="h-10 w-3/4 rounded-lg bg-violet-100"></div>
                <div className="h-10 w-1/2 rounded-lg bg-violet-100"></div>
              </div>
            ) : (
              <>
                {renderTitle(heroData.title || "Biomedical Equipment & Laboratory Machine Distributor")}
                {city && (
                  <>
                    <br />
                    <span className="mt-2 inline-block text-xl font-bold text-violet-600 sm:text-2xl lg:text-3xl">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {loading ? (
            <div className="mt-4 animate-pulse space-y-2.5 w-full">
              <div className="h-4 w-full rounded bg-violet-100"></div>
              <div className="h-4 w-[90%] rounded bg-violet-100"></div>
            </div>
          ) : (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4B5563] font-medium">
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

          <div className="mt-6 flex flex-col gap-3.5 sm:flex-row w-full sm:w-auto">
            {loading ? (
              <>
                <div className="h-11 w-40 animate-pulse rounded-xl bg-violet-100"></div>
                <div className="h-11 w-32 animate-pulse rounded-xl bg-violet-100"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/items")} className="w-full sm:w-auto">
                  <button className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm sm:text-base font-bold text-white shadow-md shadow-violet-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6D28D9]">
                    {heroData.button1Text || "Explore Products"}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto rounded-xl border-2 border-violet-600 bg-white px-6 py-3 text-sm sm:text-base font-bold text-violet-750 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-50 hover:text-violet-800">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <div className="hidden lg:block h-8 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group/carousel relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[46%] w-full h-[260px] sm:h-[340px] lg:h-full overflow-hidden z-0"
        >
          <div className="relative w-full h-full">
            <AnimatePresence mode="sync">
              {currentSlide && (
                <motion.div
                  key={currentSlide.url + currentSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {currentSlide.type === "video" ? (
                    <video
                      src={currentSlide.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-left"
                    />
                  ) : (
                    <Image
                      src={currentSlide.url}
                      alt={heroData.title || `Hero banner slide ${currentSlideIndex + 1}`}
                      fill
                      priority={currentSlideIndex === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-left"
                      unoptimized={Boolean(
                        currentSlide.url &&
                        (currentSlide.url.startsWith("http") ||
                          currentSlide.url.startsWith("data:"))
                      )}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-72 z-10 pointer-events-none hidden lg:block -ml-36">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 0 L 50 0 C 80 25, 90 75, 50 100 L 0 100 Z" fill="#DDD6FE" opacity="0.4" />
              <path d="M 0 0 L 50 0 C 70 25, 80 75, 50 100 L 0 100 Z" fill="#C084FC" opacity="0.25" />
              <path d="M 0 0 L 50 0 C 60 25, 70 75, 50 100 L 0 100 Z" fill="#FAFAFE" />
            </svg>
          </div>

          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAFAFE] to-transparent lg:hidden pointer-events-none z-10" />

          {slides.length > 1 && (
            <>
              <div className="absolute inset-y-0 right-4 flex items-center gap-2 pointer-events-none z-20 opacity-90 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlideIndex(
                      (prev) => (prev - 1 + slides.length) % slides.length
                    )
                  }
                  className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-violet-900 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
                  }
                  className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-violet-900 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 backdrop-blur-md">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentSlideIndex === idx
                      ? "w-6 bg-white shadow-sm"
                      : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="container-custom relative z-10 w-full mt-8 lg:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-[1.75rem] border border-violet-100/60 bg-white/95 px-6 py-4 lg:px-10 lg:py-5 shadow-[0_12px_40px_rgba(91,33,182,0.06)] backdrop-blur-md flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4 w-full"
        >
          {[
            { value: "10+", label: "Years Experience", icon: ShieldCheck },
            { value: "500+", label: "Products Delivered", icon: Microscope },
            { value: "100%", label: "Quality Assurance", icon: BadgeCheck }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-3.5 min-w-[180px] w-full md:w-auto justify-center md:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[#5B21B6] shadow-sm">
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-black text-[#5B21B6] leading-none mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500">
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
