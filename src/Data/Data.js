// categories
export const categories = [
  {
    id: 1,
    name: "Design",
    jobs: 235,
    icon: "/assets/images/categories/Icon1.jpg",
  },
  {
    id: 2,
    name: "Sales",
    jobs: 760,
    icon: "/assets/images/categories/Icon2.jpg",
  },
  {
    id: 3,
    name: "Marketing",
    jobs: 400,
    icon: "/assets/images/categories/Icon3.svg",
  },
  {
    id: 4,
    name: "Finance",
    jobs: 150,
    icon: "/assets/images/categories/Icon4.jpg",
  },
  {
    id: 5,
    name: "Technology",
    jobs: 320,
    icon: "/assets/images/categories/Icon5.jpg",
  },
  {
    id: 6,
    name: "Engineering",
    jobs: 543,
    icon: "/assets/images/categories/Icon6.jpg",
  },
  {
    id: 7,
    name: "Bussiness",
    jobs: 200,
    icon: "/assets/images/categories/Icon7.jpg",
  },
  {
    id: 8,
    name: "Human Resources",
    jobs: 320,
    icon: "/assets/images/categories/Icon.jpg",
  },
];

// jobPosts
export const jobPosts = [
  {
    id: 1,
    title: "Product Designer",
    application: 25,
    description:
      "Doing the right thing for investors is what we're all about at Vanguard, and that in..",
    companyName: "MetaMask",
    role: ["Entry Role", "Full-Time", "Remote"],
    salary: 250,
    date: "12 ngày trước",
    logo: "/assets/images/featured-jobs/meta.png",
  },
  {
    id: 2,
    title: "Sr. UX Designer",
    application: 14,
    description:
      "Netflix is one of the world's leading streaming entertaining service with o..",
    companyName: "Netflix",
    role: ["Expert", "Full-Time", "Remote"],
    salary: 14,
    date: "5 ngày trước",
    logo: "/assets/images/featured-jobs/netflix.png",
  },
  {
    id: 3,
    title: "Product Engineer",
    application: 58,
    description:
      "Welcome to lightspeed LA, the first U.S based, AAA game development studio..",
    companyName: "Microsoft",
    role: ["Intermediate", "Full-Time"],
    salary: 210,
    date: "4 ngày trước",
    logo: "/assets/images/featured-jobs/microsoft.png",
  },
  {
    id: 4,
    title: "Product Designer",
    application: 13,
    description:
      "Prelin is how banks anboard their customers for bussiness checking accou..",
    companyName: "Reddit",
    role: ["Expert", "Part-Time"],
    salary: 120,
    date: "22 ngày trước",
    logo: "/assets/images/featured-jobs/reddit.png",
  },
  {
    id: 5,
    title: "Backend Dev.",
    application: 21,
    description:
      "Coalifire is an a mission to make the world a safe place by solving our client..",
    companyName: "Google",
    role: ["Intermediate", "Full-Time"],
    salary: 260,
    date: "5 ngày trước",
    logo: "/assets/images/featured-jobs/google.png",
  },
  {
    id: 6,
    title: "SMM Manager",
    application: 73,
    description:
      "Join us as we increase access to banking and financial services, helping banks an...",
    companyName: "Spotify",
    role: ["Intermediate", "Full-Time", "Part Time"],
    salary: 170,
    date: "8 ngày trước",
    logo: "/assets/images/featured-jobs/spotify.png",
  },
];

