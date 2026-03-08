import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save } from "lucide-react";

type Stat = {
  id: string;
  label: string;
  value: string;
  icon: string;
  section: string;
  sort_order: number;
};

const iconOptions = ["FolderOpen", "Users", "Clock", "Star", "Award", "TrendingUp", "Eye", "Heart"];

const StatsManager = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchStats = useCallback(async () => {
    const { data } = await supabase
      .from("stats")
      .select("*")
      .order("sort_order", { ascending: true });
    setStats((data as Stat[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleAdd = async (section: string) => {
    const newStat = {
      label: "New Stat",
      value: "0",
      icon: "Star",
      section,
      sort_order: stats.filter((s) => s.section === section).length,
    };
    await supabase.from("stats").insert(newStat);
    await fetchStats();
  };

  const handleUpdate = (id: string, field: keyof Stat, value: string) => {
    setStats(stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const stat of stats) {
      await supabase.from("stats").update({
        label: stat.label,
        value: stat.value,
        icon: stat.icon,
        sort_order: stat.sort_order,
      }).eq("id", stat.id);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    await supabase.from("stats").delete().eq("id", id);
    await fetchStats();
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading stats...</p>;
  }

  const heroStats = stats.filter((s) => s.section === "hero");
  const aboutStats = stats.filter((s) => s.section === "about");

  return (
    <div className="space-y-8">
      <StatSection
        title="Hero Stats"
        stats={heroStats}
        onAdd={() => handleAdd("hero")}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <StatSection
        title="About Stats"
        stats={aboutStats}
        onAdd={() => handleAdd("about")}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save All Stats"}
      </button>
    </div>
  );
};

const StatSection = ({
  title,
  stats,
  onAdd,
  onUpdate,
  onDelete,
}: {
  title: string;
  stats: Stat[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Stat, value: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="bg-secondary/30 border border-border rounded-xl p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-display tracking-wider text-foreground">{title}</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-1 text-xs text-primary hover:underline"
      >
        <Plus className="w-3 h-3" /> Add Stat
      </button>
    </div>

    {stats.length === 0 ? (
      <p className="text-sm text-muted-foreground/50">No stats yet.</p>
    ) : (
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <select
              value={stat.icon}
              onChange={(e) => onUpdate(stat.id, "icon", e.target.value)}
              className="px-2 py-1 rounded bg-secondary border border-border text-foreground text-xs"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <input
              type="text"
              value={stat.label}
              onChange={(e) => onUpdate(stat.id, "label", e.target.value)}
              placeholder="Label"
              className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
            />
            <input
              type="text"
              value={stat.value}
              onChange={(e) => onUpdate(stat.id, "value", e.target.value)}
              placeholder="Value"
              className="w-24 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
            />
            <button
              onClick={() => onDelete(stat.id)}
              className="text-muted-foreground hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default StatsManager;
