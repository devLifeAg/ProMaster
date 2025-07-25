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
    <div className="grid grid-cols-10 w-full">
      <div className="col-span-10 mt-4 w-full">
        {showcaseData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="w-full">
            {/* Section Header */}
            <div
              className={`px-4 ${section.section !== "My Pins" ? 'py-2 mt-9' : ''} flex items-center gap-2`}
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

            {/* Scroll container */}
            <div className="w-full overflow-x-auto">
              <div className="flex gap-4 p-4 w-max">
                {section.items.map((item, itemIndex) => (
                  <ShowcaseItem
                    key={itemIndex}
                    {...item}
                    onTogglePin={() => handleTogglePin(sectionIndex, itemIndex)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
