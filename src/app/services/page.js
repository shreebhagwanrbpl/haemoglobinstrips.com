"use client";

import { useState, useEffect } from "react";
import { WEBSITE_ID } from "@/lib/catalog-utils";
import { db, doc, collection, getDoc, getDocs, addDoc, onSnapshot } from "@/lib/firestore-shim";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  CheckCircle2,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const icons = [
    <Microscope key="microscope" size={30} />,
    <FlaskConical key="flask" size={30} />,
    <ShieldCheck key="shield" size={30} />,
    <Stethoscope key="stetho" size={30} />,
    <Wrench key="wrench" size={30} />,
    <Activity key="activity" size={30} />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(doc(db, "websites", WEBSITE_ID, "pages", "services"));
        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-violet-50 border border-violet-200 px-5 py-2 text-sm font-semibold text-[#5B21B6]">
              Clinical Consumables Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-5 leading-tight">
              Diagnostics Consumables Supply & Bulk Distribution Services
            </h2>
            <p className="mt-7 text-lg text-slate-600 leading-8">
              We assist clinical medical teams, path labs, and research institutions in securing batch-tested hemoglobin test strips, chemistry reagents, and diagnostic consumables. We ensure compliance with laboratory storage protocols.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-[#FAFAFE] to-white">
        <div className="container-custom">
          <SectionTitle
            badge="What We Offer"
            title="Consumables Flow Management"
            description="From recurring shipment schedules to batch verification certificates, we provide comprehensive laboratory supply support."
            center
          />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-[30px] p-10 border border-violet-100 shadow-sm animate-pulse">
                  <div className="w-20 h-20 rounded-3xl bg-violet-100 mb-8" />
                  <div className="h-8 bg-slate-200 rounded mb-6" />
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded" />
                    <div className="h-4 bg-slate-200 rounded w-11/12" />
                  </div>
                </div>
              ))
              : services.length > 0
                ? services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={icons[index % icons.length]}
                    title={service.title}
                    description={service.desc}
                  />
                ))
                : (
                  <div className="lg:col-span-3 text-center py-16">
                    <p className="text-slate-500">No services currently configured.</p>
                  </div>
                )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex rounded-full bg-violet-50 border border-violet-200 px-5 py-2 text-sm font-semibold text-[#5B21B6]">
                Logistics Focus
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-5">
                Batch Calibration & Temperature Monitored Delivery
              </h2>
              <p className="mt-6 text-slate-600 leading-8">
                Chemical reagents and test strips are highly sensitive to thermal changes and humidity. Our logistics pipeline guarantees that all materials are dispatched in controlled packaging and accompanied by full batch test records for seamless lab calibration.
              </p>
            </div>
            <div className="bg-violet-50/60 rounded-[35px] p-8 lg:p-10 border border-violet-100">
              <h3 className="text-2xl font-bold text-slate-900">Supply Deliverables</h3>
              <div className="space-y-5 mt-8">
                {[
                  "Bulk supply of pre-calibrated haemoglobin and glucose test strips.",
                  "Climate-controlled courier delivery options for reagents.",
                  "Batch verification documents for quality inspections.",
                  "Storage guidelines and vial safety reviews.",
                  "Technical advisory for diagnostic code verification.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-[#5B21B6] flex-shrink-0 mt-1" />
                    <p className="text-slate-600 leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="Logistics FAQs"
            title="Consumables Operations & Logistics FAQ"
            description="Have questions about reagent shelf life or delivery schedules? Read answers from our logistics manager."
            center
          />
          <div className="max-w-4xl mx-auto mt-12 space-y-5">
            {[
              {
                q: "How are the chemical reagents shipped?",
                a: "Reagents are packaged in thermal-insulated containers with cooling gel packs to prevent structural changes during transit.",
              },
              {
                q: "What is your batch calibration protocol?",
                a: "Every shipment is accompanied by specific calibration values or code keys to program your diagnostic meters.",
              },
              {
                q: "Do you supply sterile collection tubes in bulk?",
                a: "Yes, we distribute EDTA and serum collection tubes in bulk alongside our standard test strip range.",
              },
              {
                q: "Can we schedule automatic monthly shipments?",
                a: "Yes, we set up standing purchase agreements to deliver fresh consumables batches automatically based on your lab test volumes.",
              },
            ].map((item) => (
              <details key={item.q} className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-200 transition-colors">
                <summary className="cursor-pointer list-none font-semibold text-lg text-slate-900 flex items-center justify-between gap-5">
                  <span>{item.q}</span>
                  <span className="text-[#5B21B6] text-2xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <p className="text-slate-600 leading-7 mt-4 pr-8">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
