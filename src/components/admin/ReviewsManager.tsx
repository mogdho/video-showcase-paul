import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, Star, Upload } from "lucide-react";

type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar_url: string | null;
  sort_order: number;
};

const ReviewsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFiles, setAvatarFiles] = useState<Record<string, File>>({});

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("sort_order", { ascending: true });
    setReviews((data as Review[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAdd = async () => {
    const newReview = {
      name: "Client Name",
      role: "Role/Company",
      text: "Client testimonial goes here.",
      stars: 5,
      sort_order: reviews.length,
    };
    await supabase.from("reviews").insert(newReview);
    await fetchReviews();
  };

  const handleUpdate = (id: string, field: keyof Review, value: string | number) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleAvatarChange = (id: string, file: File) => {
    setAvatarFiles({ ...avatarFiles, [id]: file });
    // Show preview
    const url = URL.createObjectURL(file);
    setReviews(reviews.map((r) => (r.id === id ? { ...r, avatar_url: url } : r)));
  };

  const handleSave = async () => {
    setSaving(true);
    
    for (const review of reviews) {
      let avatarUrl = review.avatar_url;
      
      // Upload avatar if changed
      if (avatarFiles[review.id]) {
        const file = avatarFiles[review.id];
        const ext = file.name.split(".").pop();
        const path = `avatar-${review.id}-${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from("thumbnails").upload(path, file);
        if (!error) {
          const { data } = supabase.storage.from("thumbnails").getPublicUrl(path);
          avatarUrl = data.publicUrl;
        }
      }

      await supabase.from("reviews").update({
        name: review.name,
        role: review.role,
        text: review.text,
        stars: review.stars,
        avatar_url: avatarUrl,
        sort_order: review.sort_order,
      }).eq("id", review.id);
    }

    setAvatarFiles({});
    await fetchReviews();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await supabase.from("reviews").delete().eq("id", id);
    await fetchReviews();
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading reviews...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display tracking-wider text-foreground">Client Reviews</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus className="w-3 h-3" /> Add Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground/50">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-2">
                    {review.avatar_url ? (
                      <img src={review.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground text-xs">
                        No img
                      </div>
                    )}
                    <label className="text-xs text-primary hover:underline cursor-pointer">
                      <Upload className="w-3 h-3 inline mr-1" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleAvatarChange(review.id, file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={review.name}
                        onChange={(e) => handleUpdate(review.id, "name", e.target.value)}
                        placeholder="Client name"
                        className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                      />
                      <input
                        type="text"
                        value={review.role}
                        onChange={(e) => handleUpdate(review.id, "role", e.target.value)}
                        placeholder="Role/Company"
                        className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                      />
                    </div>
                    <textarea
                      value={review.text}
                      onChange={(e) => handleUpdate(review.id, "text", e.target.value)}
                      placeholder="Review text"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleUpdate(review.id, "stars", star)}
                            className={`${star <= review.stars ? "text-primary" : "text-muted-foreground/30"}`}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
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
        {saving ? "Saving..." : "Save Reviews"}
      </button>
    </div>
  );
};

export default ReviewsManager;
