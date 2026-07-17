export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""
        } max-w-3xl`}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-5 inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl font-extrabold leading-tight text-[#1F2937] md:text-5xl">
        {title}
      </h2>

      {/* Decorative Line */}
      <div
        className={`mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-violet-700 to-purple-500 ${center ? "mx-auto" : ""
          }`}
      />

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}