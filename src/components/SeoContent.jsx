export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-24 bg-gradient-to-b from-white to-violet-50">
            <div className="container-custom">
                <div className="max-w-4xl">
                    <span className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                        Diagnostics Consumables
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1F2937] leading-tight">
                        Haemoglobin Test Strips & Reagents Supplier in <span className="text-violet-700">{location}</span>
                    </h2>
                </div>

                <div className="mt-10 space-y-6 rounded-[32px] border border-violet-100 bg-white p-8 lg:p-12 shadow-[0_20px_60px_rgba(91,33,182,0.08)]">
                    <p className="text-lg leading-8 text-slate-600">
                        Raj Biosis is a specialized distributor of high-accuracy haemoglobin test strips, clinical chemistry reagents, 
                        and blood glucose monitoring consumables in <strong className="text-violet-700">{location}</strong>. We supply 
                        certified test strips that guarantee high correlation with lab standard hematology analyzers.
                    </p>
                    <p>
                        Our mission is to maintain a robust and steady supply of diagnostic consumables for hospitals, pathology labs, 
                        and medical research centers. We ensure that your daily testing requirements are met with certified, high-quality batches.
                    </p>
                    <p>
                        We offer batch compatibility certificates, storage guidance, and support for all diagnostics strip integrations. 
                        Whether you need wholesale supplies of glucose strips or specific chemistry reagents, our team is equipped to support.
                    </p>
                    <p>
                        Raj Biosis distributes diagnostic strips across multiple states, ensuring medical labs can perform tests efficiently.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="mb-10">
                        <span className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700">
                            Strips & Reagents FAQ
                        </span>
                        <h2 className="text-4xl font-extrabold text-[#1F2937]">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                What is the typical shelf life of the test strips?
                            </h3>
                            <p className="mt-3 leading-7 text-slate-600">
                                Our haemoglobin and glucose test strips typically have a shelf life of 12 to 18 months. Always store them 
                                in their original sealed vials.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Are the test strips compatible with all haemoglobinometers?
                            </h3>
                            <p className="mt-3 leading-7 text-slate-600">
                                Strips are specific to their compatible meter models (such as Glucospark or specific POC meters). 
                                Please check compatibility before ordering.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Do you provide bulk purchasing discounts for pathology labs?
                            </h3>
                            <p className="mt-3 leading-7 text-slate-600">
                                Yes, we offer tier-based volume discounts for clinical laboratories, research centers, and diagnostic franchises.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
                            <h3 className="text-xl font-bold text-violet-700">
                                Do your strips comply with safety standards?
                            </h3>
                            <p className="mt-3 leading-7 text-slate-600">
                                Yes, all diagnostics strips and chemical reagents we distribute carry standard quality certifications and batch test compliance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
