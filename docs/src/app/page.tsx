"use client";

import { useState, useMemo } from "react";
import skillsData from "@/data/skills.json";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Skill, SkillsData } from "@/types/skills";

const skills = skillsData as SkillsData;

const riskColors: Record<string, string> = {
  low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  high: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  safe: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  unknown: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const categoryIcons: Record<string, string> = {
  security: "🔐",
  general: "📝",
  "data-ai": "🧠",
  development: "💻",
  infrastructure: "☁️",
  architecture: "🏗️",
  business: "📈",
  testing: "🧪",
  "game-development": "🎮",
  uncategorized: "📁",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Compute categories from skills data
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    skills.forEach((skill) => {
      counts[skill.category] = (counts[skill.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        !search ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌌</span>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Antigravity Skills
                </h1>
                <p className="text-xs text-slate-400">{skills.length} skills</p>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800/50 border-white/10 focus:border-violet-500/50"
              />
            </div>
            <Button
              variant="outline"
              className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
              onClick={() => window.open("https://github.com/Abderraouf-yt/skills-mcp-server", "_blank")}
            >
              ⭐ GitHub
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-24 rounded-xl bg-slate-800/30 backdrop-blur border border-white/5 p-4">
              <h2 className="text-sm font-semibold text-slate-300 mb-3">Categories</h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!selectedCategory
                        ? "bg-violet-500/20 text-violet-300"
                        : "text-slate-400 hover:bg-slate-700/50"
                      }`}
                  >
                    All Skills ({skills.length})
                  </button>
                  <Separator className="my-2 bg-white/5" />
                  {categories.map(([cat, count]) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${selectedCategory === cat
                          ? "bg-violet-500/20 text-violet-300"
                          : "text-slate-400 hover:bg-slate-700/50"
                        }`}
                    >
                      <span>
                        {categoryIcons[cat] || "📁"} {cat}
                      </span>
                      <span className="text-xs opacity-60">{count}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing {filteredSkills.length} of {skills.length} skills
              </p>
              {selectedCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="text-slate-400"
                >
                  Clear filter ✕
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredSkills.slice(0, 50).map((skill) => (
                <Card
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className="bg-slate-800/30 backdrop-blur border-white/5 hover:border-violet-500/30 transition-all cursor-pointer group hover:shadow-lg hover:shadow-violet-500/5"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base text-slate-200 group-hover:text-violet-300 transition-colors line-clamp-1">
                        {skill.name}
                      </CardTitle>
                      <Badge variant="outline" className={`shrink-0 text-xs ${riskColors[skill.risk] || riskColors.unknown}`}>
                        {skill.risk}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-400 line-clamp-2 text-sm">
                      {skill.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs">
                        {categoryIcons[skill.category] || "📁"} {skill.category}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {filteredSkills.length > 50 && (
              <p className="text-center text-slate-500 mt-6 text-sm">
                Showing first 50 results. Refine your search to see more.
              </p>
            )}
          </main>
        </div>
      </div>

      {/* Skill Detail Dialog */}
      <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          {selectedSkill && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-slate-100 flex items-center gap-3">
                  {categoryIcons[selectedSkill.category] || "📁"} {selectedSkill.name}
                </DialogTitle>
                <DialogDescription className="text-slate-400 mt-2">
                  {selectedSkill.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={riskColors[selectedSkill.risk] || riskColors.unknown}>
                    Risk: {selectedSkill.risk}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                    {selectedSkill.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                    {selectedSkill.source}
                  </Badge>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Skill Path</h4>
                  <code className="text-xs bg-slate-800 px-3 py-2 rounded block text-violet-300 overflow-x-auto">
                    {selectedSkill.path}
                  </code>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-violet-600 hover:bg-violet-700"
                    onClick={() =>
                      window.open(
                        `https://github.com/Abderraouf-yt/antigravity-awesome-skills/tree/main/${selectedSkill.path}`,
                        "_blank"
                      )
                    }
                  >
                    View on GitHub →
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
