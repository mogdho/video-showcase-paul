import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  level: number;
  tier: string;
  icon: string;
  description: string | null;
  sort_order: number;
};

const iconOptions = ["Palette", "Video", "Layers", "Music", "Sparkles", "Wand2", "Camera", "Film", "Monitor"];
const tierOptions = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"];

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleAdd = async () => {
    const newSkill = {
      name: "New Skill",
      level: 80,
      tier: "Advanced",
      icon: "Palette",
      description: "Skill description",
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
          <p className="text-sm text-muted-foreground/50">No skills yet.</p>
        ) : (
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <select
                    value={skill.icon}
                    onChange={(e) => handleUpdate(skill.id, "icon", e.target.value)}
                    className="px-2 py-1 rounded bg-secondary border border-border text-foreground text-xs"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleUpdate(skill.id, "name", e.target.value)}
                    placeholder="Skill name"
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                  />
                  <select
                    value={skill.tier}
                    onChange={(e) => handleUpdate(skill.id, "tier", e.target.value)}
                    className="px-2 py-1 rounded bg-secondary border border-border text-foreground text-xs"
                  >
                    {tierOptions.map((tier) => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={skill.description || ""}
                  onChange={(e) => handleUpdate(skill.id, "description", e.target.value)}
                  placeholder="Description"
                  className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
                />
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">Level: {skill.level}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleUpdate(skill.id, "level", parseInt(e.target.value))}
                    className="flex-1"
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
