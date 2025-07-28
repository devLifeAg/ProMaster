import { useEffect, useRef, useState } from "react";
import PropertyDialog from "./SelectDialog";
import { IconPaths } from "../constants/consts";
import colors from "../styles/colors";
import { AnimatePresence, motion } from "framer-motion";

export interface ListGroup {
  groupName: string;
  itemsName: string[];
}

type SelectedGroupsMap = Record<string, string[]>;

interface GroupDialogProps {
  onClose: () => void;
  selectedGroups?: SelectedGroupsMap;
  groupData: ListGroup[];
  onChange?: (updated: SelectedGroupsMap) => void;
}

export default function GroupDialog({ onClose, selectedGroups: initialSelectedGroups, onChange, groupData }: GroupDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const tabKeys = groupData.map(g => g.groupName);
  const [activeTab, setActiveTab] = useState<string>(tabKeys[0] ?? "");
  const [showSelectDialog, setShowSelectDialog] = useState(false);

  const [selectedGroups, setSelectedGroups] = useState<SelectedGroupsMap>(() => {
    if (initialSelectedGroups) {
      return initialSelectedGroups;
    }
    const initial: SelectedGroupsMap = {};
    groupData.forEach(group => {
      initial[group.groupName] = [];
    });
    return initial;
  });

  const [pendingSelected, setPendingSelected] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        const reset: SelectedGroupsMap = {};
        groupData.forEach(group => {
          reset[group.groupName] = [];
        });
        setSelectedGroups(reset);
        onChange?.(reset);
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [onClose, onChange, groupData]);

  const handleConfirmSelectDialog = (selected: string[]) => {
    const updated = {
      ...selectedGroups,
      [activeTab]: selected,
    };
    setSelectedGroups(updated);
    setShowSelectDialog(false);
    setPendingSelected([]);
    onChange?.(updated);
  };

  const handleOpenSelectDialog = () => {
    setPendingSelected(selectedGroups[activeTab] || []);
    setShowSelectDialog(true);
  };

  const isSelected = (tabKey: string) => activeTab === tabKey;

  const handleReset = () => {
    const reset: SelectedGroupsMap = {};
    groupData.forEach(group => {
      reset[group.groupName] = [];
    });
    setSelectedGroups(reset);
    onChange?.(reset);
  };

  if (showSelectDialog) {
    const dialogData = groupData.find(g => g.groupName === activeTab)?.itemsName || [];
    return (
      <PropertyDialog
        data={dialogData}
        onClose={() => {
          setShowSelectDialog(false);
          setPendingSelected([]);
        }}
        onConfirm={handleConfirmSelectDialog}
        title={activeTab}
        selected={pendingSelected}
      />
    );
  }

  function DisplayTags({ items }: { items: string[] }) {
    const maxShow = 3;
    const shown = items.slice(0, maxShow);
    const more = items.length - maxShow;

    if (items.length === 0)
      return <span className="text-gray-400">Default All</span>;

    return (
      <div className="flex items-center w-full overflow-hidden whitespace-nowrap gap-1">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={dialogRef}
        className="bg-white rounded-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-[573px] shadow flex flex-col"
      >
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={IconPaths.property} className="w-6 h-6" alt="icon" />
            <div className="text-lg font-bold text-gray-800">Group</div>
          </div>
          <button
            className="cursor-pointer"
            style={{
              color: Object.values(selectedGroups).every(arr => arr.length === 0)
                ? colors.greyInputText
                : colors.redRuby,
              fontWeight: 500,
              fontSize: 18,
            }}
            onClick={handleReset}
            disabled={Object.values(selectedGroups).every(arr => arr.length === 0)}
          >
            Reset
          </button>
        </div>
        <hr />

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {tabKeys.map((tabKey) => (
            <div key={tabKey} className="flex flex-col gap-2">
              <div
                className={`flex justify-between items-center border rounded px-4 py-3 cursor-pointer`}
                style={{ borderColor: colors.greyCalm }}
                onClick={() => setActiveTab(tabKey)}
              >
                <span style={{ color: colors.blackDark, fontSize: 18, fontWeight: 500 }}>
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
                    className={`flex items-center justify-center rounded-full transition-all duration-150 w-5 h-5 ${isSelected(tabKey) ? "border-[6px]" : "border-2"}`}
                    style={{ borderColor: colors.redRuby }}
                  >
                    {isSelected(tabKey) && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>
              </div>
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
                    <span className={`text-base font-medium ${selectedGroups[tabKey]?.length === 0 ? "text-gray-400" : "text-gray-800"}`}>
                      <DisplayTags items={selectedGroups[tabKey] ?? []} />
                    </span>
                    <span className="text-gray-500">▾</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="px-6 py-6 border-t">
          <button
            onClick={() => {
              onChange?.(selectedGroups);
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