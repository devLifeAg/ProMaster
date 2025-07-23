import React from 'react';
import colors from '../styles/colors';

// Loại trạng thái
type StatusType = 'Booking' | 'Appointment' | 'Timeline';

interface StatusCardProps {
  type: StatusType;
  contact?: string;
  note: string;
  time: string;
}

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Mapping màu theo loại
const statusColors = {
  Booking: {
    color: colors.brookedStatus,
    badgeText: 'Booked',
  },
  Appointment: {
    color: colors.activeStatus,
    badgeText: 'Active',
  },
  Timeline: {
    color: colors.reserveStatus,
    badgeText: 'Booked',
  },
};

const StatusCard: React.FC<StatusCardProps> = ({ type, note, time, contact }) => {
  const cardColors = statusColors[type];

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
            {type}
          </div>
          <div
            style={{
              background: type == 'Booking' ? cardColors.color : colors.whiteCloud,
              color: type == 'Booking' ? colors.whiteCloud : type == 'Timeline' ? colors.brookedStatus : cardColors.color,
              border: type != 'Booking' ? `1px solid ${type == 'Timeline' ? colors.brookedStatus : cardColors.color}` : '',
              padding: '6px 12px',
              fontSize: 14,
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            {cardColors.badgeText}
          </div>
        </div>
        {contact && (
          <div>
            <div style={{ fontSize: 12, color: colors.greyShadow }}>
              Contact
            </div>
            <p style={{ fontSize: 16, color: colors.greyIron }}>{contact}</p>
          </div>
        )}
        {contact && (
          <div style={{ fontSize: 12, color: colors.greyShadow, marginTop:'8px' }}>
            Note
          </div>
        )}
        <p style={{ fontSize: 16, color: colors.greyIron }}>{note}</p>
        <p className="text-end" style={{ fontSize: 14, color: colors.greyInputText }}>
          {time}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
