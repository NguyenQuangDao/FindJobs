import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Button, Input, Select, Space, Tooltip, Upload } from "antd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { db, storage } from "../../firebase";
import { useCommonMessage } from "../../shared/CommonMessage";
import UploadIamge from "../../shared/UploadIamge";
import "../../style/Profile.css";
import { socialOptions } from "../../utils";
import { useAppContext } from "../../AppProvider/AppProvider";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const { alertError, alertSuccess } = useCommonMessage();
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          data.businessName = data.name;
          setForm({ ...data });
          setPreview(docSnap.data().avatar);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" || name === "cvFile") {
      setForm({ ...form, [name]: files[0] });
      if (name === "avatar" && files[0]) {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSocialChange = (index, field, value) => {
    const newSocial = [...form.social];
    newSocial[index][field] = value;
    setForm({ ...form, social: newSocial });
  };

  const handleAddSocial = () => {
    setForm({ ...form, social: [...form.social, { name: "", link: "" }] });
  };

  const handleRemoveSocial = (index) => {
    const newSocial = form.social.filter((_, i) => i !== index);
    setForm({ ...form, social: newSocial });
  };

  const [skillOptions, setSkillOptions] = useState([]);
  const debounceRef = useRef();

  const fetchSkills = (query) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (!query) {
        setSkillOptions([]);
        return;
      }
      fetch(
        `https://api.apilayer.com/skills?q=${encodeURIComponent(
          query
        )}&count=10`,
        {
          method: "GET",
          headers: {
            apikey: "95eIlIbroVTBqCOMzWPbrqhLW1cA3S16",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          let options = [];
          if (Array.isArray(data) && data.length > 0) {
            options = data?.map((skill) => ({
              label: skill,
              value: skill,
            }));
            // Nếu không có skill nào trùng với query, thêm query vào đầu danh sách
            if (
              !data.some((skill) => skill.toLowerCase() === query.toLowerCase())
            ) {
              options.unshift({ label: query, value: query });
            }
          } else {
            // Không có kết quả, thêm query làm option duy nhất
            options = [{ label: query, value: query }];
          }
          setSkillOptions(options);
        })
        .catch(() => setSkillOptions([{ label: query, value: query }]));
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^(0|\+84)(\d{9})$/;

    if (!user) {
      alertError(
        "Người dùng chưa đăng nhập. Không thể thực hiện hành động này!"
      );
      navigate("/login");
      return;
    }
    const userId = user.uid;

    if (form?.accountType === "business") {
      // update thông tin doanh nghiệp
      if (!form.businessName?.trim()) {
        alertError("Vui lòng nhập tên doanh nghiệp!");
        return;
      }
      if (!form.taxCode?.trim() || !/^\d{10,}$/.test(form.taxCode)) {
        alertError("Mã số thuế không hợp lệ (yêu cầu ít nhất 10 chữ số)!");
        return;
      }
      if (!form.businessAddress?.trim()) {
        alertError("Vui lòng nhập địa chỉ doanh nghiệp!");
        return;
      }
      if (!form.businessLicense) {
        alertError("Vui lòng tải lên giấy phép kinh doanh!");
        return;
      }
      if (!form.numberOfMembers || form.numberOfMembers < 1) {
        alertError("Số lượng thành viên phải lớn hơn 0!");
        return;
      }
      if (!/^(http|https):\/\/[^ "]+$/.test(form.website)) {
        alertError("URL website không hợp lệ!");
        return;
      }
      if (!form.businessLicense) {
        alertError("Vui lòng tải lên giấy phép kinh doanh!");
        return;
      }
      try {
        let avatarUrl = form.avatar; // Giữ URL hiện tại hoặc null nếu chưa có
        const avatarFileToUpload = form.avatar;

        if (avatarFileToUpload && typeof avatarFileToUpload !== "string") {
          // Nếu là File object, tức là file mới/thay đổi
          if (!(avatarFileToUpload instanceof File)) {
            alertError("Tệp avatar không hợp lệ. Vui lòng chọn lại.");
            console.error(
              "Đối tượng tệp avatar không hợp lệ:",
              avatarFileToUpload
            );
            return;
          }
          const avatarRef = ref(
            storage,
            `avatars/${userId}/${avatarFileToUpload.name}_${Date.now()}`
          );
          await uploadBytes(avatarRef, avatarFileToUpload);
          avatarUrl = await getDownloadURL(avatarRef);
        } else {
          console.log(
            "Avatar là URL đã có hoặc null, không upload mới:",
            avatarFileToUpload
          );
        }
        // Xử lý upload giấy phép kinh doanh
        let businessLicenseUrl = null;
        if (
          form?.accountType === "business" &&
          form.businessLicense instanceof File
        ) {
          const licenseRef = ref(
            storage,
            `licenses/${user.uid}/${form.businessLicense.name}`
          );
          await uploadBytes(licenseRef, form.businessLicense);
          businessLicenseUrl = await getDownloadURL(licenseRef);
        }

        const docRef = doc(db, "profiles", userId);
        const docSnap = await getDoc(docRef);
        const profileDataToSave = {
          ...form,
          businessLicense: businessLicenseUrl || form.businessLicense,
          avatar: avatarUrl || null, // Lưu null nếu không có URL
        };
        console.log(profileDataToSave);

        if (docSnap.exists()) {
          profileDataToSave.updatedAt = new Date();
          await updateDoc(docRef, profileDataToSave);
          alertSuccess("Hồ sơ đã được cập nhật thành công!");
        } else {
          profileDataToSave.createdAt = new Date();
          await setDoc(docRef, profileDataToSave);
          alertSuccess("Hồ sơ đã được tạo thành công!");
        }
      } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu doanh nghiệp:", error);
        alertError("Có lỗi khi xử lý thông tin doanh nghiệp");
      }
    } else {
      // update thông tin cá nhân
      if (!emailRegex.test(form.email)) {
        alertError("Email không hợp lệ!");
        return;
      }
      if (!phoneRegex.test(form.phone)) {
        alertError("Số điện thoại không hợp lệ!");
        return;
      }
      if (!form.dob) {
        alertError("Vui lòng nhập ngày sinh!");
        return;
      }
      if (!form.gender) {
        alertError("Vui lòng chọn giới tính!");
        return;
      }
      if (!form.address) {
        alertError("Vui lòng nhập địa chỉ!");
        return;
      }
      if (!form.education) {
        alertError("Vui lòng nhập học vấn!");
        return;
      }

      try {
        let avatarUrl = form.avatar; // Giữ URL hiện tại hoặc null nếu chưa có
        const avatarFileToUpload = form.avatar;

        if (avatarFileToUpload && typeof avatarFileToUpload !== "string") {
          // Nếu là File object, tức là file mới/thay đổi
          if (!(avatarFileToUpload instanceof File)) {
            alertError("Tệp avatar không hợp lệ. Vui lòng chọn lại.");
            console.error(
              "Đối tượng tệp avatar không hợp lệ:",
              avatarFileToUpload
            );
            return;
          }
          const avatarRef = ref(
            storage,
            `avatars/${userId}/${avatarFileToUpload.name}_${Date.now()}`
          );
          await uploadBytes(avatarRef, avatarFileToUpload);
          avatarUrl = await getDownloadURL(avatarRef);
        } else {
          console.log(
            "Avatar là URL đã có hoặc null, không upload mới:",
            avatarFileToUpload
          );
        }

        let cvUrl = form.cvFile; // Giữ URL hiện tại hoặc null nếu chưa có
        const cvFileToUpload = form.cvFile;

        if (cvFileToUpload && typeof cvFileToUpload !== "string") {
          // Nếu là File object
          console.log("Chuẩn bị upload CV:", cvFileToUpload);
          if (!(cvFileToUpload instanceof File)) {
            alertError("Tệp CV không hợp lệ. Vui lòng chọn lại.");
            console.error("Đối tượng tệp CV không hợp lệ:", cvFileToUpload);
            return;
          }
          const cvRef = ref(
            storage,
            `cvs/${userId}/${cvFileToUpload.name}_${Date.now()}`
          );
          await uploadBytes(cvRef, cvFileToUpload);
          cvUrl = await getDownloadURL(cvRef);
          console.log("CV đã upload, URL:", cvUrl);
        } else {
          console.log(
            "CV là URL đã có hoặc null, không upload mới:",
            cvFileToUpload
          );
        }

        const docRef = doc(db, "profiles", userId);
        const docSnap = await getDoc(docRef);
        const profileDataToSave = {
          ...form,
          avatar: avatarUrl || null, // Lưu null nếu không có URL
          cvFile: cvUrl || null, // Lưu null nếu không có URL
        };

        if (docSnap.exists()) {
          profileDataToSave.updatedAt = new Date();
          await updateDoc(docRef, profileDataToSave);
          alertSuccess("Hồ sơ đã được cập nhật thành công!");
        } else {
          profileDataToSave.createdAt = new Date();
          await setDoc(docRef, profileDataToSave);
          alertSuccess("Hồ sơ đã được tạo thành công!");
        }
      } catch (error) {
        console.error("Lỗi chi tiết khi gửi dữ liệu:", error); // Log toàn bộ đối tượng lỗi
        alertError("Có lỗi khi gửi dữ liệu: " + error.message + ".");
      }
    }
  };

  return (
    <>
      {form?.accountType === "personal" ? (
        <div
          className="mainContent"
          style={{ maxWidth: 1000, margin: "40px auto" }}
        >
          <div
            className="jobCard"
            style={{ boxShadow: "0 2px 16px #e0e0e0", padding: 32 }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: 24,
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              Chỉnh sửa thông tin cá nhân
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 22 }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minWidth: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <label htmlFor="avatar" style={{ cursor: "pointer" }}>
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: "0 1px 6px #e0e0e0",
                      }}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#bbb", fontSize: 36 }}>+</span>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: 13, color: "#888" }}>
                    Ảnh đại diện
                  </span>
                </div>
                <div
                  style={{
                    flex: 4,
                    minWidth: 260,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                  }}
                >
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{ flex: 1 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Họ và tên
                      </label>
                      <input
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        type="text"
                        name="name"
                        placeholder="Nhập họ và tên"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Ngày sinh
                      </label>
                      <input
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Giới tính
                      </label>
                      <select
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Chọn</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{ flex: 2 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Email
                      </label>
                      <input
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        type="email"
                        name="email"
                        placeholder="Nhập email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Số điện thoại
                      </label>
                      <input
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{ flex: 2 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Địa chỉ
                      </label>
                      <input
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={form.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="color666" style={{ fontWeight: 500 }}>
                        Học vấn
                      </label>
                      <input
                        className="filterTab"
                        style={{
                          border: "1px solid #eee",
                          borderRadius: 7,
                          width: "100%",
                        }}
                        type="text"
                        name="education"
                        placeholder="VD: Đại học Bách Khoa"
                        value={form.education}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Liên kết mạng xã hội (LinkedIn, Facebook...)
                    </label>
                    <Space direction="vertical" className="group_inputSocial">
                      {form?.social?.map((item, idx) => (
                        <Space
                          key={idx}
                          align="baseline"
                          className="group_inputSocial_item"
                          style={{ width: "100%" }}
                        >
                          <Select
                            className="filterTab inputSocial"
                            style={{
                              borderRadius: 7,
                              width: 140,
                              padding: "0px",
                              textAlign: "left",
                            }}
                            placeholder="Chọn MXH"
                            value={item.name}
                            options={socialOptions}
                            onChange={(value) =>
                              handleSocialChange(idx, "name", value)
                            }
                            showSearch
                            optionFilterProp="value"
                          />
                          <Tooltip title={item.link}>
                            <Input
                              className="inputSocial"
                              style={{
                                border: "1px solid #eee",
                                borderRadius: 7,
                                width: "100%",
                              }}
                              type="text"
                              name={`social-link-${idx}`}
                              placeholder="Nhập liên kết"
                              value={item.link}
                              onChange={(e) =>
                                handleSocialChange(idx, "link", e.target.value)
                              }
                            />
                          </Tooltip>
                          {form.social.length > 1 && (
                            <MinusCircleOutlined
                              className="MinusCircleOutlined"
                              onClick={() => handleRemoveSocial(idx)}
                            />
                          )}
                          {idx === form.social.length - 1 && (
                            <Button
                              className="ButtonPlusOutlined"
                              icon={<PlusOutlined />}
                              onClick={handleAddSocial}
                            />
                          )}
                        </Space>
                      ))}
                    </Space>
                  </div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Kinh nghiệm làm việc
                    </label>
                    <textarea
                      className="filterTab"
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 7,
                        minHeight: 60,
                        width: "100%",
                      }}
                      name="experience"
                      placeholder="Mô tả kinh nghiệm làm việc"
                      value={form.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Kỹ năng (nhập để tìm)
                    </label>
                    <Select
                      mode="multiple"
                      placeholder="Chọn kỹ năng"
                      value={
                        form?.skills ? form?.skills?.map((s) => s.trim()) : []
                      }
                      onChange={(values) =>
                        setForm({ ...form, skills: values })
                      }
                      style={{ width: "100%" }}
                      options={skillOptions}
                      showSearch
                      filterOption={false}
                      onSearch={fetchSkills}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <label style={{ fontWeight: 500, marginRight: "10px" }}>
                      Đính kèm file CV (PDF, DOCX)
                    </label>
                    <Upload
                      beforeUpload={() => false}
                      showUploadList={false}
                      maxCount={1}
                      accept=".pdf,.doc,.docx"
                      customRequest={() => {}}
                      onChange={(info) => {
                        if (info.fileList.length > 0) {
                          setForm({
                            ...form,
                            cvFile: info.fileList[0].originFileObj,
                          });
                        }
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Tải lên file CV</Button>
                    </Upload>
                    {form.cvFile && (
                      <div
                        style={{
                          marginTop: 8,
                          color: "#1890ff",
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          Đã chọn:{" "}
                          {typeof form.cvFile === "string"
                            ? form.cvFile.split("/").pop()
                            : form.cvFile.name}
                        </span>
                        <Button
                          size="small"
                          type="text"
                          danger
                          style={{ marginLeft: 8 }}
                          onClick={() => setForm({ ...form, cvFile: null })}
                        >
                          X
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="proposalButton"
                type="submit"
                style={{ fontWeight: 600, fontSize: 17, padding: "12px 0" }}
              >
                Hoàn thành
              </button>
            </form>

            <div style={{ marginTop: 36 }}>
              <h3
                style={{
                  fontSize: 20,
                  marginBottom: 16,
                  fontWeight: 600,
                  color: "#333",
                  position: "relative",
                  paddingLeft: 15,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    backgroundColor: "#1890ff",
                    borderRadius: 2,
                    marginRight: 10,
                  }}
                ></span>
                Xem trước thông tin
              </h3>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 24,
                  fontSize: 15,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  border: "1px solid #f0f0f0",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 24,
                    marginBottom: 20,
                  }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="avatar"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #f0f0f0",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  ) : form.avatar ? (
                    <UploadIamge
                      showUploadList={{ showRemoveIcon: false }}
                      value={
                        form.avatar
                          ? {
                              uid: "-1",
                              status: "done",
                              url: preview,
                              originFileObj: form.avatar,
                            }
                          : null
                      }
                    />
                  ) : (
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#bbb",
                        fontSize: 24,
                        border: "3px solid #f0f0f0",
                      }}
                    >
                      <span>?</span>
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 22,
                        marginBottom: 8,
                        color: "#333",
                      }}
                    >
                      {form.name || "Chưa có tên"}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "8px 16px",
                      }}
                    >
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff", fontSize: "24px" }}>
                          ✉
                        </span>{" "}
                        {form.email || "Chưa có email"}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff" }}>☎</span>{" "}
                        {form.phone || "Chưa có SĐT"}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff" }}>📅</span> Ngày sinh:{" "}
                        {form.dob || "Chưa có"}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "start",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff" }}>👤</span> Giới tính:{" "}
                        {form.gender || "Chưa có"}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "start",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff" }}>📍</span> Địa chỉ:{" "}
                        {form.address || "Chưa có"}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "start",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff" }}>🎓</span> Học vấn:{" "}
                        {form.education || "Chưa có"}
                      </div>
                    </div>
                    {form.social && form.social.length > 0 && (
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          marginTop: 8,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#1890ff" }}>🔗</span> Mạng xã
                        hội:{" "}
                        {form?.social?.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#1890ff",
                              textDecoration: "none",
                              marginRight: 8,
                            }}
                          >
                            Link {index + 1}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      marginBottom: 12,
                      backgroundColor: "#f9f9f9",
                      padding: "12px 16px",
                      borderRadius: 8,
                      borderLeft: "3px solid #1890ff",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "#333",
                        fontSize: 16,
                      }}
                    >
                      <span style={{ color: "#1890ff", marginRight: 8 }}>
                        💼
                      </span>
                      Kinh nghiệm
                    </div>
                    <div style={{ color: "#666", lineHeight: 1.5 }}>
                      {form.experience || "Chưa có thông tin kinh nghiệm"}
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: 12,
                      backgroundColor: "#f9f9f9",
                      padding: "12px 16px",
                      borderRadius: 8,
                      borderLeft: "3px solid #1890ff",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "#333",
                        fontSize: 16,
                      }}
                    >
                      <span style={{ color: "#1890ff", marginRight: 8 }}>
                        🔧
                      </span>
                      Kỹ năng
                    </div>
                    <div style={{ color: "#666" }}>
                      {form.skills && form.skills.length > 0 ? (
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                        >
                          {form?.skills?.map((skill, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: "#e6f7ff",
                                color: "#1890ff",
                                padding: "4px 10px",
                                borderRadius: 16,
                                fontSize: 13,
                                fontWeight: 500,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "Chưa có thông tin kỹ năng"
                      )}
                    </div>
                  </div>

                  {form.cvFile && (
                    <div
                      style={{
                        backgroundColor: "#f9f9f9",
                        padding: "12px 16px",
                        borderRadius: 8,
                        borderLeft: "3px solid #1890ff",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#333",
                          fontSize: 16,
                          width: 130,
                        }}
                      >
                        <span style={{ color: "#1890ff", marginRight: 8 }}>
                          📄
                        </span>
                        File CV:
                      </div>
                      <div
                        style={{
                          color: "#1890ff",
                          backgroundColor: "#e6f7ff",
                          padding: "4px 12px",
                          borderRadius: 4,
                          fontSize: 15,
                        }}
                      >
                        {typeof form.cvFile === "string"
                          ? form.cvFile.split("/").pop()
                          : form.cvFile.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mainContent"
          style={{ maxWidth: 1000, margin: "40px auto" }}
        >
          <div
            className="jobCard"
            style={{ boxShadow: "0 2px 16px #e0e0e0", padding: 32 }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: 24,
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              Chỉnh sửa thông tin doanh nghiệp
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <div
                  style={{
                    flex: 1,
                    minWidth: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <label htmlFor="avatar" style={{ cursor: "pointer" }}>
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: "0 1px 6px #e0e0e0",
                      }}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="avatar"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ color: "#bbb", fontSize: 36 }}>+</span>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: 13, color: "#888" }}>Ảnh</span>
                </div>
                <div style={{ display: "flex", gap: 14, margin: "20px 0" }}>
                  <div style={{ flex: 1 }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Tên doanh nghiệp
                    </label>
                    <input
                      className="filterTab"
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 7,
                        width: "100%",
                      }}
                      type="text"
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      required
                      readOnly
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Mã số thuế
                    </label>
                    <input
                      className="filterTab"
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 7,
                        width: "100%",
                      }}
                      type="text"
                      name="taxCode"
                      value={form.taxCode}
                      onChange={handleChange}
                      required
                      maxLength={13}
                    />
                  </div>
                </div>

                <div
                  style={{
                    margin: "20px 0",
                  }}
                >
                  <label className="color666" style={{ fontWeight: 500 }}>
                    Địa chỉ doanh nghiệp
                  </label>
                  <input
                    className="filterTab"
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 7,
                      width: "100%",
                    }}
                    type="text"
                    name="businessAddress"
                    value={form.businessAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div
                  style={{
                    margin: "20px 0",
                  }}
                >
                  <label className="color666" style={{ fontWeight: 500 }}>
                    Mô tả doanh nghiệp
                  </label>
                  <textarea
                    className="filterTab"
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 7,
                      minHeight: 400,
                      width: "100%",
                      textAlign: "left",
                    }}
                    name="businessDescription"
                    value={form.businessDescription}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <label className="color666" style={{ fontWeight: 500 }}>
                    Giấy phép kinh doanh
                  </label>
                  <Upload
                    beforeUpload={() => false}
                    accept=".pdf,.jpg,.png"
                    maxCount={1}
                    onChange={(info) => {
                      setForm({
                        ...form,
                        businessLicense: info.fileList[0]?.originFileObj,
                      });
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Tải lên file đính kèm
                    </Button>
                  </Upload>
                </div>
                <div style={{ display: "flex", gap: 14, margin: "20px 0" }}>
                  <div style={{ flex: 1, gap: 14 }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Số lượng thành viên
                    </label>
                    <input
                      style={{
                        marginLeft: "15px",
                        border: "1px solid rgb(238, 238, 238)",
                        borderRadius: 7,
                      }}
                      className="filterTab"
                      type="number"
                      min="1"
                      name="numberOfMembers"
                      value={form.numberOfMembers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={{ flex: 1, gap: 14 }}>
                    <label className="color666" style={{ fontWeight: 500 }}>
                      Website công ty
                    </label>
                    <input
                      style={{
                        marginLeft: "15px",
                        border: "1px solid rgb(238, 238, 238)",
                        borderRadius: 7,
                      }}
                      className="filterTab"
                      type="url"
                      name="website"
                      placeholder="https://example.com"
                      value={form.website}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <Button type="primary" htmlType="submit">
                  Cập nhật thông tin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
