"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

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
          doc(db, "websites", "centralbiomedicals", "pages", "home")
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

  return (
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-violet-700 shadow-sm">
            <ShieldCheck size={18} className="text-violet-600" />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-tight text-[#1F2937] sm:text-5xl lg:text-7xl">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 w-[80%] rounded-xl bg-violet-100"></div>
                <div className="h-12 w-[60%] rounded-xl bg-violet-100"></div>
                <div className="h-12 w-[70%] rounded-xl bg-violet-100"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />
                    <span className="text-2xl font-bold text-violet-600 lg:text-4xl">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="mt-7 animate-pulse space-y-3">
              <div className="h-4 w-full rounded bg-violet-100"></div>
              <div className="h-4 w-[90%] rounded bg-violet-100"></div>
              <div className="h-4 w-[75%] rounded bg-violet-100"></div>
            </div>
          ) : (
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              {heroData.description}
              {city && (
                <>
                  {" "}
                  across <strong className="text-violet-700">{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {loading ? (
              <>
                <div className="h-12 w-44 animate-pulse rounded-xl bg-violet-100"></div>
                <div className="h-12 w-36 animate-pulse rounded-xl bg-violet-100"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="group flex items-center gap-2 rounded-xl bg-[#5B21B6] px-7 py-3 font-semibold text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9]">
                    {heroData.button1Text || "Explore Services"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="rounded-xl border-2 border-violet-600 bg-white px-7 py-3 font-semibold text-violet-700 transition-all duration-300 hover:bg-violet-50 hover:text-violet-800">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-6">
            <div className="min-w-[170px] rounded-2xl border border-violet-100 bg-white px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">
              <h3 className="text-3xl font-extrabold text-violet-600">
                10+
              </h3>
              <p className="mt-1 text-slate-500">
                Years Experience
              </p>
            </div>

            <div className="min-w-[170px] rounded-2xl border border-violet-100 bg-white px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">
              <h3 className="text-3xl font-extrabold text-violet-600">
                500+
              </h3>
              <p className="mt-1 text-slate-500">
                Products Delivered
              </p>
            </div>

            <div className="min-w-[170px] rounded-2xl border border-violet-100 bg-white px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">
              <h3 className="text-3xl font-extrabold text-violet-600">
                100%
              </h3>
              <p className="mt-1 text-slate-500">
                Quality Assurance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Image Card */}
          <div className="rounded-[40px] border border-violet-100 bg-white p-6 shadow-[0_25px_60px_rgba(91,33,182,0.12)]">
            <Image
              src={CBG}
              alt="Central Biomedical"
              width={1200}
              height={900}
              className="h-[350px] w-full rounded-[28px] object-cover object-[20%_center] sm:h-[450px] lg:h-[550px]"
            />
          </div>

          {/* Floating Card 1 */}
          <div
            className="absolute -left-10 top-10 hidden items-center gap-4 rounded-3xl border border-violet-200 bg-white px-5 py-4 shadow-[0_15px_40px_rgba(91,33,182,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-violet-300/40 lg:flex"
            style={{ marginTop: "-27px" }}
          >
            <div className="rounded-2xl bg-violet-100 p-3">
              <Microscope className="text-violet-700" size={26} />
            </div>

            <div>
              <h4 className="font-bold text-[#1F2937]">
                Modern Labs
              </h4>
              <p className="text-sm text-slate-500">
                Precision Equipment
              </p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-8 bottom-10 hidden items-center gap-4 rounded-3xl border border-violet-200 bg-white px-5 py-4 shadow-[0_15px_40px_rgba(91,33,182,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-violet-300/40 lg:flex">
            <div className="rounded-2xl bg-violet-100 p-3">
              <BadgeCheck className="text-violet-700" size={26} />
            </div>

            <div>
              <h4 className="font-bold text-[#1F2937]">
                Trusted Quality
              </h4>
              <p className="text-sm text-slate-500">
                Certified Solutions
              </p>
            </div>
          </div>

          {/* Decorative Blur */}
          <div className="absolute -top-8 -right-8 -z-10 h-40 w-40 rounded-full bg-violet-300/30 blur-3xl"></div>

          <div className="absolute -bottom-10 -left-10 -z-10 h-48 w-48 rounded-full bg-purple-300/20 blur-3xl"></div>
        </motion.div>

      </div>
    </section>
  );
}