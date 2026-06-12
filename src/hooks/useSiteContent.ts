"use client";

import { useEffect, useState } from "react";
import { defaultContent, type SiteContent } from "@/config/defaultContent";
import { getSiteContent } from "@/lib/siteContent";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const data = await getSiteContent();

        if (active) {
          setContent(data);
        }
      } catch (error) {
        console.error("Error cargando contenido del sitio:", error);

        if (active) {
          setContent(defaultContent);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      active = false;
    };
  }, []);

  return { content, loading };
}