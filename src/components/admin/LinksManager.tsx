import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save } from "lucide-react";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  sort_order: number;
};

const platformOptions = ["Facebook", "Instagram", "X", "YouTube", "TikTok", "LinkedIn", "Fiverr", "Upwork"];

const LinksManager = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLinks = useCallback(async () => {
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .order("sort_order", { ascending: true });
    setLinks((data as SocialLink[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleAdd = async () => {
    const newLink = {
      platform: "Facebook",
      url: "https://",
      sort_order: links.length,
    };
    await supabase.from("social_links").insert(newLink);
    await fetchLinks();
  };

  const handleUpdate = (id: string, field: keyof SocialLink, value: string) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const link of links) {
      await supabase.from("social_links").update({
        platform: link.platform,
        url: link.url,
        sort_order: link.sort_order,
      }).eq("id", link.id);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await supabase.from("social_links").delete().eq("id", id);
    await fetchLinks();
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading links...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display tracking-wider text-foreground">Social Links</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus className="w-3 h-3" /> Add Link
          </button>
        </div>

        {links.length === 0 ? (
          <p className="text-sm text-muted-foreground/50">No links yet.</p>
        ) : (
          <div className="space-y-3">
            {links.map((link) => (
              <div key={link.id} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
                <select
                  value={link.platform}
                  onChange={(e) => handleUpdate(link.id, "platform", e.target.value)}
                  className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                >
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleUpdate(link.id, "url", e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                />
                <button
                  onClick={() => handleDelete(link.id)}
                  className="text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Links"}
      </button>
    </div>
  );
};

export default LinksManager;
