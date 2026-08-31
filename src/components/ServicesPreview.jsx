"use client";
import { motion } from "framer-motion";
import { Microscope, FlaskConical, ShieldCheck, Stethoscope } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Strip Distribution",
      description: "Bulk distribution of haemoglobin, glucose, and rapid diagnostics strips.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Clinical Chemistry Reagents",
      description: "Supply of standard biochemistry diagnostic reagents and test kits.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Quality Certificates",
      description: "Full safety validation documents for each shipped test consumables batch.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Pipeline Management",
      description: "Customized recurring contract delivery to maintain diagnostic lab schedules.",
    },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionTitle
          badge="Clinical Consumables Services"
          title="Clinical Consumables Distribution & Pipeline Support"
          description="Ensuring modern labs and diagnostics departments access a continuous flow of high-quality testing materials."
          center
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
