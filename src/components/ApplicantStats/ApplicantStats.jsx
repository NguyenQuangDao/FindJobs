import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, CheckCircle, Clock } from 'lucide-react';
// Dữ liệu mẫu
const applicantData = {
  totalApplicants: 125,
  statusDistribution: [
    { name: 'Mới ứng tuyển', value: 60, color: '#8884d8' },
    { name: 'Đang phỏng vấn', value: 30, color: '#82ca9d' },
    { name: 'Đã nhận việc', value: 15, color: '#ffc658' },
    { name: 'Từ chối', value: 20, color: '#ff8042' },
  ],
  applicantsOverTime: [
    { month: 'Tháng 1', count: 10 },
    { month: 'Tháng 2', count: 25 },
    { month: 'Tháng 3', count: 40 },
    { month: 'Tháng 4', count: 50 },
  ],
  topSkills: [
    { skill: 'ReactJS', count: 70 },
    { skill: 'Node.js', count: 55 },
    { skill: 'Python', count: 40 },
    { skill: 'AWS', count: 30 },
    { skill: 'UI/UX Design', count: 25 },
  ]
};

const StatCard = ({ title, value, icon, color }) => {
    const IconComponent = icon;
    return (
      <div className={`p-6 rounded-lg shadow-lg bg-white border-l-4 border-${color}-500`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
            <IconComponent className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  }

// const ApplicantStats = ({ jobId, companyId }) => {
    const ApplicantStats = () => {
  // Sau này sẽ fetch dữ liệu dựa trên jobId hoặc companyId
  const data = applicantData;

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Thống Kê Ứng Viên</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Tổng ứng viên" value={data.totalApplicants} icon={Users} color="blue" />
        <StatCard title="Đã nhận việc" value={data.statusDistribution.find(s => s.name === 'Đã nhận việc')?.value || 0} icon={CheckCircle} color="green" />
        <StatCard title="Đang phỏng vấn" value={data.statusDistribution.find(s => s.name === 'Đang phỏng vấn')?.value || 0} icon={Clock} color="yellow" />
        <StatCard title="Ứng tuyển mới" value={data.statusDistribution.find(s => s.name === 'Mới ứng tuyển')?.value || 0} icon={TrendingUp} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Phân Bố Trạng Thái Ứng Viên</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {data.statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Số Lượng Ứng Viên Theo Thời Gian</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.applicantsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" name="Số ứng viên" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Các Kỹ Năng Phổ Biến Của Ứng Viên</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topSkills} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="skill" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ffc658" name="Số ứng viên có kỹ năng" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ApplicantStats;