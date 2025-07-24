import { useNavigate, Outlet, useLocation } from "react-router-dom";
import colors from '../../styles/colors';
import { LogOut, Menu, Search } from "lucide-react";
import {ImagePaths, IconPaths} from '../../constants/consts';

const menuItems = [
  { label: "Dashboard", icon: IconPaths.dashboard, key: "dashboard" },
  { label: "Showcase", icon: IconPaths.showcase, key: "Showcase" },
  { label: "Bookings", icon: IconPaths.bookings, key: "Bookings" },
  { label: "Contacts", icon: IconPaths.contacts, key: "Contacts" },
  { label: "Appointment", icon: IconPaths.appointment, key: "Appointment" },
  { label: "Approval", icon: IconPaths.approval, key: "Approval" },
  { label: "Enquiry", icon: IconPaths.enquiry, key: "Enquiry" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname.split('/')[2] || 'dashboard';

  return (
    <div className="flex h-screen overflow-hidden text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black flex flex-col shadow justify-between border-r">
        <div>
          <div className="flex items-center justify-between mb-8 p-6">
            <img src={ImagePaths.logo} alt="ProMaster Logo" />
            <Menu color="#EF4444" size={26} />
          </div>
          <ul className="space-y-4 text-sm">
            {menuItems.map((item, idx) => {
              const isActive = activeKey === item.key;
              return (
                <li
                  key={idx}
                  onClick={() => navigate(`/dashboard/${item.key === 'dashboard' ? '' : item.key}`)}
                  className={`flex items-center gap-3 cursor-pointer px-6 py-4 transition-all ${isActive ? 'bg-red-50 border-r-4 border-red-500' : ''
                    }`}
                  style={{ color: isActive ? colors.redRuby : colors.blackDark }}
                >
                  <img src={item.icon} alt={item.label} className="w-6 h-6" />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer mt-10 p-6"
          onClick={() => navigate('/')}
        >
          <LogOut color={colors.redRuby} size={20} />
          <span style={{ color: colors.redRuby, fontWeight: 500 }}>Log Out</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-white flex items-center justify-between shadow">
          <div className="flex items-center gap-4">
            <img src={ImagePaths.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 700 }}>
                Hi, Jayce
                <span
                  className="ml-2 px-2 py-1 rounded-full"
                  style={{ color: colors.whiteCloud, fontSize: '16px', fontWeight: 500, background: colors.redRuby }}
                >
                  Team A
                </span>
              </p>
              <p
                style={{
                  color: colors.greyInputText,
                  fontSize: '16px',
                  fontWeight: 400,
                  marginTop: '8px',
                }}
              >
                Wednesday, 09:41 AM
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border" style={{borderColor: colors.greyCalm}}>
              <Search size={20} color={colors.greyShadow} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm text-black placeholder:text-gray-400"
              />
            </div>

            <img src={IconPaths.noti} alt="icon-noti" className="w-10 h-10 cursor-pointer" />
            <img src={IconPaths.help} alt="icon-help" className="w-10 h-10 cursor-pointer" />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
