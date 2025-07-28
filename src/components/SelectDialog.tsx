import { useState, useEffect, useRef } from "react";
import colors from "../styles/colors";
import { IconPaths } from "../constants/consts";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

export interface ListGroup {
  groupName: string;
  itemsName: string[];
}

interface PropertyDialogProps {
    onClose: () => void;
    data: ListGroup[] | string[];
    onChange?: (selected: string[]) => void;
    onConfirm?: (selected: string[]) => void;
    title?: string;
    selected?: string[];
}

export default function PropertyDialog({ onClose, data, title, selected = [], ...props }: PropertyDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [selectedState, setSelectedState] = useState<string[]>(selected);
    const isGrouped = Array.isArray(data) && typeof data[0] === 'object';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [onClose]);

    useEffect(() => {
        setSelectedState(selected);
    }, [selected]);

    const toggleSelect = (item: string) => {
        setSelectedState(prev => {
            if (item === "__all__") return [];
            const index = prev.indexOf(item);
            const next = [...prev];
            if (index > -1) {
                next.splice(index, 1);
            } else {
                next.push(item);
            }
            return next.length > 0 ? next : [];
        });
    };

    const renderItems = (list: string[], groupName?: string) => (
        <div className="space-y-2 mt-8">
            {groupName && (
                <>
                    <p className="mt-4" style={{ color: colors.redRuby, fontSize: 16 }}>{groupName}</p>
                    <hr className="my-1" />
                </>
            )}
            {list.map((item) => {
                const isChecked = selectedState.includes(item);
                return (
                    <div key={item}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleSelect(item)}
                        >
                            <p style={{ fontSize: 18, color: colors.blackDark }}>{item}</p>
                            <input
                                className="hidden me-4"
                                checked={isChecked}
                                onChange={() => toggleSelect(item)}
                                type="checkbox"
                                id={item}
                            />
                            <label htmlFor={item} className="flex items-center h-10 px-2 rounded cursor-pointer">
                                <span className="checkbox-inner flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full"></span>
                            </label>
                        </motion.div>
                        <hr className="my-1" />
                    </div>
                );
            })}
        </div>
    );

    const isDefault = selectedState.length === 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div
                ref={dialogRef}
                className="bg-white rounded-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[630px] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 shadow">
                    <div className="flex items-center gap-2">
                        {!title && (
                            <img src={IconPaths.property} className="w-6 h-6" alt="icon" />
                        )}
                        <div className="text-lg font-bold text-gray-800">{title || "Property"}</div>
                    </div>
                    <button
                        className="cursor-pointer"
                        style={{ color: selectedState.length == 0 ? colors.greyInputText : colors.redRuby, fontWeight: 500, fontSize: 18 }}
                        onClick={() => setSelectedState([])}
                        disabled={selectedState.length === 0}
                    >
                        Reset
                    </button>
                </div>

                <hr />

                {/* Nội dung có scroll */}
                <div className="px-4 flex gap-4" style={{ flex: 1, minHeight: 0 }}>
                    {/* Cột trái: scrollable content */}
                    <div className="flex-1 flex flex-col overflow-hidden scroll-hidden">
                        {/* Search bar */}
                        <div className="pl-2 py-6">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-md shadow" style={{ background: colors.greyLight }}>
                                <Search size={20} color={colors.greyShadow} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="outline-none w-full"
                                />
                            </div>
                        </div>

                        {/* Scrollable content: search + items */}
                        <div className="overflow-y-auto space-y-2 pl-6" style={{ flex: 1 }}>
                            {/* Checkbox default */}
                            <div className="flex items-center justify-between mb-4 opacity-60 cursor-not-allowed">
                                <p className="text-sm font-semibold">Show All (Default)</p>
                                <input className="hidden me-4" type="checkbox" id="default" checked={isDefault} readOnly />
                                <label htmlFor="default" className="pointer-events-none flex items-center h-10 px-2 rounded">
                                    <span className={`checkbox-inner flex items-center justify-center w-5 h-5 rounded-full border-2`} />
                                </label>
                            </div>

                            <AnimatePresence>
                                {isGrouped
                                    ? (data as ListGroup[]).map((group, index) => (
                                        <div key={index}>
                                            {renderItems(group.itemsName, group.groupName)}
                                        </div>
                                    ))
                                    : renderItems(data as string[])}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Cột phải: các label A, B, C, D */}  
                    <div className="flex flex-col justify-center items-center gap-2 min-w">
                        {['A', 'B', 'C', 'D'].map((label, index) => (
                            <span key={index} style={{ fontSize: 14, color: colors.redRuby }}>{label}</span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 shadow">
                    <button
                        className="w-full py-2 rounded-full text-white font-semibold cursor-pointer"
                        style={{ backgroundColor: colors.redRuby }}
                        onClick={() => {
                            if (props.onConfirm) props.onConfirm(selectedState); // truyền selectedState
                            else onClose();
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}