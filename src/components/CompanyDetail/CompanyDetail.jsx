import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

// Thêm các component tạm thời phía trên CompanyDetail
const JobHeader = ({
  companyName,
  jobTitle,
  companyAvatar,
  companyWebsite,
}) => (
  <div className="flex items-center gap-4 mb-6">
    <img
      src={companyAvatar}
      alt={companyName}
      className="w-16 h-16 rounded-full border"
    />
    <div>
      <h2 className="text-xl font-bold">{jobTitle}</h2>
      <a
        href={companyWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm"
      >
        {companyName}
      </a>
    </div>
  </div>
);

const JobDetails = ({ salary, location, experience, deadline, openings }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div>
      <strong>Lương:</strong> {salary}
    </div>
    <div>
      <strong>Địa điểm:</strong> {location}
    </div>
    <div>
      <strong>Kinh nghiệm:</strong> {experience}
    </div>
    <div>
      <strong>Hạn nộp:</strong> {deadline}
    </div>
    <div>
      <strong>Số lượng tuyển:</strong> {openings}
    </div>
  </div>
);

const JobOverview = ({ overview, skills }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">Mô tả công việc</h3>
    <p className="mb-2 whitespace-pre-line">{overview}</p>
    <h4 className="font-semibold mt-4 mb-1">Kỹ năng yêu cầu:</h4>
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <li
          key={idx}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </li>
      ))}
    </ul>
  </div>
);
const CompanyDetail = () => {
  const jobData = {
    companyName: "Tech Solutions Vietnam",
    jobTitle: "Senior Frontend Developer",
    companyAvatar:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    companyWebsite: "https://techsolutions.example.com",
    salary: "25,000,000 - 40,000,000 VNĐ",
    location: "Hà Nội, Việt Nam",
    experience: "3+ năm",
    deadline: "30/06/2025",
    openings: 2,
    overview: `Tech Solutions Vietnam đang tìm kiếm Senior Frontend Developer có kinh nghiệm để tham gia vào đội ngũ phát triển của chúng tôi.

Bạn sẽ đóng vai trò quan trọng trong việc xây dựng và duy trì các ứng dụng web hiệu suất cao, dễ sử dụng và có tính mở rộng. Bạn sẽ làm việc với các công nghệ mới nhất và các thực hành tốt nhất trong ngành.

Trách nhiệm chính:
• Phát triển các ứng dụng web hiện đại sử dụng ReactJS
• Tối ưu hóa hiệu suất và trải nghiệm người dùng
• Làm việc với API và tích hợp backend
• Phối hợp với đội ngũ UI/UX để triển khai các thiết kế
• Mentor các developer junior và tham gia code review

Đãi ngộ:
• Chế độ bảo hiểm sức khỏe toàn diện
• Lương tháng 13 và thưởng hiệu suất
• 15 ngày nghỉ phép mỗi năm
• Môi trường làm việc linh hoạt và năng động`,
    skills: [
      "ReactJS",
      "TypeScript",
      "Redux",
      "REST API",
      "Responsive Design",
      "Performance Optimization",
      "Git",
      "Testing",
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chi tiết tuyển dụng</h1>
        {/* <Link to="/jobs/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            <span>Thêm công việc mới</span>
          </Button>
        </Link> */}
      </div>

      <JobHeader
        companyName={jobData.companyName}
        jobTitle={jobData.jobTitle}
        companyAvatar={jobData.companyAvatar}
        companyWebsite={jobData.companyWebsite}
      />

      <JobDetails
        salary={jobData.salary}
        location={jobData.location}
        experience={jobData.experience}
        deadline={jobData.deadline}
        openings={jobData.openings}
      />

      <JobOverview overview={jobData.overview} skills={jobData.skills} />

      <div className="flex justify-center mt-8 mb-16">
        <Button size="lg" className="px-8 py-6 text-lg font-medium">
          Ứng tuyển ngay
        </Button>
      </div>
    </div>
  );
};

export default CompanyDetail;
