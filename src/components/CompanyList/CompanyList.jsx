import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Briefcase, MapPin, Building } from "lucide-react";
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from "../../firebase";

// Dữ liệu mẫu - Thay thế bằng fetch từ Firestore
const sampleCompanies = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    logo: "https://placehold.co/100x100?text=Creative+Designs",
    location: "Hanoi, Vietnam",
    industry: "Information Technology",
    description: "Leading provider of innovative tech solutions.",
    jobOpenings: 5,
  },
  {
    id: "2",
    name: "Green Energy Co.",
    logo: "https://placehold.co/100x100?text=Creative+Designs",
    location: "Ho Chi Minh City, Vietnam",
    industry: "Renewable Energy",
    description: "Pioneering sustainable energy for a brighter future.",
    jobOpenings: 3,
  },
  {
    id: "3",
    name: "Designs Solution",
    logo: "https://placehold.co/100x100?text=Creative+Designs",
    location: "Da Nang, Vietnam",
    industry: "Design & Creative",
    description: "Innovative design solutions for modern businesses.",
    jobOpenings: 2,
  },
  {
    id: "4",
    name: "Creative Studio",
    logo: "https://placehold.co/100x100?text=Creative+Designs",
    location: "Da Nang, Vietnam",
    industry: "Design & Creative",
    description: "Innovative design solutions for modern businesses.",
    jobOpenings: 2,
  },

  // Additional 12 items with 2-word names
  {
    id: "5",
    name: "Pixel Forge",
    logo: "https://placehold.co/100x100?text=Pixel+Forge",
    location: "Hue, Vietnam",
    industry: "Graphic Design",
    description: "Creative visuals crafted with precision.",
    jobOpenings: 1,
  },
  {
    id: "6",
    name: "Nova Tech",
    logo: "https://placehold.co/100x100?text=Nova+Tech",
    location: "Hanoi, Vietnam",
    industry: "Software Development",
    description: "Transforming ideas into digital products.",
    jobOpenings: 4,
  },
  {
    id: "7",
    name: "Bright Minds",
    logo: "https://placehold.co/100x100?text=Bright+Minds",
    location: "Can Tho, Vietnam",
    industry: "Education",
    description: "Empowering future leaders through education.",
    jobOpenings: 2,
  },
  {
    id: "8",
    name: "Eco Build",
    logo: "https://placehold.co/100x100?text=Eco+Build",
    location: "Da Lat, Vietnam",
    industry: "Construction",
    description: "Green building solutions for modern cities.",
    jobOpenings: 3,
  },
  {
    id: "9",
    name: "Sky Media",
    logo: "https://placehold.co/100x100?text=Sky+Media",
    location: "Ho Chi Minh City, Vietnam",
    industry: "Media & Advertising",
    description: "Innovative campaigns that make an impact.",
    jobOpenings: 6,
  },
  {
    id: "10",
    name: "Core Labs",
    logo: "https://placehold.co/100x100?text=Core+Labs",
    location: "Hanoi, Vietnam",
    industry: "Research & Development",
    description: "Innovating technology through research.",
    jobOpenings: 2,
  },
  {
    id: "11",
    name: "Urban Space",
    logo: "https://placehold.co/100x100?text=Urban+Space",
    location: "Da Nang, Vietnam",
    industry: "Architecture",
    description: "Designing smart spaces for the future.",
    jobOpenings: 2,
  },
  {
    id: "12",
    name: "Smart Systems",
    logo: "https://placehold.co/100x100?text=Smart+Systems",
    location: "Nha Trang, Vietnam",
    industry: "Automation",
    description: "Streamlining businesses with automation.",
    jobOpenings: 4,
  },
  {
    id: "13",
    name: "Data Hive",
    logo: "https://placehold.co/100x100?text=Data+Hive",
    location: "Hue, Vietnam",
    industry: "Data Analytics",
    description: "Making data-driven decisions easier.",
    jobOpenings: 1,
  },
  {
    id: "14",
    name: "Quantum Soft",
    logo: "https://placehold.co/100x100?text=Quantum+Soft",
    location: "Hanoi, Vietnam",
    industry: "Software Solutions",
    description: "Developing scalable software for enterprise.",
    jobOpenings: 5,
  },
  {
    id: "15",
    name: "Fresh Works",
    logo: "https://placehold.co/100x100?text=Fresh+Works",
    location: "Da Nang, Vietnam",
    industry: "Creative Services",
    description: "Bringing fresh ideas to every project.",
    jobOpenings: 2,
  },
  {
    id: "16",
    name: "Code House",
    logo: "https://placehold.co/100x100?text=Code+House",
    location: "Ho Chi Minh City, Vietnam",
    industry: "Software Engineering",
    description: "Coding future-ready solutions.",
    jobOpenings: 3,
  },
];

const CompanyCard = ({ company }) => {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <Link to={`/companies/${company.id}`} className="hover:underline">
            <CardTitle className="text-xl font-semibold">
              {company.name}
            </CardTitle>
          </Link>
          <p className="text-sm text-muted-foreground flex items-center">
            <Building className="w-4 h-4 mr-1" /> {company.industry}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 min-h-[40px]">
          {company.description}
        </p>
        <div className="text-sm text-gray-500 flex items-center mb-1">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          {company.location}
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <Briefcase className="w-4 h-4 mr-2 text-green-500" />
          {company.jobOpenings} vị trí đang tuyển
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/companies/${company.id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Xem chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // // Fetch companies from Firestore (ví dụ)
    // const fetchCompanies = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "companies"));
    //     const companiesData = querySnapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setCompanies(companiesData);
    //   } catch (err) {
    //     setError("Không thể tải danh sách công ty.");
    //     console.error(err);
    //   }
    //   setLoading(false);
    // };
    // fetchCompanies();

    // Sử dụng dữ liệu mẫu
    setCompanies(sampleCompanies);
    setLoading(false);
    setError(null);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">Đang tải danh sách công ty...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Khám Phá Các Công Ty Hàng Đầu
      </h1>
      {companies.length === 0 && !loading && (
        <p className="text-center text-gray-500">Chưa có công ty nào.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
