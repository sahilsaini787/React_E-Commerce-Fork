import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://your-supabase-url.supabase.co"; // Replace with your actual Supabase URL
const SUPABASE_ANON_KEY = "your-anon-key"; // Replace with your Supabase anon key

export const supabase = createClient(process.env.REACT_APP_URL, process.env.REACT_APP_API_KEY);
