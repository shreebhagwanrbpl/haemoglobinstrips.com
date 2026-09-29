"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "R. K. Mehra",
      role: "Lead Lab Tech",
      review: "Raj Biosis is our go-to partner for haemoglobin test strips. We haven't faced a single supply delay in two years.",
    },
    {
      name: "Anjali Gupta",
      role: "Diagnostics Manager",
      review: "The batch consistency of their biochemistry reagents and strips is exceptional. Keeps our calibration runs perfectly stable.",
    },
    {
      name: "Dr. Vikram Singh",
      role: "Research Officer",
      review: "Their rapid test kits and clinical consumables help us execute large-scale blood screening campaigns successfully.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="Testimonials"
          title="What Lab Managers Say"
          description="Pathology labs and diagnostic professionals talk about their consumables pipeline experience."
          center
        />
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 card-shadow"
            >
              <div className="flex gap-1 text-yellow-400 text-xl mb-5">★★★★★</div>
              <p className="text-slate-600 leading-8 italic">&ldquo;{item.review}&rdquo;</p>
              <div className="mt-8">
                <h4 className="font-semibold text-lg">{item.name}</h4>
                <p className="text-slate-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
