"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-violet-50 via-white to-violet-50">

      {/* Background Blur */}
      <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
      <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <div className="rounded-[40px] border border-violet-100 bg-white p-10 shadow-[0_25px_70px_rgba(91,33,182,0.08)] lg:p-16">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
                className="group rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-violet-50"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-violet-100 text-violet-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-700 group-hover:text-white">
                  {item.icon}
                </div>

                {/* Number */}
                <h3 className="text-4xl font-extrabold text-violet-700 lg:text-5xl">
                  {item.number}
                </h3>

                {/* Label */}
                <p className="mt-3 text-lg text-slate-600">
                  {item.label}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}