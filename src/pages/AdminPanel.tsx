import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, LogOut, GripVertical, Upload } from "lucide-react";
import { motion } from "framer-motion";

type Video = {
  id: string;
  title: string;
  description: string | null;
  type: "reel" | "regular";
  embed_url: string | null;
  thumbnail_url: string | null;
  sort_order: number;
};

const AdminPanel = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"reel" | "regular">("regular");
  const [embedUrl, setEmbedUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("sort_order", { ascending: true });
    setVideos((data as Video[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else fetchVideos();
    });
  }, [navigate, fetchVideos]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const uploadThumbnail = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("thumbnails").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("thumbnails").getPublicUrl(path);
    return data.publicUrl;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("regular");
    setEmbedUrl("");
    setThumbnailFile(null);
    setThumbnailPreview("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let thumbnailUrl = editingId
        ? videos.find((v) => v.id === editingId)?.thumbnail_url || null
        : null;

      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      const videoData = {
        title,
        description: description || null,
        type,
        embed_url: embedUrl || null,
        thumbnail_url: thumbnailUrl,
        sort_order: editingId
          ? videos.find((v) => v.id === editingId)?.sort_order || 0
          : videos.length,
      };

      if (editingId) {
        await supabase.from("videos").update(videoData).eq("id", editingId);
      } else {
        await supabase.from("videos").insert(videoData);
      }

      resetForm();
      await fetchVideos();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const handleEdit = (video: Video) => {
    setEditingId(video.id);
    setTitle(video.title);
    setDescription(video.description || "");
    setType(video.type);
    setEmbedUrl(video.embed_url || "");
    setThumbnailPreview(video.thumbnail_url || "");
    setThumbnailFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    await supabase.from("videos").delete().eq("id", id);
    await fetchVideos();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const reels = videos.filter((v) => v.type === "reel");
  const regulars = videos.filter((v) => v.type === "regular");

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display text-gradient-gold tracking-wider">Video Manager</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Add/Edit Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 mb-10 space-y-4"
        >
          <h2 className="text-lg font-display tracking-wider text-foreground mb-2">
            {editingId ? "Edit Video" : "Add Video"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "reel" | "regular")}
              className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            >
              <option value="regular">Regular Video (16:9)</option>
              <option value="reel">Reel (9:16)</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
          />

          <input
            type="url"
            placeholder="Embed URL (YouTube or Google Drive link)"
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
          />

          {/* Thumbnail upload */}
          <div>
            <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Thumbnail
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                {thumbnailFile ? thumbnailFile.name : "Choose image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="w-16 h-10 rounded object-cover border border-border"
                />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {editingId ? "Update" : "Add Video"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.form>

        {/* Video Lists */}
        <div className="space-y-8">
          <VideoList title="Reels" videos={reels} onEdit={handleEdit} onDelete={handleDelete} />
          <VideoList title="Regular Videos" videos={regulars} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

const VideoList = ({
  title,
  videos,
  onEdit,
  onDelete,
}: {
  title: string;
  videos: Video[];
  onEdit: (v: Video) => void;
  onDelete: (id: string) => void;
}) => (
  <div>
    <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
      {title} ({videos.length})
    </h3>
    {videos.length === 0 ? (
      <p className="text-sm text-muted-foreground/50">No videos yet.</p>
    ) : (
      <div className="space-y-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground/30 flex-shrink-0" />
            {video.thumbnail_url && (
              <img
                src={video.thumbnail_url}
                alt=""
                className="w-12 h-8 rounded object-cover flex-shrink-0 border border-border"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{video.title}</p>
              {video.description && (
                <p className="text-xs text-muted-foreground truncate">{video.description}</p>
              )}
            </div>
            <button
              onClick={() => onEdit(video)}
              className="text-xs text-primary hover:underline flex-shrink-0"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(video.id)}
              className="text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

type Video = {
  id: string;
  title: string;
  description: string | null;
  type: "reel" | "regular";
  embed_url: string | null;
  thumbnail_url: string | null;
  sort_order: number;
};

export default AdminPanel;
