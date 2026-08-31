"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Clock3 } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function ContactClient({ contactInfo = [], districtData = null }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Enter valid email");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error("Enter valid mobile number");
    }

    if (!form.message.trim()) {
      return toast.error("Message is required");
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(db, "websitesQueries", "haemoglobinstripscom", "contactQueries"),
        {
          ...form,
          createdAt: new Date(),
        }
      );

      toast.success("Message submitted successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const getContactField = (labels) => {
    const found = contactInfo.find((x) =>
      labels.some((l) => x.label?.toLowerCase() === l.toLowerCase())
    );
    return found ? found.value : "";
  };

  const phoneVal = getContactField(["phone", "phone number", "mobile", "mobile number"]);
  const emailVal = getContactField(["email", "email address"]);
  const addressVal = getContactField(["address", "office address", "address/office address"]);
  const hoursVal = getContactField(["working hours", "hours", "timing", "timings"]);

  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : addressVal || "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021";

  const mapAddress = encodeURIComponent(dynamicAddress);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14">
          {/* Left Info */}
          <div>
            <span className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 font-semibold text-violet-700 shadow-sm">
              Contact Information
            </span>

            <h2 className="section-title text-[#1F2937]">
              Let's Start a Conversation
            </h2>

            <p className="section-subtitle">
              Reach out to us for healthcare consultation, biomedical products, and advanced diagnostic support.
            </p>

            <div className="mt-10 space-y-6">
              {/* Phone */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-300 group-hover:bg-violet-700 group-hover:text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1F2937] group-hover:text-violet-700 transition-colors">
                    Mobile Contact
                  </h4>
                  <div className="mt-2 text-slate-600 space-y-1">
                    {String(phoneVal || "+91 9983123469\n+91 9983333489")
                      .split(/[\n,]+/)
                      .map((num, i) => {
                        const trimmed = num.trim();
                        return trimmed ? (
                          <span key={i} className="block hover:text-violet-700 transition-colors">
                            {trimmed}
                          </span>
                        ) : null;
                      })}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-300 group-hover:bg-violet-700 group-hover:text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1F2937] group-hover:text-violet-700 transition-colors">
                    Professional Email
                  </h4>
                  <p className="mt-2 text-slate-600">
                    {emailVal || "rajbiosis@yahoo.in"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-300 group-hover:bg-violet-700 group-hover:text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1F2937] group-hover:text-violet-700 transition-colors">
                    Office Address
                  </h4>
                  <p className="mt-2 text-slate-600">{dynamicAddress}</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group flex items-start gap-5 rounded-[28px] border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-300 group-hover:bg-violet-700 group-hover:text-white">
                  <Clock3 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1F2937] group-hover:text-violet-700 transition-colors">
                    Working Hours
                  </h4>
                  <p className="mt-2 text-slate-600">
                    {hoursVal || "10:00 AM - 06:00 PM (Mon - Sat)"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-[40px] border border-violet-100 bg-white p-8 shadow-[0_25px_70px_rgba(91,33,182,0.10)] lg:p-10">
            <h3 className="text-3xl font-extrabold text-[#1F2937]">
              Plan Your Consumables Requirement
            </h3>
            <p className="mt-3 text-slate-500">
              Fill out the form and our team will contact you soon.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

              <input
                type="email"
                name="email"
                placeholder="Professional Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Contact"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

              <input
                type="text"
                name="subject"
                placeholder="Laboratory Requirement"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

              <textarea
                rows={5}
                name="message"
                placeholder="Outline your laboratory requirement"
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-[#5B21B6] py-4 font-semibold text-white shadow-lg shadow-violet-300/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-violet-400/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="rounded-[40px] overflow-hidden border border-slate-100 card-shadow">
            <iframe
              src={`https://maps.google.com/maps?q=${mapAddress}&z=13&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
