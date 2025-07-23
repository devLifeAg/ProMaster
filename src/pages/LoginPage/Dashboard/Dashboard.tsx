import { Card, CardContent } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { ScrollArea } from "../../../components/scrollArea";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import colors from '../../../styles/colors';
import { CircleChart } from "../../../components/CircleChart";

const chartData = [
  { label: "Available", value: 42, color: colors.availableStatus },
  { label: "Booked", value: 67, color: colors.brookedStatus },
  { label: "Reserved", value: 130, color: colors.reserveStatus },
];

const floorData = [
  { time: "8AM", floor: 2 },
  { time: "12PM", floor: 4 },
  { time: "4PM", floor: 3 },
  { time: "8PM", floor: 4 },
  { time: "12AM", floor: 5 },
  { time: "4AM", floor: 5 },
];

const menuItems = [
  { label: "Dashboard", icon: "/assets/icons/dashboard.png" },
  { label: "Showcase", icon: "/assets/icons/showcase.png" },
  { label: "Bookings", icon: "/assets/icons/booking.png" },
  { label: "Contacts", icon: "/assets/icons/contacts.png" },
  { label: "Appointment", icon: "/assets/icons/appointment.png" },
  { label: "Approval", icon: "/assets/icons/approval.png" },
  { label: "Enquiry", icon: "/assets/icons/enquiry.png" },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden text-black">

      {/* Sidebar */}
      <aside className="w-64 bg-white text-black p-6 flex flex-col justify-between border-r">
        <div>
          <div className="flex items-center justify-between mb-8">
            <img src="/assets/logo.png" alt="ProMaster Logo" />
            <Menu color="#EF4444" size={24} />
          </div>
          <ul className="space-y-4 text-sm">
            {menuItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 cursor-pointer" style={{ color: colors.blackDark }}>
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <Button variant="ghost" className="w-full mt-10 text-red-500 border-none">Log Out</Button>
      </aside>

      {/* Main layout */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="p-6 bg-white flex items-center justify-between shadow">
          <div className="flex items-center gap-4">
            <img
              src="/assets/image.jpg"
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 700 }}>
                Hi, Jayce
                <span className="ml-2 px-2 py-0.5 rounded-full" style={{ color: colors.whiteCloud, fontSize: '16px', fontWeight: 500, background: colors.redRuby }}>
                  Team A
                </span>
              </p>
              <p style={{ color: colors.greyInputText, fontSize: '16px', fontWeight: 400, marginTop: '8px' }}>Wednesday, 09:41 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm"
            />
            <Bell className="text-gray-500" />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">

          {/* Projects */}
          <Card className="mb-6">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>
                  <span className="text-lg font-bold mr-3" style={{ color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}>Projects</span>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-md flex items-center gap-1">
                    Selling Fast
                    <ChevronDown size={14} />
                  </Button>
                </span>
                <div style={{ fontSize: '16px', color: colors.redRuby }}>See All</div>
              </div>
              <div className="flex gap-4">
                {['Aurora Heights', 'Skyline Park', 'Nova Vista'].map((project, idx) => (
                  <div key={idx} className="relative w-1/3 rounded-xl overflow-hidden shadow">
                    <img src='/assets/image.jpg' alt={project} className="w-full h-64 object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Selling Fast</div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <p className="font-semibold text-sm">{project}</p>
                      <p className="text-xs">Jln Bersatu, Taman Bukit Serdang</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-6 flex-1">
            {/* Statistics */}
            <div className="flex-1 grid grid-cols-1 gap-6">
              <Card>
                <CardContent>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold mb-6" style={{ color: colors.blackDark, fontSize: '20px', fontWeight: 700 }}>
                      Statistics
                    </span>

                    <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>
                      By Property
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>
                          Unit Status
                        </p>
                        <ChevronDown size={22} color={colors.redRuby} />
                      </div>
                      <Button
                        variant="custom"
                        className="rounded-full flex items-center gap-4"
                        style={{
                          padding: '6px 16px',
                          border: `1px solid ${colors.redRuby}`,
                          color: colors.blackDark,
                          fontSize: '14px',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Property
                        <ChevronDown size={14} />
                      </Button>
                    </div>
                  </div>

                  <CircleChart
                    title="Property 1"
                    total={42}
                    data={chartData}
                  />

                  <div className="flex flex-col mt-8">
                    <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>
                      By Personnel
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>
                          Sale Status
                        </p>
                        <ChevronDown size={22} color={colors.redRuby} />
                      </div>
                      <Button
                        variant="custom"
                        className="rounded-full flex items-center gap-4"
                        style={{
                          padding: '6px 16px',
                          border: `1px solid ${colors.redRuby}`,
                          color: colors.blackDark,
                          fontSize: '14px',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Group
                        <ChevronDown size={14} />
                      </Button>
                    </div>

                    <CircleChart
                      title="Team A"
                      total={42}
                      data={chartData}
                    />
                  </div>

                  <div className="flex flex-col mt-8">
                    <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>
                      By Period
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>
                          Sales Today
                        </p>
                        <ChevronDown size={22} color={colors.redRuby} />
                      </div>
                      <Button
                        variant="custom"
                        className="rounded-full flex items-center gap-4"
                        style={{
                          padding: '6px 16px',
                          border: `1px solid ${colors.redRuby}`,
                          color: colors.blackDark,
                          fontSize: '14px',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Group
                        <ChevronDown size={14} />
                      </Button>
                    </div>

                    <CircleChart
                      title="Team A"
                      total={42}
                      data={chartData}
                    />
                  </div>

                  <div className="mb-4" style={{ color: colors.blackDark, fontSize: '16px', fontWeight: 400 }}>
                    By Property
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <p style={{ color: colors.redRuby, fontSize: '20px', fontWeight: 700 }}>
                        Unit Status
                      </p>
                      <ChevronDown size={22} color={colors.redRuby} />
                    </div>
                    <Button
                      variant="custom"
                      className="rounded-full flex items-center gap-4"
                      style={{
                        padding: '6px 16px',
                        border: `1px solid ${colors.redRuby}`,
                        color: colors.blackDark,
                        fontSize: '14px',
                        backgroundColor: 'transparent'
                      }}
                    >
                      Group
                      <ChevronDown size={14} />
                    </Button>
                    {/* thay chỗ này thành chart như trong ảnh  */}
                    <CircleChart
                      title="Team A"
                      total={42}
                      data={chartData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities */}
            <Card className="w-80">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Activities</h3>
                  <Button variant="ghost" className="text-red-500 text-xs">View More</Button>
                </div>
                <ScrollArea className="h-[300px] space-y-4">
                  <div className="p-2 bg-blue-50 rounded text-xs">
                    <p className="font-bold text-blue-500">Booking <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full ml-2">Booked</span></p>
                    <p className="text-gray-500">Aurora Heights A-03-11 Booked Successfully.</p>
                    <p className="text-right text-gray-400">Today 11:30 AM</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-xs">
                    <p className="font-bold text-blue-500">Booking <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full ml-2">Booked</span></p>
                    <p className="text-gray-500">Skyline Park B-11-08 Booked Successfully.</p>
                    <p className="text-right text-gray-400">Today 11:30 AM</p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
