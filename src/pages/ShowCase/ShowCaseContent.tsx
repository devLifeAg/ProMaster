import ShowcaseItem from "../../items/ShowCaseItem"
import { BsBookmark } from "react-icons/bs";
import fonts from '../../styles/fonts';
import colors from "../../styles/colors";
import { useState } from "react";
import type { ShowcaseItemProps } from "../../items/ShowCaseItem";

type ShowcaseSection = {
  section: string;
  items: ShowcaseItemProps[];
};

const initialShowcaseData: ShowcaseSection[] = [
  {
    section: "My Pins",
    items: [
      { title: "Aurora Heights", tag: 0, pinned: true },
      { title: "AmberHill Park", tag: 0, pinned: true },
      { title: "The Willow", tag: 0, pinned: true },
      { title: "Lakeside Rise", tag: 0, pinned: true },
      { title: "Andersen Park", tag: 0, pinned: true },
    ],
  },
  {
    section: "Nova Vista",
    items: [
      { title: "The Willow", tag: 0, pinned: false },
      { title: "Lakeside Rise", tag: 1, pinned: false },
      { title: "Andersen Park", tag: 2, pinned: false },
    ],
  },
  {
    section: "The Willow",
    items: [
      { title: "Nova Vista", tag: 2, pinned: false },
      { title: "Amberhill Park", tag: 1, pinned: false },
      { title: "Andersen Park", tag: 0, pinned: false },
    ],
  },
];

export default function ShowcaseContent() {
  const [showcaseData, setShowcaseData] = useState<ShowcaseSection[]>(initialShowcaseData);

  const handleTogglePin = (sectionIndex: number, itemIndex: number) => {
    setShowcaseData(prev =>
      prev.map((section, sIdx) => {
        if (sIdx !== sectionIndex) return section;
        return {
          ...section,
          items: section.items.map((item, iIdx) =>
            iIdx === itemIndex ? { ...item, pinned: !item.pinned } : item
          ),
        };
      })
    );
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      {showcaseData.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <div
            className="px-6 py-2 flex items-center gap-2"
            style={{
              color: section.section === "My Pins" ? colors.blackDark : colors.whiteCloud,
              fontSize: section.section === "My Pins" ? 20 : 18,
              fontWeight: 700,
              fontFamily: fonts.outfit,
              background: section.section === "My Pins" ? undefined : colors.redRuby,
            }}
          >
            {section.section === "My Pins" && (
              <BsBookmark style={{ color: colors.redRuby }} size={20} />
            )}
            {section.section}
          </div>

          <div className="flex gap-4 p-6 overflow-x-auto pb-9">
            {section.items.map((item, itemIndex) => (
              <ShowcaseItem
                key={itemIndex}
                {...item}
                onTogglePin={() => handleTogglePin(sectionIndex, itemIndex)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
