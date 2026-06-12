import { defaultContent, type SiteContent } from "@/config/defaultContent";
import { supabase } from "@/lib/supabaseClient";

type AnyObject = Record<string, unknown>;

function isObject(value: unknown): value is AnyObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isObject(base) || !isObject(override)) {
    return (override ?? base) as T;
  }

  const result: AnyObject = { ...(base as AnyObject) };

  for (const key of Object.keys(override)) {
    const baseValue = (base as AnyObject)[key];
    const overrideValue = override[key];

    if (overrideValue === null || overrideValue === undefined) {
      continue;
    }

    if (isObject(baseValue) && isObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
}

export async function getSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data?.content) {
    console.warn("No se pudo cargar contenido desde Supabase:", error);
    return defaultContent;
  }

  return deepMerge(defaultContent, data.content);
}