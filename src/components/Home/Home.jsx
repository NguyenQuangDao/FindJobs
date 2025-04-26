import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import LocationSelector from "../../shared/LocationSelector";

const popularLists = ["UI Designer", "UX Researcher", "Android", "Admin"];

const Home = () => {
  // const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  const [valueFindJob, setValueFindJob] = useState("");
  console.log(valueFindJob);

  return (
    <section className="bg-[#F8F8FD] py-10 pb-0 lg:pt-5 lg:py-0 relative z-10 overflow-x-hidden">
      <div className="container relative z-10 w-full overflow-hidden">
        <div className="grid items-center w-full h-full grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left Section */}
          <div className="lg:self-start lg:pt-28">
            <div className="relative">
              <h1 className="text-[40px] xl:text-7xl leading-[1.2] font-semibold font-clashDisplay text-textDarkColor mb-9">
                Khám phá hơn{" "}
                <span className="text-secondryColor">2500+ Việc làm</span>
              </h1>
              <img
                src={"assets/images/Home/vector.svg"}
                className="absolute -bottom-7 w-[200px] lg:w-[250px] right-10"
                alt="Vector decoration"
              />
            </div>
            <p className="text-base leading-7 max-w-[90%] mb-3 text-textGrayColor">
              Nền tảng tuyệt vời cho những người tìm việc đam mê khởi nghiệp và
              đang tìm kiếm những đỉnh cao mới trong sự nghiệp.
            </p>
            {/* Search Bar */}
            <div
              className="lg:py-6 relative  z-20 mt-5 max-w-full mx-auto lg:max-w-[800px] lg:w-full px-5 py-10 rounded-lg shadow-gray-400/15 bg-white shadow-xl"
              style={{ position: "relative" }}
            >
              <div className="flex items-center gap-5 lg:flex-nowrap">
                {/* Job Title Input */}
                <div className="flex items-center w-full h-full gap-3 transition duration-300 border-b focus-within:border-primaryColor/70 group border-textGrayColor/20">
                  <div className="pb-3 transition duration-300 text-textGrayColor group-focus-within:text-primaryColor">
                    <RiSearchLine size={18} />
                  </div>
                  <input
                    type="text"
                    className="w-full pb-2 outline-none text-textDarkColor"
                    placeholder="Tên công việc hoặc Từ khóa"
                    onChange={(e) => {
                      setValueFindJob(e.target.value);
                    }}
                  />
                </div>
                {/* Search Button */}
                <button className="h-full py-3 px-6 bg-primaryColor whitespace-nowrap text-base font-medium cursor-pointer transition duration-300 hover:bg-primaryColor/90 hover:scale-[1.01] text-blue-50 rounded-md w-full lg:w-fit">
                  Tìm kiếm
                </button>
              </div>
              {/* Location Input */}
              <div className="flex items-center gap-2 mt-2">
                <div className="text-textGrayColor">
                  <SlLocationPin size={18} />
                </div>
                <p className="mt-1">Địa điểm</p>
                <LocationSelector />
              </div>
            </div>
            <p className="m-6 text-base text-textGrayColor/80">
              Phổ biến:
              {popularLists.map((list) => (
                <span
                  key={list}
                  className="inline-block px-3 py-2 mb-2 ml-2 text-sm font-medium border rounded-lg cursor-pointer sm:mb-0 text-textGrayColor/70 border-textGrayColor/10 hover:bg-blue-100/20"
                  onClick={() => {
                    setValueFindJob(list);
                  }}
                >
                  {list}
                </span>
              ))}
            </p>
          </div>
          {/* Right Section */}
          <div className="flex-shrink-0 w-full ">
            <img
              src={"assets/images/cta/findjob1.webp"}
              className="lg:ml-auto lg:mx-0 block lg:flex w-[300px] mx-auto xl:w-[450px]"
              alt="Hero representation"
            />
            <div className="w-[280px] h-[716px] rotate-[64deg] bg-white absolute right-0 -bottom-[455px]" />
          </div>
        </div>
        <img
          src={"assets/images/Home/Pattern.svg"}
          className="absolute right-0 w-[860px] top-0 -z-10"
          alt="Background pattern"
        />
      </div>
    </section>
  );
};

export default Home;
