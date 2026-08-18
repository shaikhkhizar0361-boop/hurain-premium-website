// ======================================================
// HURAIN — SUPABASE CONFIG
// This key is the public "anon" key — it is SAFE to expose
// in client-side code. Row Level Security policies on the
// database control what it can actually read/write.
// Never put the service_role key here or anywhere in this site.
// ======================================================

const SUPABASE_URL = "https://tvrikpsmmetfatpnregx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2cmlrcHNtbWV0ZmF0cG5yZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MzUwMjgsImV4cCI6MjEwMjAxMTAyOH0.haP9NYslrwaj29kmy1R-QpcZ2virhMr8J2K32RwvH8c";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
