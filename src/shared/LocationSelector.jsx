import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_LOCATION } from "./constants/app";

const LocationSelector = () => {
  // State cho danh sách
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  //   const [wards, setWards] = useState([]);

  // State cho giá trị đang được chọn (lưu code)
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  //   const [selectedWard, setSelectedWard] = useState("");

  // State cho trạng thái loading (tùy chọn, để cải thiện UX)
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  //   const [loadingWards, setLoadingWards] = useState(false);

  // --- Effects để gọi API ---

  // 1. Lấy danh sách Tỉnh/Thành phố khi component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const response = await axios.get(`${API_LOCATION}p/`);
        setProvinces(response.data || []);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        // Xử lý lỗi nếu cần
      } finally {
        setLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []); // Mảng dependency rỗng = chạy 1 lần khi mount

  // 2. Lấy danh sách Quận/Huyện khi Tỉnh/Thành phố thay đổi
  useEffect(() => {
    // Chỉ gọi API khi có selectedProvince
    if (selectedProvince) {
      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        setDistricts([]); // Reset danh sách cũ
        // setWards([]); // Reset danh sách phường/xã
        setSelectedDistrict(""); // Reset quận/huyện đã chọn
        // setSelectedWard(""); // Reset phường/xã đã chọn

        try {
          // API yêu cầu depth=2 để lấy cả danh sách quận/huyện
          const response = await axios.get(
            `${API_LOCATION}p/${selectedProvince}?depth=2`
          );
          setDistricts(response.data?.districts || []);
        } catch (error) {
          console.error("Error fetching districts:", error);
        } finally {
          setLoadingDistricts(false);
        }
      };
      fetchDistricts();
    } else {
      // Nếu không chọn tỉnh nào, reset hết cấp dưới
      setDistricts([]);
      //   setWards([]);
      setSelectedDistrict("");
      //   setSelectedWard("");
    }
  }, [selectedProvince]); // Chạy lại khi selectedProvince thay đổi

  //   // 3. Lấy danh sách Phường/Xã khi Quận/Huyện thay đổi
  //   useEffect(() => {
  //     if (selectedDistrict) {
  //       const fetchWards = async () => {
  //         setLoadingWards(true);
  //         setWards([]); // Reset danh sách cũ
  //         setSelectedWard(""); // Reset phường/xã đã chọn

  //         try {
  //           // API yêu cầu depth=2 để lấy cả danh sách phường/xã
  //           const response = await axios.get(
  //             `${API_LOCATION}d/${selectedDistrict}?depth=2`
  //           );
  //           setWards(response.data?.wards || []);
  //         } catch (error) {
  //           console.error("Error fetching wards:", error);
  //         } finally {
  //           setLoadingWards(false);
  //         }
  //       };
  //       fetchWards();
  //     } else {
  //       // Nếu không chọn quận/huyện nào, reset cấp dưới
  //       setWards([]);
  //       setSelectedWard("");
  //     }
  //   }, [selectedDistrict]); // Chạy lại khi selectedDistrict thay đổi

  // --- Handlers khi người dùng thay đổi lựa chọn ---

  const handleProvinceChange = (event) => {
    const provinceCode = event.target.value;
    setSelectedProvince(provinceCode);
  };

  const handleDistrictChange = (event) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
  };

  //   const handleWardChange = (event) => {
  //     const wardCode = event.target.value;
  //     setSelectedWard(wardCode);
  //   };

  return (
    <div className="flex gap-2.5">
      {/* Select Tỉnh/Thành phố */}
      <div>
        <select
          className="mt-[5px] py-2 px-[10px] border border-gray-300 rounded-[5px] w-max cursor-pointer"
          id="province"
          value={selectedProvince || ""}
          onChange={handleProvinceChange}
          disabled={loadingProvinces}
        >
          <option value="">Tỉnh/Thành phố</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
        {loadingProvinces && <span> Đang tải...</span>}
      </div>

      {/* Select Quận/Huyện */}
      <div>
        <select
          className="mt-[5px] py-2 px-[10px] border border-gray-300 rounded-[5px] w-max"
          id="district"
          value={selectedDistrict || ""}
          onChange={handleDistrictChange}
          // Disable khi chưa chọn Tỉnh/TP hoặc đang load
          disabled={!selectedProvince || loadingDistricts}
        >
          <option value="">Quận/Huyện</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
        {loadingDistricts && <span> Đang tải...</span>}
      </div>

      {/* Select Phường/Xã */}
      {/* <div style={{ marginTop: "10px" }}>
        <select
          id="ward"
          value={selectedWard}
          onChange={handleWardChange}
          disabled={!selectedDistrict || loadingWards}
        >
          <option value="">Chọn Phường/Xã</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
        {loadingWards && <span> Đang tải...</span>}
      </div> */}
    </div>
  );
};

export default LocationSelector;
