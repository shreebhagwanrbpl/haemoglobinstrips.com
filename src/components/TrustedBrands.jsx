export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden border-y border-violet-100 bg-gradient-to-b from-violet-50 via-white to-violet-50 py-16">

      {/* Background Blur */}
      <div className="absolute -left-10 top-0 h-60 w-60 rounded-full bg-violet-200/20 blur-[120px]" />
      <div className="absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-purple-200/20 blur-[120px]" />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="text-center">

          <span className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            Trusted Partners
          </span>

          <p className="text-lg font-medium text-slate-600">
            Trusted by Healthcare & Biomedical Organizations
          </p>

        </div>

        {/* Brand Cards */}
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (
            <div
              key={index}
              className="group flex h-28 items-center justify-center rounded-3xl border border-violet-100 bg-white px-6 text-center font-bold text-[#1F2937] shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:bg-violet-700 hover:text-white hover:shadow-[0_20px_50px_rgba(91,33,182,0.18)]"
            >
              {brand}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}