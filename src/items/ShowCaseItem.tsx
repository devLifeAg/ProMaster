import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import colors from "../styles/colors";
import fonts from '../styles/fonts';
import { useState } from "react";

export type ShowcaseItemProps = {
    title: string;
    tag?: number;
    image?: string;
    availability?: string;
    address?: string;
    pinned?: boolean;
    onTogglePin?: () => void; // Optional callback
};

const getTagInfo = (tag: number): { text: string; color: string } | null => {
    switch (tag) {
        case 0:
            return { text: "Mix Developments", color: colors.waitingStatus };
        case 1:
            return { text: "Last Few Units", color: colors.reserveStatus };
        case 2:
            return { text: "Selling Fast", color: colors.brookedStatus };
        default:
            return null;
    }
};

export default function ShowcaseItem({
    title,
    tag = 0,
    image = "/assets/image.jpg",
    availability = "150/500 Available",
    address = "Jln Bersatu, Taman Bukit Serdang",
    pinned = false,
    onTogglePin,
}: ShowcaseItemProps) {
    const [isPinned, setIsPinned] = useState(pinned);

    const handleTogglePin = (e: React.MouseEvent) => {
        e.stopPropagation(); // tránh propagate click lên cha nếu cần
        setIsPinned(!isPinned);
        onTogglePin?.(); // gọi về cha nếu có
    };

    return (
        <div className="relative min-w-[360px] max-w-[460px] rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white">
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />

                {getTagInfo(tag) && (
                    <div
                        className="absolute top-3 left-3 text-white px-2 py-1 rounded-md"
                        style={{
                            background: getTagInfo(tag)?.color,
                            fontWeight: 600,
                            fontSize: 14,
                            fontFamily: fonts.outfit,
                        }}
                    >
                        {getTagInfo(tag)?.text}
                    </div>
                )}

                <div
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/50 cursor-pointer"
                    onClick={handleTogglePin}
                >
                    {isPinned ? (
                        <BsBookmarkFill style={{ color: colors.redRuby }} size={24} />
                    ) : (
                        <BsBookmark style={{ color: colors.blackDark }} size={24} />
                    )}
                </div>
            </div>

            <div className="p-3 bg-white">
                <div className="flex justify-between">
                    <div>
                        <div className="mb-2" style={{ color: colors.blackDark, fontWeight: 700, fontSize: 18, fontFamily: fonts.outfit }}>
                            {title}
                        </div>
                        <div className="rounded-full px-2 py-1 w-fit mb-2" style={{ color: colors.whiteCloud, fontWeight: 600, fontSize: 14, fontFamily: fonts.outfit, background: colors.availableStatus }}>{availability}</div>
                    </div>
                    <img className="w-16 h-16" src="/assets/icons/buy.png" alt="buy_logo" />
                </div>

                <div style={{ color: colors.greyInputText, fontSize: 14, fontFamily: fonts.outfit }}>{address}</div>
            </div>
        </div>
    );
}
