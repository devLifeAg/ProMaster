// components/TagDialog.tsx
import { useEffect, useRef } from "react";
import colors from "../styles/colors";
import { IconPaths } from '../constants/consts';

interface TagDialogProps {
    onClose: () => void;
    selected: string;
    dialogType: number;
    data: any;
    onSelect: (value: string) => void;
}

// const tags = [
//     { color: colors.brookedStatus, label: "Selling Fast", value: "selling_fast" },
//     { color: colors.waitingStatus, label: "Mix Developments", value: "mix_developments" },
//     { color: colors.reserveStatus, label: "Last Few Unit", value: "last_few_unit" },
// ];

export default function DashboardDialog({ onClose, selected, onSelect, dialogType, data }: TagDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const getIcon = () => {
        if (dialogType === 1) return IconPaths.filter;
        if (dialogType === 2) return IconPaths.chart;
        return IconPaths.tag;
    };

    const getTitle = () => {
        if (dialogType === 1) return "Filter";
        if (dialogType === 2) return "Chart Type";
        return "Tag";
    };

    // const isTagType = dialogType === 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div ref={dialogRef} className="bg-white rounded-md w-[300px] shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-2">
                        <img src={getIcon()} style={{ width: 24, height: 24 }} alt="icon" />
                        <div style={{ fontWeight: 700, fontSize: 18, color: colors.blackDark }}>{getTitle()}</div>
                    </div>
                    {dialogType == 1 && (
                        <button style={{color: colors.redRuby, fontSize: 18, fontWeight: 500 }}
                            className="cursor-pointer"
                            onClick={() => onSelect("")}
                        >
                            Reset
                        </button>
                    )}
                </div>
                <hr />

                {/* Nội dung */}
                <div className="space-y-4 p-6">
                    {(
                        data.map((tag) => {
                            const isSelected = selected === tag.value;
                            return (
                                <div key={tag.value} className="flex items-center justify-between">
                                    {tag.color != null}
                                    <div className="flex items-center gap-2">
                                        {tag.color && (
                                            <span
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: tag.color }}
                                            />
                                        )}
                                        <span className="text-sm">{tag.label}</span>
                                    </div>
                                    <label className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            name="tag"
                                            checked={isSelected}
                                            onChange={() => onSelect(tag.value)}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`flex items-center justify-center rounded-full transition-all duration-150 w-5 h-5 ${isSelected ? "border-[6px]" : "border-2"
                                                }`}
                                            style={{ borderColor: colors.redRuby }}
                                        >
                                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                    </label>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="p-6">
                    <button
                        className="w-full cursor-pointer py-2 rounded-full text-white font-semibold"
                        style={{ backgroundColor: colors.redRuby }}
                        onClick={onClose}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

