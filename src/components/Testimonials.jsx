"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Specialist",
      review:
        "Central Biomedicals has consistently delivered reliable diagnostic equipment with outstanding support.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Professional service, premium products, and excellent biomedical consultation experience.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "Their healthcare solutions improved our laboratory efficiency significantly.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">

      {/* Background Blur */}
      <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
      <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Trusted by healthcare professionals, laboratories, and biomedical institutions."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (
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
              className="group rounded-[32px] border border-violet-100 bg-white p-8 shadow-[0_15px_45px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_25px_60px_rgba(91,33,182,0.18)]"
            >

              {/* Quote Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl font-bold text-violet-700 transition-all duration-300 group-hover:bg-violet-700 group-hover:text-white">
                “
              </div>

              {/* Stars */}
              <div className="mb-5 flex gap-1 text-lg text-yellow-400">
                ★★★★★
              </div>

              {/* Review */}
              <p className="leading-8 italic text-slate-600">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-violet-100"></div>

              {/* User */}
              <div>
                <h4 className="text-lg font-bold text-[#1F2937] group-hover:text-violet-700 transition-colors">
                  {item.name}
                </h4>

                <p className="mt-1 text-slate-500">
                  {item.role}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}