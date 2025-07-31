/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import colors from "../styles/colors";
import { IconPaths } from "../constants/consts";

interface TagDialogProps {
  onClose: () => void;
  selected: number;
  dialogType: number;
  data: any;
  onConfirm?: (value: number) => void;
}

const tagColors: Record<number, string> = {
  67845: colors.bookedStatus,
  67861: colors.waitingStatus,
  67846: colors.reserveStatus,
};

export default function DashboardDialog({
  onClose,
  selected,
  onConfirm,
  dialogType,
  data,
}: TagDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [tempSelected, setTempSelected] = useState<number>(selected);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    setTempSelected(selected);
  }, [selected]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={dialogRef}
        className="bg-white rounded-md w-full max-w-sm sm:max-w-md md:max-w-lg shadow-lg"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={getIcon()} style={{ width: 24, height: 24 }} alt="icon" />
            <div style={{ fontWeight: 700, fontSize: 18, color: colors.blackDark }}>{getTitle()}</div>
          </div>
          {dialogType === 1 && (
            <button
              style={{ color: colors.redRuby, fontSize: 18, fontWeight: 500 }}
              className="cursor-pointer"
              onClick={() => {
                setTempSelected(selected);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <hr />

        {/* Body */}
        <div className="space-y-4 p-6 max-h-[60vh] overflow-y-auto">
          {data.map((tag: any) => {
            const isSelected = tempSelected === tag.intId;
            return (
              <div key={tag.intId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {dialogType === 0 && (
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tagColors[tag.intId] }}
                    />
                  )}
                  <span className="text-sm">{tag.description}</span>
                </div>
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    checked={isSelected}
                    onChange={() => {
                      setTempSelected(tag.intId);
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-150 w-5 h-5 ${
                      isSelected ? "border-[6px]" : "border-2"
                    }`}
                    style={{ borderColor: colors.redRuby }}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6">
          <button
            className="w-full cursor-pointer py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: colors.redRuby }}
            onClick={() => {
              onConfirm?.(tempSelected);
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
