import React from 'react';
import colors, {hexToRgba} from '../styles/colors';
import type { Activity } from '../models/ActivityData';

// Loại trạng thái
// type StatusType = 'Booking' | 'Appointment' | 'Timeline';

interface StatusCardProps {
  activity: Activity,
  activityName: string
}

// Mapping màu theo loại
const statusColors: Record<number, { color: string; badgeText: string }> = {
  2: {
    color: colors.bookedStatus,
    badgeText: 'Booked',
  },
  1: {
    color: colors.activeStatus,
    badgeText: 'Active',
  },
  3: {
    color: colors.reserveStatus,
    badgeText: 'Booked',
  },
};

function formatActivityDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const timeString = date.toLocaleTimeString('en-US', options);
  return isToday ? `Today ${timeString}` : date.toLocaleDateString();
}



const StatusCard: React.FC<StatusCardProps> = ({ activity, activityName }) => {
  const cardColors = statusColors[activity.category];

  if (!cardColors) return null;

  return (
    <div className="flex" style={{ background: hexToRgba(colors.greyLight, 0.6), borderRadius: 10 }}>
      <div
        style={{
          width: 7,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          background: cardColors.color,
        }}
      ></div>

      <div className="flex-1 p-2">
        <div className="flex justify-between items-center">
          <div style={{ fontSize: 16, fontWeight: 700, color: cardColors.color }}>
            {activityName}
          </div>
          <div
            style={{
              background: activity.category == 2 ? cardColors.color : colors.whiteCloud,
              color: activity.category == 2 ? colors.whiteCloud : activity.category == 3 ? colors.bookedStatus : cardColors.color,
              border: activity.category != 2 ? `1px solid ${activity.category == 3 ? colors.bookedStatus : cardColors.color}` : '',
              padding: '6px 12px',
              fontSize: 14,
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            {cardColors.badgeText}
          </div>
        </div>
        <p style={{ fontSize: 16, color: colors.greyIron }}>{activity.activityTitle}</p>
        <p className="text-end" style={{ fontSize: 14, color: colors.greyInputText }}>
          {formatActivityDate(activity.activityDate)}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
