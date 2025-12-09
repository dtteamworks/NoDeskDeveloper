import DeveloperDetailClient from "@/components/Developer/DeveloperDetailClient";
import { API_BASE } from "@/lib/api";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const res = await fetch(`${API_BASE}/developer/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Developer Not Found" };
    }

    const { success, data: developer } = await res.json();

    if (!success || !developer) {
      return { title: "Developer Not Found | Nodesk Developer" };
    }

    // Clean title & description
    const title = `${developer?.name} - ${developer?.level} Developer`;
  
    // Developer photo as image (agar nahi hai to fallback)
    const ogImage = developer?.photo || "/dev.webp";

    return {
      title,
      openGraph: {
        title,
        url: `https://www.nodeskdeveloper.com/developers/${id}`,
        siteName: "Nodesk Developer",
        images: [ogImage],
      },

      twitter: {
        card: "summary_large_image",
        title,
        images: [ogImage],
      },

     
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Loading... | Nodesk Developer",
    };
  }
}

const DeveloperDetailPage = () => {
  return (
    <>
      <DeveloperDetailClient />
    </>
  );
};

export default DeveloperDetailPage;