// latest jobs
export const latestJobLists = [
  {
    id: 1,
    title: "Socila Media Assistant",
    logo: "/assets/images/latest-jobs/company.jpg",
    location: "Paris, France",
    companyName: "Nomad",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 2,
    title: "Brand Designer",
    logo: "/assets/images/latest-jobs/company2.jpg",
    location: "San Fransisco, USA",
    companyName: "Dropbox",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 3,
    title: "Interactive Developer",
    logo: "/assets/images/latest-jobs/company3.jpg",
    location: "Hamburg, Germany",
    companyName: "Terraform",
    JobType: "Part-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 4,
    title: "HR Manager ",
    logo: "/assets/images/latest-jobs/company4.jpg",
    location: "Lucern, Switzerland",
    companyName: "Packer",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 5,
    title: "Social Media Assistant",
    logo: "/assets/images/latest-jobs/company5.jpg",
    location: "Paris, France",
    companyName: "Netlify",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 6,
    title: "Brand Designer",
    logo: "/assets/images/latest-jobs/company6.jpg",
    location: "San Fransisco, USA",
    companyName: "Maze",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 7,
    title: "Interactive Developer",
    logo: "/assets/images/latest-jobs/company7.jpg",
    location: "Hamburg, Germany",
    companyName: "Udacity",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
  {
    id: 8,
    title: "HR Manager ",
    logo: "/assets/images/latest-jobs/company8.jpg",
    location: "Lucern, Switzerland",
    companyName: "Webflow",
    JobType: "Full-Time",
    jobFields: [
      { name: "Marketing", value: true },
      { name: "Design", value: true },
    ],
  },
];

// footer

export const footerLinks = [
  {
    title: "Chúng tôi",
    links: [
      { name: "Các công ty", url: "/companies" },
      { name: "Bảng giá", url: "/pricing" },
      { name: "Điều khoản", url: "/terms" },
      { name: "Tư vấn", url: "#advice" },
      { name: "Chính sách bảo mật", url: "#privacy-policy" },
    ],
  },
  {
    title: "Tài nguyên",
    links: [
      { name: "Tài liệu trợ giúp", url: "/docs" },
      { name: "Hướng dẫn", url: "/guide" },
      { name: "Cập nhật", url: "/update" },
      { name: "Liên hệ", url: "/contact" },
    ],
  },
];

// Job listing data
export const jobListings = [
  {
    id: 1,
    title: "Designer UI/UX",
    companyName: "ELITE LIMITED",
    description:
      "We are looking for figma designers who can help desiging the entire mobile application ...",
    skills: ["UI Designer", "Reactjs", "Landing Page", "NextJs"],
    rating: { star: 4.6, evaluate: 40 },
    verified: true,
    proposals: "10",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company1.png",
  },
  {
    id: 2,
    title: "Figma Designer",
    companyName: "ELITE LIMITED",
    description:
      "We are looking for figma designers who can help desiging the entire mobile application ...",
    skills: ["UI Designer", "Figma", "Landing Page"],
    rating: { star: 3.5, evaluate: 40 },
    verified: true,
    proposals: "7",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company2.png",
  },
  {
    id: 3,
    title: "Back End Developper",
    companyName: "ELITE LIMITED",
    description: "We are looking for Back End Developpe mobile application ...",
    skills: ["Java", "NodeJs", "Ruby"],
    rating: { star: 4.0, evaluate: 40 },
    verified: true,
    proposals: "4",
    fileCount: 112,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company3.png",
  },
  {
    id: 4,
    title: "Mobile App UI Designer",
    description:
      "Looking for a talented designer create intuitive and engaging UI for our iOS and Android applications...",
    skills: ["Mobile UI", "Figma", "iOS Design"],
    rating: { star: 2.5, evaluate: 40 },
    verified: true,
    proposals: "15",
    fileCount: 164,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company4.png",
  },
  {
    id: 5,
    title: "Product Designer",
    description:
      "We're seeking a product designer who can help us redesign our SaaS platform with focus on simplicity and functionality...",
    skills: ["Product Design", "UX Research", "Prototyping"],
    rating: { star: 5.0, evaluate: 40 },
    verified: true,
    proposals: "8",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company5.png",
  },
  {
    id: 6,
    title: "Brand Identity Designer",
    description:
      "Our startup needs a complete brand identity package including logo, color scheme, and brand guidelines...",
    skills: ["Brand Design", "Logo Design", "Typography"],
    rating: { star: 4.5, evaluate: 40 },
    verified: false,
    proposals: "30",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company6.png",
  },
  {
    id: 7,
    title: "E-commerce UI Designer",
    description:
      "We need a specialist revamp our e-commerce store with a focus on conversion optimization and user engagement...",
    skills: ["E-commerce Design", "Figma", "Conversion Optimization"],
    rating: { star: 3.5, evaluate: 40 },
    verified: true,
    proposals: "12",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company7.png",
  },
  {
    id: 8,
    title: "Dashboard UI Designer",
    description:
      "Looking for someone design an intuitive analytics dashboard that presents complex data in a user-friendly way...",
    skills: ["Dashboard Design", "Data Visualization", "Figma"],
    rating: { star: 4.0, evaluate: 40 },
    verified: true,
    proposals: "7",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company8.png",
  },
  {
    id: 9,
    title: "Landing Page Specialist",
    description:
      "We need a designer create high-converting landing pages for our marketing campaigns with A/B testing variations...",
    skills: ["Landing Pages", "Conversion Design", "A/B Testing"],
    rating: { star: 3.5, evaluate: 40 },
    verified: true,
    proposals: "15",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company1.png",
  },
  {
    id: 10,
    title: "Design System Creator",
    description:
      "We're looking for someone develop a comprehensive design system for our products ensure consistency across platforms...",
    skills: ["Design Systems", "Component Libraries", "Figma"],
    rating: { star: 5.0, evaluate: 40 },
    verified: true,
    proposals: "5",
    fileCount: 144,
    linkCompany: "http://localhost:5173/jobListMain",
    companyLogo: "assets/logoCompany/company2.png",
  },
];

// profile
export const profile = {
  name: "Nguyễn Quang Đạo",
  email: "nguyenquangdao@gmail.com",
  phone: "0912345678",
  dob: "1998-05-20",
  gender: "Nam",
  address: "123 Đường Văn Tiến Dũng, Quận Bắc Từ Liêm, TP.Hà Nội",
  education: "Đại học Bách Khoa Hà Nội",
  social: [
    { name: "LinkedIn", link: "https://www.linkedin.com/in/nguyenquangdao" },
    {name: "Facebook", link: "https://facebook.com/nguyenquangdao"},
  ],
  avatar: "/assets/images/avatar/avatar1.jpg",
  experience:
    "3 năm làm lập trình viên Frontend tại Công ty ABC. Thành thạo ReactJS, HTML, CSS, JavaScript.",
  skills: ["ReactJS", "JavaScript", "HTML", "CSS", "Git"],
  cvFile: "/assets/cv/nguyenvana_cv.pdf",
};
