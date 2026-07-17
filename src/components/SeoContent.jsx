export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-24 bg-gradient-to-b from-white to-violet-50">
            <div className="container-custom">

                {/* Heading */}
                <div className="max-w-4xl">

                    <span className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                        Healthcare Solutions
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1F2937] leading-tight">
                        Biomedical Equipment Supplier in{" "}
                        <span className="text-violet-700">{location}</span>
                    </h2>

                </div>

                {/* Content */}
                <div className="mt-10 space-y-6 rounded-[32px] border border-violet-100 bg-white p-8 lg:p-12 shadow-[0_20px_60px_rgba(91,33,182,0.08)]">

                    <p className="text-lg leading-8 text-slate-600">
                        Central Biomedicals is a trusted supplier of biomedical
                        and laboratory equipment in <strong className="text-violet-700">{location}</strong>.
                        We provide CBC Machines, Hematology Analyzers, Biochemistry
                        Analyzers, Urine Analyzers, ELISA Readers and diagnostic
                        instruments for hospitals, pathology labs and healthcare facilities.
                    </p>

                    <p className="text-lg leading-8 text-slate-600">
                        Our mission is to provide reliable and high-quality
                        laboratory equipment to healthcare professionals across
                        India. We work with diagnostic centres, hospitals,
                        research laboratories and medical institutions to
                        deliver advanced biomedical solutions.
                    </p>

                    <p className="text-lg leading-8 text-slate-600">
                        We offer installation assistance, product guidance and
                        technical support for a wide range of laboratory
                        instruments. Whether you are setting up a new
                        diagnostic laboratory or upgrading existing equipment,
                        our team can help you select the right solution.
                    </p>

                    <p className="text-lg leading-8 text-slate-600">
                        Central Biomedicals supplies equipment across multiple
                        districts and cities, helping healthcare providers
                        improve testing efficiency and diagnostic accuracy.
                    </p>

                </div>

                {/* FAQ */}
                <div className="mt-20">

                    <div className="mb-10">

                        <span className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700">
                            FAQs
                        </span>

                        <h2 className="text-4xl font-extrabold text-[#1F2937]">
                            Frequently Asked Questions
                        </h2>

                    </div>

                    <div className="grid gap-6">

                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Yes, we supply biomedical and laboratory equipment
                                across multiple districts and cities.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                We provide CBC Machines, Hematology Analyzers,
                                Biochemistry Analyzers, ELISA Readers, Urine
                                Analyzers and other diagnostic equipment.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Do you provide installation support?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Yes, installation assistance and technical
                                support are available depending on location
                                and equipment type.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                Hospitals, pathology labs, diagnostic centres,
                                research laboratories and healthcare facilities
                                can purchase equipment from us.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}