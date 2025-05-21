
import React from "react";
import { Link } from "react-router-dom";
import JobHeader from "@/components/JobHeader";
import JobDetails from "@/components/JobDetails";
import JobOverview from "@/components/JobOverview";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const CompanyDetail = () => {
  const jobData = {
    companyName: "Tech Solutions Vietnam",
    jobTitle: "Senior Frontend Developer",
    companyAvatar: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
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
      "Testing"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chi tiết tuyển dụng</h1>
        <Link to="/jobs/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            <span>Thêm công việc mới</span>
          </Button>
        </Link>
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
      
      <JobOverview
        overview={jobData.overview}
        skills={jobData.skills}
      />
      
      <div className="flex justify-center mt-8 mb-16">
        <Button size="lg" className="px-8 py-6 text-lg font-medium">
          Ứng tuyển ngay
        </Button>
      </div>
    </div>
  );
};

export default CompanyDetail;
