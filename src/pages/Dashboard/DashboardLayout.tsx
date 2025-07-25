import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import colors from '../../styles/colors';
import { LogOut, Menu, Search, X } from "lucide-react";
import { ImagePaths, IconPaths } from '../../constants/consts';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeKey = location.pathname.split('/')[2] || 'dashboard';

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden text-black relative">
      {/* ===== Sidebar ===== */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-64 bg-white z-50
        flex flex-col justify-between border-r shadow transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        <div>
          <div className="flex items-center justify-between p-6 border-b">
            <img src={ImagePaths.logo} alt="ProMaster Logo" />
            <X className="lg:hidden cursor-pointer" color={colors.redRuby} onClick={() => setSidebarOpen(false)} />
          </div>
          <ul className="space-y-4 text-sm mt-4">
            {menuItems.map((item, idx) => {
              const isActive = activeKey === item.key;
              return (
                <li
                  key={idx}
                  onClick={() => navigate(`/dashboard/${item.key === 'dashboard' ? '' : item.key}`)}
                  className={`flex items-center gap-3 cursor-pointer px-6 py-4 transition-all
                    ${isActive ? 'bg-red-50 border-r-4 border-red-500' : ''}
                  `}
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

      {/* ===== Overlay when sidebar open (mobile only) ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white flex flex-col md:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 shadow">
          {/* Left: Avatar & greeting */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Menu Button - Only on Mobile */}
            <Menu
              className="block lg:hidden cursor-pointer"
              color={colors.redRuby}
              size={26}
              onClick={() => setSidebarOpen(true)}
            />
            <img src={ImagePaths.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-base font-bold text-black">
                Hi, Jayce
                <span
                  className="ml-2 px-2 py-1 rounded-full text-sm font-medium"
                  style={{ background: colors.redRuby, color: colors.whiteCloud }}
                >
                  Team A
                </span>
              </p>
              <p className="text-sm mt-1" style={{ color: colors.greyInputText }}>
                Wednesday, 09:41 AM
              </p>
            </div>
          </div>

          {/* Right: Search + Icons (responsive) */}
          <div className="flex sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border w-full"
              style={{ borderColor: colors.greyCalm }}>
              <Search size={20} color={colors.greyShadow} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm text-black placeholder:text-gray-400 w-full sm:w-40"
              />
            </div>

            <div className="flex gap-2">
              <img src={IconPaths.noti} alt="icon-noti" className="w-8 h-8 cursor-pointer" />
              <img src={IconPaths.help} alt="icon-help" className="w-8 h-8 cursor-pointer" />
            </div>
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
