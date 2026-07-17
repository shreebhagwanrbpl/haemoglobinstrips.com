"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-violet-50">
      <div className="container-custom">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px] bg-gradient-to-r from-[#5B21B6] via-[#6D28D9] to-[#8B5CF6] p-10 lg:p-20 text-white shadow-[0_25px_80px_rgba(91,33,182,0.25)]"
        >

          {/* Background Blur */}
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />
          <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-violet-300/20 blur-[120px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

            {/* Left Content */}
            <div>

              <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur-md">
                Get In Touch
              </span>

              <h2 className="text-4xl font-extrabold leading-tight lg:text-6xl">
                Need Premium Biomedical Solutions?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-violet-100">
                Discover innovative diagnostic systems and trusted biomedical
                technologies tailored for modern healthcare excellence.
              </p>

            </div>

            {/* Right Card */}
            <div className="flex lg:justify-end">

              <div className="w-full max-w-md rounded-[32px] border border-violet-100 bg-white p-8 shadow-[0_25px_60px_rgba(91,33,182,0.18)]">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <PhoneCall size={30} />
                </div>

                <h3 className="text-2xl font-bold text-[#1F2937]">
                  Let's Talk
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Contact our biomedical experts for consultation, equipment,
                  and healthcare support.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5B21B6] px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-violet-300/40">
                      Contact Us
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  <a
                    href="tel:+919876543210"
                    className="rounded-2xl border-2 border-[#5B21B6] bg-white px-6 py-4 text-center font-semibold !text-[#5B21B6] transition-all duration-300 hover:bg-[#5B21B6] hover:text-white hover:shadow-[0_15px_35px_rgba(91,33,182,0.30)]"
                  >
                    Call Now
                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}