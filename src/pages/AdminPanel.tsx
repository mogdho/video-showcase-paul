import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { LogOut, Home, Video, User, BarChart3, Sparkles, MessageSquare, Link } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoManager from "@/components/admin/VideoManager";
import ShowreelManager from "@/components/admin/ShowreelManager";
import HeroManager from "@/components/admin/HeroManager";
import StatsManager from "@/components/admin/StatsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import LinksManager from "@/components/admin/LinksManager";

const ALLOWED_ADMIN_EMAIL = "mogdhapal@gmail.com";

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === ALLOWED_ADMIN_EMAIL) {
        setAuthed(true);
      } else if (session) {
        await supabase.auth.signOut();
        setAuthed(false);
      } else {
        setAuthed(false);
      }
      setLoading(false);
    };
    check();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (email.trim().toLowerCase() !== ALLOWED_ADMIN_EMAIL) {
      setError("Access denied.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid credentials.");
      setSubmitting(false);
    } else {
      setAuthed(true);
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
    setEmail("");
    setPassword("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <h1 className="text-3xl font-display text-gradient-gold text-center mb-8 tracking-wider">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-display text-gradient-gold tracking-wider">Content Manager</h1>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="w-full flex flex-wrap gap-1 bg-card border border-border rounded-xl p-1 h-auto">
            <TabsTrigger value="hero" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="showreel" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Showreel</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Link className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Links</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero"><HeroManager /></TabsContent>
          <TabsContent value="stats"><StatsManager /></TabsContent>
          <TabsContent value="skills"><SkillsManager /></TabsContent>
          <TabsContent value="showreel"><ShowreelManager /></TabsContent>
          <TabsContent value="videos"><VideoManager /></TabsContent>
          <TabsContent value="reviews"><ReviewsManager /></TabsContent>
          <TabsContent value="links"><LinksManager /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
