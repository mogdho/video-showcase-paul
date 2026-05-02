import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload, Plus, Trash2 } from "lucide-react";
import { parseHeroTags, tagIconNames, tagIconMap, defaultHeroTags, type HeroTag } from "@/lib/heroTags";
import { Sparkles } from "lucide-react";

type SiteSettings = Record<string, string>;

const HeroManager = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    hero_name: "Mogdho Paul",
    hero_title: "Video Editor & Motion Designer",
    hero_location: "Brahmanbaria, Bangladesh",
    hero_bio: "With 5+ years of experience in video editing, I specialize in creating engaging content for YouTube creators, brands, and businesses. From dynamic cuts to seamless transitions, I bring your vision to life.",
    contact_email: "mogdhapal@gmail.com",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [tags, setTags] = useState<HeroTag[]>(defaultHeroTags);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    if (data && data.length > 0) {
      const settingsMap: SiteSettings = {};
      data.forEach((row) => {
        if (row.value) settingsMap[row.key] = row.value;
      });
      setSettings((prev) => ({ ...prev, ...settingsMap }));
      if (settingsMap.profile_photo_url) {
        setProfilePreview(settingsMap.profile_photo_url);
      }
      setTags(parseHeroTags(settingsMap.hero_tags));
    }
    setLoading(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let profileUrl = settings.profile_photo_url;
      
      if (profileFile) {
        const ext = profileFile.name.split(".").pop();
        const path = `profile-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("thumbnails").upload(path, profileFile);
        if (!error) {
          const { data } = supabase.storage.from("thumbnails").getPublicUrl(path);
          profileUrl = data.publicUrl;
        }
      }

      const updatedSettings = { ...settings };
      if (profileUrl) updatedSettings.profile_photo_url = profileUrl;
      updatedSettings.hero_tags = JSON.stringify(tags);

      for (const [key, value] of Object.entries(updatedSettings)) {
        await supabase
          .from("site_settings")
          .upsert({ key, value }, { onConflict: "key" });
      }

      setSettings(updatedSettings);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading settings...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-display tracking-wider text-foreground mb-2">Hero Section</h2>

        {/* Profile Photo */}
        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              {profileFile ? profileFile.name : "Choose image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="hidden"
              />
            </label>
            {profilePreview && (
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover border border-border"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Name</label>
            <input
              type="text"
              value={settings.hero_name}
              onChange={(e) => setSettings({ ...settings, hero_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Title</label>
            <input
              type="text"
              value={settings.hero_title}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Location</label>
          <input
            type="text"
            value={settings.hero_location}
            onChange={(e) => setSettings({ ...settings, hero_location: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Bio</label>
          <textarea
            value={settings.hero_bio}
            onChange={(e) => setSettings({ ...settings, hero_bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Contact Email</label>
          <input
            type="email"
            value={settings.contact_email}
            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Tags Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs text-muted-foreground uppercase tracking-wider">Tags</label>
            <button
              type="button"
              onClick={() => setTags([...tags, { icon: "Sparkles", label: "New Tag" }])}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Tag
            </button>
          </div>
          <div className="space-y-2">
            {tags.map((tag, idx) => {
              const Icon = tagIconMap[tag.icon] || Sparkles;
              return (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-secondary border border-border">
                  <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 border border-primary/30 shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <select
                    value={tag.icon}
                    onChange={(e) => {
                      const next = [...tags];
                      next[idx] = { ...next[idx], icon: e.target.value };
                      setTags(next);
                    }}
                    className="px-2 py-2 rounded-md bg-background border border-border text-xs text-foreground focus:outline-none focus:border-primary/50 w-32"
                  >
                    {tagIconNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={tag.label}
                    onChange={(e) => {
                      const next = [...tags];
                      next[idx] = { ...next[idx], label: e.target.value };
                      setTags(next);
                    }}
                    className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                    className="p-2 rounded-md bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
            {tags.length === 0 && (
              <p className="text-xs text-muted-foreground italic">No tags yet. Click "Add Tag" to create one.</p>
            )}
          </div>
        </div>

          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default HeroManager;
