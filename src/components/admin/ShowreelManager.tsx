import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload } from "lucide-react";

const ShowreelManager = () => {
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .in("key", ["showreel_url", "showreel_thumbnail_url"]);
      if (data) {
        const u = data.find((r) => r.key === "showreel_url")?.value || "";
        const t = data.find((r) => r.key === "showreel_thumbnail_url")?.value || "";
        setUrl(u);
        setThumbnailUrl(t);
        setPreview(t);
      }
      setLoading(false);
    })();
  }, []);

  const handleThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let finalThumb = thumbnailUrl;
      if (thumbFile) {
        const ext = thumbFile.name.split(".").pop();
        const path = `showreel-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("thumbnails").upload(path, thumbFile);
        if (!error) {
          finalThumb = supabase.storage.from("thumbnails").getPublicUrl(path).data.publicUrl;
        }
      }

      await supabase.from("site_settings").upsert({ key: "showreel_url", value: url }, { onConflict: "key" });
      await supabase.from("site_settings").upsert({ key: "showreel_thumbnail_url", value: finalThumb }, { onConflict: "key" });

      setThumbnailUrl(finalThumb);
      setThumbFile(null);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="bg-secondary/30 border border-border rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-display tracking-wider text-foreground mb-2">Showreel</h2>

      <div>
        <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
          YouTube Link
        </label>
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
        />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Thumbnail
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            {thumbFile ? thumbFile.name : "Choose image"}
            <input type="file" accept="image/*" onChange={handleThumb} className="hidden" />
          </label>
          {preview && (
            <img src={preview} alt="Preview" className="w-28 h-16 rounded object-cover border border-border" />
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Showreel"}
      </button>
    </div>
  );
};

export default ShowreelManager;
