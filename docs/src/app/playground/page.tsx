'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"; // Assuming these exist from your main page
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import skillsData from '@/data/skills.json';
import { semanticSearch, generateWorkflow, ScoredSkill } from '@/lib/semanticSearch';
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle2, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function PlaygroundPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ScoredSkill[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Live search effect
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            // @ts-ignore - skillsData type mismatch workaround for quick prototyping
            const skills = (skillsData.skills || skillsData) as any[];
            const matched = semanticSearch(query, skills, 5);
            setResults(matched);
            setIsTyping(false);
        }, 300); // Debounce

        setIsTyping(true);
        return () => clearTimeout(timer);
    }, [query]);

    const workflow = generateWorkflow(query, results.map(r => r.skill));

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-purple-500/30">

            {/* Header */}
            <header className="mb-12 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div>
                    <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors mb-2 block">← Back to Showcase</Link>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Workflow Playground
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Experience the MCP server's "Auto-Detect" brain in your browser. No installation required.
                    </p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 h-[calc(100vh-200px)]">

                {/* LEFT: Input Simulation */}
                <div className="flex flex-col gap-6">
                    <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur-xl flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-4 text-purple-400">
                            <Sparkles className="w-5 h-5" />
                            <span className="font-semibold tracking-wide uppercase text-xs">AI Agent Simulation</span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                            <div className="bg-zinc-800/50 p-4 rounded-xl rounded-tl-none border border-white/5 self-start max-w-[80%]">
                                <p className="text-zinc-300">
                                    Ready to help! specificy your goal, and I'll auto-detect the perfect skills for the job.
                                </p>
                            </div>

                            {query && (
                                <div className="bg-purple-900/20 p-4 rounded-xl rounded-tr-none border border-purple-500/20 self-end ml-auto max-w-[80%]">
                                    <p className="text-white">{query}</p>
                                </div>
                            )}

                            {results.length > 0 && !isTyping && (
                                <div className="bg-zinc-800/50 p-4 rounded-xl rounded-tl-none border border-white/5 self-start max-w-[90%] animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="flex items-center gap-2 mb-3 text-green-400">
                                        <Zap className="w-4 h-4" />
                                        <span className="text-sm font-semibold">Auto-Detected {results.length} Skills</span>
                                    </div>
                                    <div className="space-y-2">
                                        {results.map((r, i) => (
                                            <div key={r.skill.id} className="flex items-center gap-3 bg-black/20 p-2 rounded border border-white/5">
                                                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 shrink-0">
                                                    {(r.score * 10).toFixed(0)}% Match
                                                </Badge>
                                                <span className="text-sm text-zinc-200 truncate">{r.skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="e.g., 'Build a secure API' or 'Deploy to AWS'..."
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-zinc-600"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <kbd className="hidden sm:inline-block pointer-events-none h-6 select-none items-center gap-1 rounded border border-white/10 bg-zinc-800 px-2 font-mono text-[10px] font-medium text-zinc-400 opacity-100">
                                    TYPE TO SEARCH
                                </kbd>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* RIGHT: Live Visualization */}
                <div className="flex flex-col gap-6 overflow-hidden">

                    {/* Stats / Header for Viz */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <PlayCircle className={`w-5 h-5 ${results.length > 0 ? 'text-green-400' : 'text-zinc-600'}`} />
                            <h2 className="font-semibold text-lg">Dynamic Workflow</h2>
                        </div>
                        {results.length > 0 && (
                            <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white">
                                {results.length} Steps Generated
                            </Badge>
                        )}
                    </div>

                    <ScrollArea className="flex-1 pr-6 -mr-6">
                        {results.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 opacity-50">
                                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-dashed border-zinc-700 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <p>Start typing to generate a workflow...</p>
                            </div>
                        ) : (
                            <div className="space-y-8 relative pl-8 py-4">
                                {/* Timeline Line */}
                                <div className="absolute left-[11px] top-6 bottom-6 w-px bg-gradient-to-b from-purple-500 via-purple-500/20 to-transparent" />

                                {workflow.map((step, idx) => (
                                    <div key={idx} className="relative animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>

                                        {/* Dot */}
                                        <div className="absolute -left-[29px] top-6 w-6 h-6 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                                            <span className="text-[10px] font-bold text-white">{step.step}</span>
                                        </div>

                                        <Card className="bg-zinc-900/40 border-white/5 overflow-hidden group hover:border-purple-500/30 transition-all hover:bg-zinc-900/60">
                                            {/* Step Content */}
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <Badge variant="outline" className="mb-2 border-purple-500/30 text-purple-400 bg-purple-500/5">
                                                        {step.action}
                                                    </Badge>
                                                    <span className="text-xs text-zinc-500 font-mono">{results[idx].skill.category}</span>
                                                </div>

                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                                    {step.skill}
                                                </h3>

                                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                                    {step.description}
                                                </p>

                                                <div className="flex items-center gap-2 text-xs text-zinc-500 border-t border-white/5 pt-3 mt-2">
                                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                    <span>Risk Level: <span className={results[idx].skill.risk === 'high' ? 'text-red-400' : 'text-zinc-300'}>{results[idx].skill.risk}</span></span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}

                                {/* Final Success State */}
                                <div className="relative animate-in slide-in-from-right-4 duration-700 fade-in" style={{ animationDelay: '600ms' }}>
                                    <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-green-500 box-content border-4 border-black/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                    <div className="p-1 pl-0">
                                        <p className="text-green-400 font-medium text-sm">Goal Achievable</p>
                                    </div>
                                </div>

                            </div>
                        )}
                    </ScrollArea>
                </div>

            </div>
        </div>
    );
}
