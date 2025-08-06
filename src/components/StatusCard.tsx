import React from 'react';
import colors, { hexToRgba } from '../styles/colors';
import fonts from '../styles/fonts';
import type { Activity, ActivityFilter } from '../models/ActivityData';

interface StatusCardProps {
  activity: Activity,
  activityFilter: ActivityFilter[]
}

// Map colors based on type
const statusColors: Record<number, { color: string; badgeText?: string, tagColor: string, titleColor: string, badgeBackground?: string, badgeTextColor?: string }> = {
  2: {
    color: colors.bookedStatus,
    badgeText: 'Booked',
    tagColor: colors.lightBlue,
    titleColor: colors.bookedStatus,
    badgeBackground: colors.bookedStatus,
    badgeTextColor: colors.whiteCloud
  },
  1: {
    color: colors.activeStatus,
    badgeText: 'Active',
    tagColor: colors.lightGreen,
    titleColor: colors.appointmentColor,
    badgeBackground: colors.Active_Bg,
    badgeTextColor: colors.activeStatus
  },
  3: {
    color: colors.reserveStatus,
    tagColor: colors.lightOrange,
    titleColor: colors.timelineColor,
  },
};

function formatActivityDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeString = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return isToday ? `Today ${timeString}` : date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}



function parseActivityTitle(raw: string): { key: string | null; value: string }[] {
  return raw
    .split(/\r?\n/)
    .map((line) => {
      const parts = line.split(':');

      if (parts.length === 1) {
        return { key: null, value: parts[0].trim() };
      }

      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim();

      if (!key && !value) return null;
      return { key: key || null, value };
    })
    .filter((item): item is { key: string | null; value: string } => item !== null);
}




const StatusCard: React.FC<StatusCardProps> = ({ activity, activityFilter }) => {
  const cardColors = statusColors[activity.category];

  if (!cardColors) return null;

  const parsedTitleMap = parseActivityTitle(activity.activityTitle);

  return (
    <div className="flex" style={{ background: hexToRgba(colors.greyLight, 0.6), borderRadius: 10 }}>
      <div
        style={{
          width: 7,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          background: cardColors.tagColor,
        }}
      ></div>

      <div className="flex-1 p-2">
        <div className="flex justify-between items-center">
          <div style={{ fontSize: 16, fontWeight: 700, color: cardColors.color }}>
            {parsedTitleMap[0].value ?? activityFilter.find(
              (item: ActivityFilter) => item.intId === activity.category)?.description}
          </div>
          {cardColors.badgeBackground && cardColors.badgeTextColor && cardColors.badgeText && (
            <div
              style={{
                background: cardColors.badgeBackground,
                color: cardColors.badgeTextColor,
                padding: '6px 12px',
                fontSize: 14,
                borderRadius: 10,
                fontWeight: 600,
              }}
            >
              {cardColors.badgeText}
            </div>
          )}
        </div>

        <p className='mt-2'></p>
        {parsedTitleMap[1].key &&
          <p style={{ fontSize: 12, color: colors.greyIron, fontFamily: fonts.outfit }}>{parsedTitleMap[1].key}</p>
        }
        {parsedTitleMap[1].value &&
          <p style={{ fontSize: 14, color: colors.greyIron, fontFamily: fonts.outfit }}>{parsedTitleMap[1].value}</p>
        }

        <p className='mt-3'></p>
        {parsedTitleMap[2].key &&
          <p style={{ fontSize: 12, color: colors.greyIron, fontFamily: fonts.outfit }}>{parsedTitleMap[2].key}</p>
        }
        {parsedTitleMap[2].value &&
          <p style={{ fontSize: 14, color: colors.greyIron, fontFamily: fonts.outfit }}>{parsedTitleMap[2].value}</p>
        }

        <p className="text-end" style={{ fontSize: 14, color: colors.greyInputText }}>
          {formatActivityDate(activity.activityDate)}
        </p>
      </div>
    </div>
  );
};


export default StatusCard;
