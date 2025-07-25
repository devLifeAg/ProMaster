import { useEffect, useRef, useState } from "react";
import PropertyDialog from "./SelectDialog";
import { IconPaths } from "../constants/consts";
import colors from "../styles/colors";
import { AnimatePresence, motion } from "framer-motion";

type TabType = "team" | "personnel";

const dataMap: Record<TabType, any> = {
    team: ["Team A", "Team B", "Team C", "Team D", "Team E", "Team F"],
    personnel: ["Personnel A", "Personnel B", "Personnel C", "Personnel D", "Personnel E", "Personnel F"],
};

interface GroupDialogProps {
    onClose: () => void;
    selectedGroups?: {
        team: string[];
        personnel: string[];
    };
    onChange?: (updated: { team: string[]; personnel: string[] }) => void;
}

export default function GroupDialog({ onClose, selectedGroups: initialSelectedGroups, onChange }: GroupDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<TabType>("team");
    const [showSelectDialog, setShowSelectDialog] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState<{
        team: string[];
        personnel: string[];
    }>(initialSelectedGroups || {
        team: [],
        personnel: [],
    });
    const [pendingSelected, setPendingSelected] = useState<string[]>([]);

    // Đóng dialog khi click outside và reset dữ liệu đã chọn
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setSelectedGroups({ team: [], personnel: [] });
                if (onChange) onChange({ team: [], personnel: [] });
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [onClose, onChange]);

    const handleConfirmSelectDialog = (selected: string[]) => {
        const newSelectedGroups = {
            ...selectedGroups,
            [activeTab]: selected,
        };
        setSelectedGroups(newSelectedGroups);
        setShowSelectDialog(false);
        setPendingSelected([]);
        if (onChange) {
            onChange(newSelectedGroups);
        }
    };

    const handleOpenSelectDialog = () => {
        setPendingSelected(selectedGroups[activeTab] || []);
        setShowSelectDialog(true);
    };

    const isSelected = (tabKey: TabType) => activeTab === tabKey;

    const handleReset = () => {
        setSelectedGroups({ team: [], personnel: [] });
        if (onChange) onChange({ team: [], personnel: [] });
    };

    if (showSelectDialog) {
        return (
            <PropertyDialog
                data={dataMap[activeTab]}
                onClose={() => {
                    setShowSelectDialog(false);
                    setPendingSelected([]);
                }}
                onConfirm={handleConfirmSelectDialog} // xác nhận trả về dữ liệu cho GroupDialog
                title={activeTab === "team" ? "Team" : "Personnel"}
                selected={pendingSelected}
            />
        );
    }

    function DisplayTags({ items }: { items: string[] }) {
        const maxShow = 3;
        const shown = items.slice(0, maxShow);
        const more = items.length - maxShow;

        if (items.length === 0)
            return (
                <span className="text-gray-400">
                    Default All
                </span>
            );

        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    gap: 4,
                }}
            >
                {shown.map((item) => (
                    <span
                        key={item}
                        className="text-base font-medium text-gray-800 bg-gray-100 rounded-md px-2 py-1"
                        style={{
                            maxWidth: 120,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            background: colors.greyLight,
                            borderRadius: 6,
                            marginRight: 4,
                            display: "inline-block",
                        }}
                    >
                        {item}
                    </span>
                ))}
                {more > 0 && (
                    <span
                        className="text-base font-medium text-gray-800 bg-gray-100 rounded-md px-2 py-1"
                        style={{
                            background: colors.greyLight,
                            borderRadius: 6,
                            marginLeft: 4,
                            display: "inline-block",
                        }}
                    >
                        +{more}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div
                ref={dialogRef}
                className="bg-white rounded-md w-[630px] h-[573px] shadow flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-2">
                        <img src={IconPaths.property} className="w-6 h-6" alt="icon" />
                        <div className="text-lg font-bold text-gray-800">Group</div>
                    </div>
                    <button
                        className="cursor-pointer"
                        style={{
                            color:
                                (selectedGroups.team.length === 0 && selectedGroups.personnel.length === 0)
                                    ? colors.greyInputText
                                    : colors.redRuby,
                            fontWeight: 500,
                            fontSize: 18,
                        }}
                        onClick={handleReset}
                        disabled={selectedGroups.team.length === 0 && selectedGroups.personnel.length === 0}
                    >
                        Reset
                    </button>
                </div>
                <hr />

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                    {(["team", "personnel"] as TabType[]).map((tabKey) => (
                        <div key={tabKey} className="flex flex-col gap-2">
                            {/* Tab switch */}
                            <div
                                className={`flex justify-between items-center border rounded px-4 py-3 cursor-pointer`}
                                style={{ borderColor: colors.greyCalm }}
                                onClick={() => setActiveTab(tabKey)}
                            >
                                <span
                                    style={{ color: colors.blackDark, fontSize: 18, fontWeight: 500 }}
                                >
                                    {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                                </span>
                                <label className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="tag"
                                        checked={isSelected(tabKey)}
                                        onChange={() => setActiveTab(tabKey)}
                                        readOnly
                                        className="sr-only"
                                    />
                                    <div
                                        className={`flex items-center justify-center rounded-full transition-all duration-150 w-5 h-5 ${isSelected(tabKey) ? "border-[6px]" : "border-2"
                                            }`}
                                        style={{ borderColor: colors.redRuby }}
                                    >
                                        {isSelected(tabKey) && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </div>
                                </label>
                            </div>

                            {/* Default select section with animation */}
                            <AnimatePresence mode="wait">
                                {isSelected(tabKey) && (
                                    <motion.div
                                        key={tabKey}
                                        layout
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="flex justify-between items-center border border-gray-300 rounded px-4 py-3 cursor-pointer shadow-sm hover:shadow transition"
                                        onClick={handleOpenSelectDialog}
                                    >
                                        <span className={`text-base font-medium ${selectedGroups[tabKey].length === 0
                                            ? "text-gray-400"
                                            : "text-gray-800"
                                            }`}
                                        >
                                            <DisplayTags items={selectedGroups[tabKey]} />
                                        </span>
                                        <span className="text-gray-500">▾</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-6 border-t">
                    <button
                        onClick={() => {
                            setSelectedGroups({ team: [], personnel: [] });
                            if (onChange) onChange({ team: [], personnel: [] });
                            onClose();
                        }}
                        className="w-full py-2 rounded-full text-white font-semibold cursor-pointer"
                        style={{ backgroundColor: colors.redRuby }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

// interface PropertyDialogProps {
//     onClose: () => void;
//     data: ListGroup[] | string[];
//     onChange: (selected: string[]) => void;
//     onConfirm?: (selected: string[]) => void; // sửa lại kiểu
//     title?: string;
//     selected?: string[];
// }