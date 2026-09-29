"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Microscope, HeartPulse, BadgeCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Batch Calibration",
      description: "Pre-calibrated strip batches designed for precise readouts on compatible diagnostic hardware.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Certified Integrity",
      description: "Hermetically sealed vials protecting strips from ambient humidity and degradation.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Consistent Supply",
      description: "A secure inventory pipeline to ensure hospital labs never face strip shortages.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Technical Advisory",
      description: "Guidance on choosing the right reagent kits and troubleshooting meter calibration codes.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="Why Laboratories Source From Us"
          title="Engineered Consumables Quality"
          description="We deliver high-fidelity diagnostics strips and rapid test kits to maintain lab efficiency and measurement accuracy."
          center
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-[28px] border border-slate-100 hover:border-violet-200 hover:-translate-y-2 transition-all duration-300 card-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-violet-100 text-[#5B21B6] flex items-center justify-center mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-7">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
