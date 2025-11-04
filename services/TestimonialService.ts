import { supabase } from "../lib/supabase";
import type { Testimonial } from "../types/Testimonial";

export async function getTestimonials(courseId: string): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, quote, author, title, avatarUrl, rating")
    .eq("course_id", courseId)
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) return [];
  return (data as Testimonial[]) || [];
}
