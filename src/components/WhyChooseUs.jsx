"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">

      {/* Background Blur */}
      <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
      <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Us"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies and biomedical solutions with precision, trust, and unmatched service quality."
          center
        />

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="group rounded-[30px] border border-violet-100 bg-white p-8 shadow-[0_15px_45px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_25px_60px_rgba(91,33,182,0.18)]"
            >

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-700 group-hover:text-white">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-[#1F2937] transition-colors duration-300 group-hover:text-violet-700">
                {item.title}
              </h3>

              {/* Description */}
              <p className="leading-7 text-slate-600">
                {item.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}