import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <div className="site4-static">
      <PageBanner
        title="About Our Clinical Consumables Division Consumables"
        subtitle="Ensuring clinical diagnostics consistency with pre-calibrated test strips and chemical reagents."
      />

      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden bg-sky-50 border border-sky-100 h-[600px] flex items-center justify-center p-10 shadow-xl shadow-sky-100/40">
              <Image
                src={DDS}
                alt="Raj Biosis Test Strips Supply"
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-[26px] shadow-2xl border border-sky-100 hidden lg:block">
              <h3 className="text-3xl font-bold text-sky-700">10+</h3>
              <p className="text-slate-500">Years of Supply Leadership</p>
            </div>
          </div>

          <div>
            <SectionTitle
              badge="Who We Are"
              title="Your Diagnostics Consumables Partner"
              description="Raj Biosis specializes in supplying medical test strips, pathology consumables, rapid diagnostic kits, and laboratory chemical reagents."
            />
            <p className="mt-8 text-slate-600 leading-8">
              We distribute certified diagnostics consumables designed to meet the rigorous daily test demands of clinics, reference laboratories, and hospital blood banks.
            </p>
            <p className="mt-5 text-slate-600 leading-8">
              We recognize that medical labs cannot afford testing interruptions. That is why we focus on maintaining a high-capacity inventory of test strips, biochemistry reagents, sterile collection vials, and pipette tips from certified international manufacturers.
            </p>
            <p className="mt-5 text-slate-600 leading-8">
              Our priority is batch integrity. Every consumables lot is stored in strictly controlled warehouse environments to prevent ambient moisture contamination and guarantee maximum chemical stability.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-sky-700 font-bold text-xl mb-4 shadow-sm">✓</div>
                <h4 className="font-semibold text-lg text-slate-900">Batch Consistency</h4>
                <p className="text-slate-500 mt-2 leading-6">Pre-tested batches that preserve calibration settings on diagnostic readers.</p>
              </div>
              <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-sky-700 font-bold text-xl mb-4 shadow-sm">✓</div>
                <h4 className="font-semibold text-lg text-slate-900">Pipeline Contracts</h4>
                <p className="text-slate-500 mt-2 leading-6">Flexible monthly delivery schedules tailored to laboratory sample volumes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sky-50">
        <div className="container-custom">
          <SectionTitle
            badge="Our Approach"
            title="Consumables Flow System"
            description="Our service flow is optimized to provide secure logistics pipelines, batch validation certificates, and client storage support."
            center
          />
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-[30px] p-8 border border-sky-100 shadow-lg shadow-sky-100/40">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl font-bold mb-6">01</div>
              <h3 className="text-xl font-bold text-slate-900">Storage Quality Controls</h3>
              <p className="mt-4 text-slate-600 leading-7">Strips and clinical reagents are maintained in climate-monitored facilities to ensure standard shelf-life performance.</p>
            </div>
            <div className="bg-white rounded-[30px] p-8 border border-sky-100 shadow-lg shadow-sky-100/40">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl font-bold mb-6">02</div>
              <h3 className="text-xl font-bold text-slate-900">Certified Batch Tracking</h3>
              <p className="mt-4 text-slate-600 leading-7">We supply batch compliance certificates and calibration reference documentation with every bulk order.</p>
            </div>
            <div className="bg-white rounded-[30px] p-8 border border-sky-100 shadow-lg shadow-sky-100/40">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl font-bold mb-6">03</div>
              <h3 className="text-xl font-bold text-slate-900">Supply Pipeline Security</h3>
              <p className="mt-4 text-slate-600 leading-7">We offer standard delivery contracts, helping diagnostic franchises eliminate local supply shocks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Our Purpose"
            title="Mission & Vision"
            description="Empowering labs with consistent consumables for diagnostics certainty."
            center
          />
          <div className="grid lg:grid-cols-2 gap-8 mt-16">
            <div className="relative overflow-hidden rounded-[32px] bg-sky-700 p-10 lg:p-12 text-white">
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">Our Mission</span>
                <h3 className="text-3xl font-bold mt-6">Securing Diagnostic Supplies</h3>
                <p className="mt-6 text-sky-50 leading-8">
                  To supply clinical medical teams with batch-tested test strips and chemical reagents that reduce error margins and maintain standard testing speeds.
                </p>
              </div>
            </div>
            <div className="rounded-[32px] bg-slate-50 border border-slate-200 p-10 lg:p-12">
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">Our Vision</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-6">Supply Chain Standardization</h3>
              <p className="mt-6 text-slate-600 leading-8">
                To establish a nationwide supply framework in India where all laboratories can source reliable, climate-controlled testing materials effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle
            badge="Why Raj Biosis"
            title="Our Consumables Advantage"
            description="We deliver pre-calibrated diagnostics strips and high-purity chemical reagents backed by batch safety documents."
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { number: "01", title: "Humidity Shielding", description: "Sealed packaging protocols to ensure strips remain dry and chemically active." },
              { number: "02", title: "Safety Documents", description: "Full batch data certificates provided automatically for lab inspection files." },
              { number: "03", title: "Steady Shipments", description: "Standard recurring shipment routes designed around your lab test rates." },
              { number: "04", title: "Direct Sourcing", description: "Consumables sourced directly from trusted manufacturers to guarantee authenticity." },
            ].map((item) => (
              <div key={item.number} className="bg-white rounded-[28px] p-7 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300">
                <span className="text-sm font-bold text-sky-700">{item.number}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-4">{item.title}</h3>
                <p className="mt-4 text-slate-600 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
