"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowRight
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {
    if (openedCategory === category) {
      setOpenedCategory("");
      return;
    }

    setOpenedCategory(category);
  };

  const scrollToProduct = (
    slug,
    category
  ) => {
    setOpenedCategory(category);
    setActiveCategory(category);
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-6 max-w-2xl px-4 lg:mt-10 lg:px-0">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-violet-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="h-16 w-full rounded-2xl border border-violet-100 bg-white pl-14 pr-5 text-slate-700 shadow-[0_10px_30px_rgba(91,33,182,0.08)] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
          />

        </div>
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
    self-start
    rounded-2xl lg:rounded-3xl
    border border-violet-100
    bg-white
    p-4 lg:p-6
    shadow-[0_20px_60px_rgba(91,33,182,0.08)]
    lg:sticky
    lg:top-24
  "
          >

            {/* Heading */}
            <h3 className="mb-6 text-2xl font-extrabold text-[#1F2937]">
              Categories
            </h3>

            <div className="space-y-3">

              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
                )
                .map((category) => (
                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-violet-100 transition-all duration-300 hover:border-violet-300"
                  >

                    {/* Category Button */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className={`flex w-full items-center justify-between px-5 py-4 font-semibold transition-all duration-300

              ${activeCategory === category
                          ? "bg-[#5B21B6] text-white"
                          : "bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                        }
            `}
                    >

                      <span className="flex items-center gap-3">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${activeCategory === category
                          ? "bg-white/20 text-white"
                          : "bg-violet-100 text-violet-700"
                          }`}
                      >
                        {groupedProducts[category].length}
                      </span>

                    </button>

                    {/* Products */}
                    <div
                      className={`custom-scrollbar overflow-y-auto transition-all duration-300 ${openedCategory === category
                        ? "max-h-72"
                        : "max-h-0 overflow-hidden"
                        }`}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="block w-full border-t border-violet-100 px-6 py-3 text-left text-slate-600 transition-all duration-300 hover:bg-violet-50 hover:pl-8 hover:text-violet-700"
                        >
                          {item.title}
                        </button>

                      ))}

                    </div>

                  </div>
                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="rounded-[32px] border border-violet-100 bg-white p-10 text-center shadow-[0_25px_70px_rgba(91,33,182,0.10)] lg:p-16">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-5xl transition-all duration-300 hover:scale-110 hover:bg-violet-200">
                  🔍
                </div>

                {/* Title */}
                <h2 className="text-2xl font-extrabold text-[#1F2937] lg:text-4xl">
                  Product Not Found
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                  We couldn't find any products matching
                  <span className="font-semibold text-violet-700">
                    {" "} "{productSearch}"{" "}
                  </span>
                  . Please try another keyword or browse categories.
                </p>

                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="mt-8 rounded-2xl bg-[#5B21B6] px-8 py-4 font-semibold text-white shadow-lg shadow-violet-300/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-violet-400/40"
                >
                  View All Products
                </button>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="mb-8 flex flex-col gap-3 border-b border-violet-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

                      <h2 className="text-3xl font-extrabold text-[#1F2937]">
                        {category}
                      </h2>

                      <span className="inline-flex w-fit items-center rounded-full border border-violet-200 bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                        {list.length} Products
                      </span>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8"
                        >

                          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_180px] gap-5 lg:gap-8 items-center">

                            {/* Image */}

                            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white sm:h-[220px] lg:rounded-3xl">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-100 via-violet-50 to-white" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  console.log("IMAGE ERROR:", e.currentTarget.src);
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`h-full w-full object-contain p-5 transition-all duration-500 group-hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}

                            <div>

                              {/* Product Title */}
                              <h3 className="text-2xl font-extrabold text-[#1F2937] transition-colors duration-300 hover:text-violet-700">
                                {product.title}
                              </h3>

                              {/* Description */}
                              <p className="mt-4 leading-8 text-slate-600">
                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                              </p>

                              {/* Specifications */}
                              <div className="mt-6 grid gap-4 md:grid-cols-2">

                                {/* Brand */}
                                <div className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_8px_25px_rgba(91,33,182,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                                    Brand
                                  </p>

                                  <p className="mt-2 font-bold text-[#1F2937] group-hover:text-violet-700">
                                    {product.brand || "N/A"}
                                  </p>

                                </div>

                                {/* Model */}
                                <div className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_8px_25px_rgba(91,33,182,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                                    Model
                                  </p>

                                  <p className="mt-2 font-bold text-[#1F2937] group-hover:text-violet-700">
                                    {product.model || "N/A"}
                                  </p>

                                </div>

                                {/* Instrument */}
                                <div className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_8px_25px_rgba(91,33,182,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                                    Instrument
                                  </p>

                                  <p className="mt-2 font-bold text-[#1F2937] group-hover:text-violet-700">
                                    {product.instrument || "N/A"}
                                  </p>

                                </div>

                                {/* Category */}
                                <div className="group rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_8px_25px_rgba(91,33,182,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                                    Category
                                  </p>

                                  <p className="mt-2 font-bold text-[#1F2937] group-hover:text-violet-700">
                                    {product.category}
                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* Button */}
                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                onClick={() => {
                                  console.log("CLICKED");
                                  console.log("SLUG:", product.slug);
                                  console.log(
                                    "URL:",
                                    district
                                      ? `/${district}/items/${product.slug}`
                                      : `/items/${product.slug}`
                                  );
                                }}
                                className="group inline-flex items-center gap-2 rounded-2xl bg-[#5B21B6] px-8 py-4 font-semibold !text-white shadow-[0_15px_35px_rgba(91,33,182,0.30)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-[0_20px_45px_rgba(91,33,182,0.45)] active:scale-95"
                              >
                                Get Quote

                                <ArrowRight
                                  size={18}
                                  className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-b from-white via-violet-50 to-white">

        {/* Background Blur */}
        <div className="absolute -top-10 left-0 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
        <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-purple-200/20 blur-[120px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for performance, reliability, and healthcare excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group rounded-[30px] border border-violet-100 bg-white p-8 text-center shadow-[0_15px_45px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:bg-violet-50 hover:shadow-[0_25px_60px_rgba(91,33,182,0.18)]"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-violet-100 text-violet-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-700 group-hover:text-white">

                  {item.icon}

                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#1F2937] transition-colors duration-300 group-hover:text-violet-700">

                  {item.title}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>
      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#5B21B6] text-white shadow-[0_15px_35px_rgba(91,33,182,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-[#6D28D9] hover:shadow-[0_20px_45px_rgba(91,33,182,0.45)] active:scale-95"
        >
          <ChevronUp
            size={24}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>

      )}

    </>

  );

}