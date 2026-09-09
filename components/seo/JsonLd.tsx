import React from "react";
import { BRAND, CONTACT, SEO_CONFIG, SITE_URL } from "@/lib/constants";
import { TRANSLATIONS } from "@/lib/translations";

export function JsonLd() {
  const faqItems = TRANSLATIONS.id.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#service`,
    name: `${BRAND.name} - Jasa Pembuatan Website Custom`,
    alternateName: [BRAND.name, BRAND.fullName, "gaweb.website"],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    description: BRAND.description,
    telephone: "+62881036657944",
    email: CONTACT.email,
    priceRange: SEO_CONFIG.priceRange,
    currenciesAccepted: "IDR",
    paymentAccepted: "Bank Transfer, QRIS",
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
      postalCode: CONTACT.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -7.9666,
      longitude: 112.6326,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Indonesia",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jawa Timur",
      },
      {
        "@type": "City",
        name: "Malang",
      },
      {
        "@type": "City",
        name: "Surabaya",
      },
      {
        "@type": "City",
        name: "Jakarta",
      },
    ],
    sameAs: [
      `https://instagram.com/${CONTACT.instagram.replace("@", "")}`,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SEO_CONFIG.aggregateRating.ratingValue,
      reviewCount: SEO_CONFIG.aggregateRating.reviewCount,
      bestRating: SEO_CONFIG.aggregateRating.bestRating,
      worstRating: SEO_CONFIG.aggregateRating.worstRating,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paket Jasa Pembuatan Website Custom & Landing Page",
      itemListElement: SEO_CONFIG.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: {
            "@id": `${SITE_URL}#service`,
          },
        },
        price: service.price,
        priceCurrency: service.currency,
        availability: "https://schema.org/InStock",
        priceValidUntil: "2027-12-31",
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: `${BRAND.name} | ${BRAND.tagline}`,
    alternateName: BRAND.fullName,
    description: BRAND.description,
    inLanguage: ["id-ID", "en-US"],
    publisher: {
      "@id": `${SITE_URL}#service`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
