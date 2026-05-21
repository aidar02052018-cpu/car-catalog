import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Supabase credentials are missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
  );
}

export const supabase = createClient(url, key);

export type LeadKind = "contact" | "test_drive" | "purchase";

export type LeadPayload = {
  kind: LeadKind;
  name: string;
  phone: string;
  message?: string;
  car_id?: string;
  car_name?: string;
  config?: Record<string, unknown>;
  total_price?: number;
};
