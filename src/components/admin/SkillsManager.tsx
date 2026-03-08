import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, Upload, X } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  level: number;
  tier: string;
  icon: string;
  description: string | null;
  sort_order: number;
};

const tierOptions = [
  { value: "Expert", label: "Expert" },
  { value: "Moderate", label: "Moderate" },
  { value: "Noob", label: "Noob" },
];

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchSkills = useCallback(async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });
    setSkills((data as Skill[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleIconUpload = async (skillId: string, file: File) => {
    setUploading(skillId);
    const ext = file.name.split(".").pop();
    const filePath = `skills/${skillId}.${ext}`;

    await supabase.storage.from("thumbnails").upload(filePath, file, { upsert: true });

    const { data: urlData } = supabase.storage.from("thumbnails").getPublicUrl(filePath);
    const iconUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    setSkills(skills.map((s) => (s.id === skillId ? { ...s, icon: iconUrl } : s)));
    setUploading(null);
  };

  const handleAdd = async () => {
    const newSkill = {
      name: "New Skill",
      level: 80,
      tier: "Moderate",
      icon: "Palette",
      description: "What this skill covers",
      sort_order: skills.length,
    };
    await supabase.from("skills").insert(newSkill);
    await fetchSkills();
  };

  const handleUpdate = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const skill of skills) {
      await supabase.from("skills").update({
        name: skill.name,
        level: skill.level,
        tier: skill.tier,
        icon: skill.icon,
        description: skill.description,
        sort_order: skill.sort_order,
      }).eq("id", skill.id);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await supabase.from("skills").delete().eq("id", id);
    await fetchSkills();
  };

  const isUrl = (str: string) => str.startsWith("http");

  if (loading) {
    return <p className="text-muted-foreground">Loading skills...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display tracking-wider text-foreground">Skills</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus className="w-3 h-3" /> Add Skill
          </button>
        </div>

        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground/50">No skills yet. Click "Add Skill" to get started.</p>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-card border border-border rounded-xl p-4 space-y-4">
                {/* Row 1: Icon + Name + Delete */}
                <div className="flex items-start gap-4">
                  {/* Icon upload area */}
                  <div className="flex-shrink-0">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      ref={(el) => { fileInputRefs.current[skill.id] = el; }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleIconUpload(skill.id, file);
                      }}
                    />
                    <button
                      onClick={() => fileInputRefs.current[skill.id]?.click()}
                      className="w-16 h-16 rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center overflow-hidden transition-colors bg-secondary/50"
                      title="Upload icon (PNG)"
                    >
                      {uploading === skill.id ? (
                        <span className="text-xs text-muted-foreground animate-pulse">...</span>
                      ) : isUrl(skill.icon) ? (
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <p className="text-[10px] text-muted-foreground/60 text-center mt-1">Icon</p>
                  </div>

                  {/* Name + Description */}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleUpdate(skill.id, "name", e.target.value)}
                      placeholder="Skill name (e.g. Premiere Pro)"
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm font-semibold"
                    />
                    <input
                      type="text"
                      value={skill.description || ""}
                      onChange={(e) => handleUpdate(skill.id, "description", e.target.value)}
                      placeholder="What it accounts for (e.g. Video editing, color grading)"
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                    />
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Row 2: Proficiency */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20">Proficiency:</span>
                  <div className="flex gap-2">
                    {tierOptions.map((tier) => (
                      <button
                        key={tier.value}
                        onClick={() => handleUpdate(skill.id, "tier", tier.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          skill.tier === tier.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 3: Level slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20">Level: {skill.level}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleUpdate(skill.id, "level", parseInt(e.target.value))}
                    className="flex-1 accent-primary"
                  />
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
        {saving ? "Saving..." : "Save Skills"}
      </button>
    </div>
  );
};

export default SkillsManager;
