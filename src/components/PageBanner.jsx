"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 py-28 lg:py-36">

      {/* Background Blur */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-violet-300/30 blur-[120px]" />

      <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-purple-300/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-4xl text-center"
        >

          {/* Badge (Optional) */}
          <span className="mb-6 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            Raj Biosis
          </span>

          {/* Title */}
          <h1 className="text-5xl font-extrabold leading-tight text-[#1F2937] lg:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {subtitle}
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 to-purple-500"></div>

        </motion.div>

      </div>

    </section>
  );
}