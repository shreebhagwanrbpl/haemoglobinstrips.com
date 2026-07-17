"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const pathname = usePathname();

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {

                // NORMAL PRODUCTS
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "products"
                    )
                );

                let allProducts = [];

                if (snap.exists()) {
                    allProducts = (snap.data().products || []).map((item) => ({
                        ...item,
                        slug:
                            item.slug ||
                            item.productSlug ||
                            makeSlug(item.title),
                    }));
                }

                // CATEGORY PRODUCTS
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

                categorySnap.forEach((docSnap) => {
                    const data = docSnap.data();

                    if (data.products?.length) {
                        allProducts.push(
                            ...(data.products || []).map((item) => ({
                                ...item,
                                slug:
                                    item.slug ||
                                    item.productSlug ||
                                    makeSlug(item.title),
                            }))
                        );
                    }
                });

                const found = allProducts.find(
                    (p) => p.slug === slug
                );
                console.log("URL SLUG:", slug);

                allProducts.forEach((p) => {
                    console.log("PRODUCT:", p.title);
                    console.log("PRODUCT SLUG:", p.slug);
                });
                console.log("SLUG FROM URL:", slug);
                console.log(
                    "TOTAL PRODUCTS:",
                    allProducts.length
                );
                console.log(
                    "FOUND PRODUCT:",
                    found
                );

                setProduct(found || null);

                if (found) {

                    if (
                        found.images?.length > 0
                    ) {
                        setSelectedImage(
                            found.images[0]
                        );
                    } else {
                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "centralbiomedicals",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Central Biomedicals",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200 animate-pulse" />

                        <div>
                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl animate-pulse mb-8" />

                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-16 grid lg:grid-cols-[600px_1fr] gap-8">

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-14 bg-slate-200 rounded-2xl animate-pulse mb-4"
                                />
                            ))}
                        </div>

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-sm">
                            <div className="h-10 w-60 bg-slate-200 rounded-lg animate-pulse mb-6" />

                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500">
                    Home / Products / {product.title}
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div>

                        {/* Main Preview */}
                        <div className="relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] overflow-hidden rounded-[24px] md:rounded-[36px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-purple-50 shadow-[0_25px_80px_rgba(91,33,182,0.12)]">

                            {selectedMedia === "video" && product.video ? (

                                <video
                                    controls
                                    autoPlay
                                    className="h-full w-full object-contain p-6"
                                >
                                    <source
                                        src={product.video}
                                        type="video/mp4"
                                    />
                                </video>

                            ) : (

                                <>
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-100 via-violet-50 to-white" />
                                    )}

                                    <Image
                                        src={selectedImage || product.image}
                                        alt={product.title}
                                        fill
                                        priority
                                        onLoad={() => setImageLoaded(true)}
                                        className={`object-contain p-4 transition-all duration-500 ${imageLoaded
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                </>

                            )}

                        </div>

                        {/* Gallery */}
                        <div className="mt-5 flex flex-wrap gap-3">

                            {(product.images?.length
                                ? product.images
                                : [product.image]
                            ).map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setSelectedMedia("image");
                                    }}
                                    className={`group h-20 w-20 overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedMedia === "image" &&
                                        selectedImage === img
                                        ? "border-violet-600 shadow-violet-300/40"
                                        : "border-violet-100 hover:border-violet-300"
                                        }`}
                                >

                                    <Image
                                        src={img}
                                        alt=""
                                        width={80}
                                        height={80}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />

                                </button>

                            ))}

                            {/* Video */}
                            {product.video && (

                                <button
                                    onClick={() => setSelectedMedia("video")}
                                    className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedMedia === "video"
                                        ? "border-violet-600 bg-violet-50 text-violet-700"
                                        : "border-violet-100 hover:border-violet-300"
                                        }`}
                                >

                                    <FaPlay size={20} />

                                    <span className="mt-1 text-xs font-medium">
                                        Video
                                    </span>

                                </button>

                            )}

                            {/* PDF */}
                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-violet-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-lg"
                                >

                                    <span className="text-2xl">
                                        📄
                                    </span>

                                    <span className="text-xs font-medium text-violet-700">
                                        PDF
                                    </span>

                                </a>

                            )}

                        </div>

                    </div>

                    {/* Product Details */}
                    <div>

                        {/* Product Header */}
                        <div className="relative flex items-start justify-between gap-4">

                            <h1 className="text-2xl font-extrabold leading-tight text-[#1F2937] sm:text-3xl md:text-4xl lg:text-5xl">
                                {product.title}
                            </h1>

                            {/* Share */}
                            <div
                                ref={shareRef}
                                className="relative"
                            >

                                <button
                                    onClick={handleNativeShare}
                                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-violet-100 bg-white text-violet-700 shadow-[0_10px_25px_rgba(91,33,182,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-700 hover:text-white"
                                >
                                    <FaShareAlt
                                        size={18}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                </button>

                                {showShare && (

                                    <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_20px_60px_rgba(91,33,182,0.15)]">

                                        <button
                                            onClick={handleCopy}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-violet-50"
                                        >
                                            <FaLink className="text-violet-600" />
                                            Copy Link
                                        </button>

                                        <button
                                            onClick={handleWhatsapp}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-violet-50"
                                        >
                                            <FaWhatsapp className="text-green-600" />
                                            WhatsApp
                                        </button>

                                        <button
                                            onClick={handleFacebook}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-violet-50"
                                        >
                                            <FaFacebook className="text-blue-600" />
                                            Facebook
                                        </button>

                                        <button
                                            onClick={handleInstagram}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-violet-50"
                                        >
                                            <FaInstagram className="text-pink-600" />
                                            Instagram
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                        {/* Specifications */}
                        <div className="mt-8 rounded-[30px] border border-violet-100 bg-white p-6 md:p-8 shadow-[0_25px_70px_rgba(91,33,182,0.10)]">

                            <div className="grid gap-5 sm:grid-cols-2">

                                {[
                                    ["Brand", product.brand],
                                    ["Model", product.model],
                                    ["Instrument", product.instrument],
                                    ["Capacity", product.capacity],
                                    ["Throughput", product.throughput],
                                    ["Usage", product.usage],
                                    ["Automation", product.automation],
                                    ["Availability", product.availability],
                                ].map(([label, value], index) => (

                                    <div
                                        key={index}
                                        className="group rounded-2xl border border-violet-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50"
                                    >

                                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                                            {label}
                                        </p>

                                        <p className="mt-2 font-bold text-[#1F2937] group-hover:text-violet-700">
                                            {value || "N/A"}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div className="h-fit rounded-[24px] border border-violet-100 bg-white p-5 shadow-[0_25px_70px_rgba(91,33,182,0.10)] lg:sticky lg:top-24 md:rounded-[32px] sm:p-6 md:p-8">

                            <h2 className="mb-2 text-2xl font-extrabold text-[#1F2937] md:text-3xl">
                                Request A Quote
                            </h2>

                            <p className="mb-8 text-slate-500">
                                Product:
                                <span className="ml-2 rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">
                                    {product.title}
                                </span>
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Name */}
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                                />

                                {/* Email */}
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-2xl border border-violet-100 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                                />

                                {/* Phone */}
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
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

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full rounded-2xl bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] py-4 font-semibold text-white shadow-[0_15px_35px_rgba(91,33,182,0.30)] transition-all duration-300 hover:-translate-y-1 hover:from-[#6D28D9] hover:to-[#8B5CF6] hover:shadow-[0_20px_45px_rgba(91,33,182,0.40)] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {submitting ? "Submitting..." : "Get Quote"}
                                </button>

                            </form>

                        </div>
                        {/* Description */}

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                            {/* Product Description */}

                            <div className="rounded-[32px] border border-violet-100 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(91,33,182,0.08)]">

                                <h3 className="mb-6 text-2xl font-extrabold text-[#1F2937] md:text-3xl">
                                    Product Description
                                </h3>

                                <p className="text-base leading-8 text-slate-600 md:text-lg md:leading-9">
                                    {product.desc ||
                                        product.description ||
                                        "No description available."}
                                </p>

                                {/* Specifications */}

                                <div className="mt-10 overflow-x-auto">

                                    <table className="w-full overflow-hidden rounded-2xl border border-violet-100">

                                        <tbody>

                                            {[
                                                ["Brand", product.brand],
                                                ["Model", product.model],
                                                ["Usage", product.usage],
                                                ["Automation", product.automation],
                                                ["Capacity", product.capacity],
                                                ["Throughput", product.throughput],
                                            ].map(([label, value], index) => (

                                                <tr
                                                    key={index}
                                                    className="transition-colors duration-300 hover:bg-violet-50"
                                                >

                                                    <td className="w-1/3 border-b border-r border-violet-100 bg-violet-50 px-5 py-4 font-bold text-violet-700">

                                                        {label}

                                                    </td>

                                                    <td className="border-b border-violet-100 px-5 py-4 text-slate-700">

                                                        {value || "N/A"}

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </div>
                            {/* SEO Content */}

                            <div className="mt-12 space-y-8">

                                {[
                                    {
                                        title: `Why Choose Central Biomedicals in ${cityName}?`,
                                        content: `Central Biomedicals is a trusted supplier and distributor of ${product.title} in ${cityName}. We provide high-quality biomedical and laboratory equipment for hospitals, pathology laboratories, diagnostic centres and healthcare facilities.`,
                                    },
                                    {
                                        title: `Features of ${product.title}`,
                                        content: `${product.title} offers reliable performance, accurate results, easy operation, long service life and efficient workflow for laboratories and hospitals.`,
                                    },
                                    {
                                        title: `Applications of ${product.title}`,
                                        content: `Widely used in hospitals, pathology labs, diagnostic centres, blood banks, research institutes and healthcare facilities.`,
                                    },
                                    {
                                        title: `${product.title} Supplier in ${cityName}`,
                                        content: `Central Biomedicals supplies ${product.title} in ${cityName} with technical support, installation assistance and customer service for hospitals and laboratories.`,
                                    },
                                    {
                                        title: `${product.title} Dealer in ${cityName}`,
                                        content: `Central Biomedials is a trusted dealer of ${product.title} in ${cityName}. We supply biomedical equipment, laboratory instruments, diagnostic analyzers and healthcare devices to hospitals, pathology labs and research centres.`,
                                    },
                                    {
                                        title: `${product.title} Distributor in ${cityName}`,
                                        content: `Looking for a reliable distributor of ${product.title} in ${cityName}? We provide installation support, product guidance, maintenance assistance and fast delivery.`,
                                    },
                                    {
                                        title: `Buy ${product.title} in ${cityName}`,
                                        content: `Buy high quality ${product.title} in ${cityName} at competitive prices. Contact Central Biomedicals for the latest quotation and product availability.`,
                                    },
                                    {
                                        title: `${product.title} Price in ${cityName}`,
                                        content: `The price of ${product.title} depends on brand, model, specifications and features. Contact our team for the latest pricing, availability and delivery details.`,
                                    },
                                ].map((item, index) => (

                                    <div
                                        key={index}
                                        className="group rounded-[28px] border border-violet-100 bg-white p-6 md:p-8 shadow-[0_15px_45px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-[0_20px_60px_rgba(91,33,182,0.15)]"
                                    >

                                        <h3 className="mb-4 text-2xl font-extrabold text-[#1F2937] transition-colors duration-300 group-hover:text-violet-700">
                                            {item.title}
                                        </h3>

                                        <p className="leading-8 text-slate-600">
                                            {item.content}
                                        </p>

                                    </div>

                                ))}

                            </div>

                            {/* FAQ Section */}

                            <div className="mt-12">

                                <h3 className="mb-8 text-2xl font-extrabold text-[#1F2937] md:text-3xl">
                                    Frequently Asked Questions
                                </h3>

                                <div className="space-y-5">

                                    {[
                                        {
                                            question: `What is ${product.title} used for in ${cityName}?`,
                                            answer: `${product.title} is commonly used in hospitals, pathology laboratories and diagnostic centres.`,
                                        },
                                        {
                                            question: `What is the price of ${product.title} in ${cityName}?`,
                                            answer: `Pricing depends on specifications, brand and model. Contact us for a quotation.`,
                                        },
                                        {
                                            question: `Are you an authorized supplier of ${product.title}?`,
                                            answer: `We supply genuine biomedical and laboratory equipment from trusted brands.`,
                                        },
                                        {
                                            question: `Can hospitals in ${cityName} order this product?`,
                                            answer: `Yes, hospitals, pathology laboratories, diagnostic centres and healthcare facilities can order this product.`,
                                        },
                                        {
                                            question: `Do you provide installation support?`,
                                            answer: `Yes, installation and technical support are available depending on the product.`,
                                        },
                                        {
                                            question: `Can I request a quotation?`,
                                            answer: `Yes, you can submit the enquiry form on this page to receive pricing and product information.`,
                                        },
                                        {
                                            question: `Do you provide warranty?`,
                                            answer: `Warranty depends on the manufacturer and product model.`,
                                        },
                                        {
                                            question: `Do you deliver across India?`,
                                            answer: `Yes, we supply products across India with safe packaging and logistics support.`,
                                        },
                                        {
                                            question: `How can I contact Central Biomedicals?`,
                                            answer: `You can fill out the enquiry form or contact our team directly for product details and quotations.`,
                                        },
                                    ].map((faq, index) => (

                                        <div
                                            key={index}
                                            className="group rounded-[24px] border border-violet-100 bg-white p-6 shadow-[0_12px_35px_rgba(91,33,182,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:shadow-[0_20px_50px_rgba(91,33,182,0.15)]"
                                        >

                                            <div className="mb-3 flex items-start gap-4">

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700 transition-all duration-300 group-hover:bg-violet-700 group-hover:text-white">
                                                    ?
                                                </div>

                                                <h4 className="pt-1 text-lg font-bold text-[#1F2937] transition-colors duration-300 group-hover:text-violet-700">
                                                    {faq.question}
                                                </h4>

                                            </div>

                                            <p className="pl-14 leading-8 text-slate-600">
                                                {faq.answer}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}