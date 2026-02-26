"use client";

import { useState, useRef } from "react";
import { Layout, GripVertical, Eye, EyeOff } from "lucide-react";
import { PortfolioConfig, SectionKey } from "@/types";
import { SECTION_LABELS, DEFAULT_SECTION_ORDER } from "@/lib/constants";

interface SectionsTabProps {
    config: PortfolioConfig;
    reorderSections: (fromIndex: number, toIndex: number) => void;
    toggleSection: (section: SectionKey) => void;
}

export default function SectionsTab({
    config,
    reorderSections,
    toggleSection,
}: SectionsTabProps) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const dragNodeRef = useRef<HTMLDivElement | null>(null);

    const sectionOrder: SectionKey[] =
        config.sectionOrder && config.sectionOrder.length > 0
            ? config.sectionOrder
            : [...DEFAULT_SECTION_ORDER];

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDragIndex(index);
        dragNodeRef.current = e.currentTarget as HTMLDivElement;
        e.dataTransfer.effectAllowed = "move";
        // Make drag image slightly transparent
        if (dragNodeRef.current) {
            dragNodeRef.current.style.opacity = "0.5";
        }
    };

    const handleDragEnd = () => {
        if (dragNodeRef.current) {
            dragNodeRef.current.style.opacity = "1";
        }
        if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
            reorderSections(dragIndex, dragOverIndex);
        }
        setDragIndex(null);
        setDragOverIndex(null);
        dragNodeRef.current = null;
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    return (
        <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5 text-indigo-400" />
                Sections Manager
            </h3>
            <p className="text-sm text-zinc-400 mb-2">
                Toggle sections on/off and drag to reorder them on your portfolio page.
            </p>
            <p className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5">
                <GripVertical className="w-3.5 h-3.5" />
                Grab the handle on the left to drag and reorder
            </p>
            <div className="space-y-2">
                {sectionOrder.map((section, index) => {
                    const isEnabled = config.sections[section];
                    const isDragOver = dragOverIndex === index && dragIndex !== index;

                    return (
                        <div
                            key={section}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={handleDragLeave}
                            className={`flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-move select-none ${dragIndex === index
                                    ? "opacity-50 scale-[0.98]"
                                    : isDragOver
                                        ? "bg-indigo-500/10 border-indigo-500/30 scale-[1.01]"
                                        : isEnabled
                                            ? "bg-white/[0.03] hover:bg-white/[0.06]"
                                            : "bg-white/[0.01] hover:bg-white/[0.03] opacity-60"
                                } border ${isDragOver
                                    ? "border-indigo-500/30"
                                    : "border-transparent"
                                }`}
                        >
                            {/* Drag handle */}
                            <div className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-grab active:cursor-grabbing">
                                <GripVertical className="w-4 h-4" />
                            </div>

                            {/* Section info */}
                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium block">
                                    {SECTION_LABELS[section] || section}
                                </span>
                                <span className="text-xs text-zinc-500">
                                    {isEnabled ? "Visible" : "Hidden"}
                                </span>
                            </div>

                            {/* Order badge */}
                            <span className="text-xs text-zinc-600 font-mono w-6 text-center">
                                {index + 1}
                            </span>

                            {/* Toggle button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSection(section);
                                }}
                                className={`p-2 rounded-lg transition-all ${isEnabled
                                        ? "text-green-400 bg-green-400/10 hover:bg-green-400/20"
                                        : "text-zinc-500 bg-white/5 hover:bg-white/10"
                                    }`}
                                title={isEnabled ? "Click to hide" : "Click to show"}
                            >
                                {isEnabled ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Hint */}
            <div className="mt-6 p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                <p className="text-xs text-indigo-300">
                    💡 <strong>Tip:</strong> The order here determines how sections appear on
                    your published portfolio. Drag to rearrange, click the eye icon to
                    toggle visibility.
                </p>
            </div>
        </div>
    );
}
