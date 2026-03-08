-- Site Settings table (for hero section content)
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Stats table
CREATE TABLE public.stats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    label text NOT NULL,
    value text NOT NULL,
    icon text NOT NULL DEFAULT 'star',
    sort_order integer NOT NULL DEFAULT 0,
    section text NOT NULL DEFAULT 'hero',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Skills table
CREATE TABLE public.skills (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    level integer NOT NULL DEFAULT 80,
    tier text NOT NULL DEFAULT 'Advanced',
    icon text NOT NULL DEFAULT 'Palette',
    description text,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    role text NOT NULL,
    text text NOT NULL,
    stars integer NOT NULL DEFAULT 5,
    avatar_url text,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Social Links table
CREATE TABLE public.social_links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    platform text NOT NULL,
    url text NOT NULL,
    icon text,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.social_links FOR SELECT USING (true);

-- Authenticated user write access
CREATE POLICY "Authenticated insert" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.site_settings FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert" ON public.stats FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.stats FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.stats FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert" ON public.skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.skills FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert" ON public.reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.reviews FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert" ON public.social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.social_links FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.social_links FOR DELETE TO authenticated USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_updated_at BEFORE UPDATE ON public.stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();