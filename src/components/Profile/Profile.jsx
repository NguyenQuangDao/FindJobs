import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Space, Tooltip, Upload } from "antd";
import React, { useRef, useState } from "react";
import { profile } from "../../Data/Data";
import "../../style/Profile.css";
const Profile = () => {
  const [form, setForm] = useState(profile);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  const handleSocialChange = (index, value) => {
    const newSocial = [...form.social];
    newSocial[index] = value;
    setForm({ ...form, social: newSocial });
  };

  const handleAddSocial = () => {
    setForm({ ...form, social: [...form.social, ""] });
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
            options = data.map((skill) => ({
              label: skill,
              value: skill,
            }));
            // Nếu không có skill nào trùng với query, thêm query vào đầu danh sách
            if (!data.some((skill) => skill.toLowerCase() === query.toLowerCase())) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^(0|\+84)(\d{9})$/;
    if (!emailRegex.test(form.email)) {
      setError("Email không hợp lệ!");
      return;
    }
    if (!phoneRegex.test(form.phone)) {
      setError("Số điện thoại không hợp lệ!");
      return;
    }
    if (!form.dob) {
      setError("Vui lòng nhập ngày sinh!");
      return;
    }
    if (!form.gender) {
      setError("Vui lòng chọn giới tính!");
      return;
    }
    if (!form.address) {
      setError("Vui lòng nhập địa chỉ!");
      return;
    }
    if (!form.education) {
      setError("Vui lòng nhập học vấn!");
      return;
    }
    setSuccess(true);
    // TODO: Gửi dữ liệu lên server
  };

  return (
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
          {" "}
          Chỉnh sửa hồ sơ của bạn
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 22 }}
        >
          {error && (
            <div
              style={{
                color: "#d32f2f",
                background: "#fff0f0",
                borderRadius: 6,
                padding: "8px 12px",
                marginBottom: 8,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {error}
            </div>
          )}
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
              <span style={{ fontSize: 13, color: "#888" }}>Ảnh đại diện</span>
            </div>
            <div
              style={{
                flex: 3,
                minWidth: 260,
                display: "flex",
                flexDirection: "column",
                gap: 14,
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
                  {form.social.map((link, idx) => (
                    <Space
                      key={idx}
                      align="baseline"
                      className="group_inputSocial_item"
                    >
                      <Tooltip title={link}>
                        <Input
                          className="filterTab inputSocial"
                          style={{
                            border: "1px solid #eee",
                            borderRadius: 7,
                            width: "100%",
                          }}
                          type="text"
                          name={`social-${idx}`}
                          placeholder="Nhập liên kết mạng xã hội"
                          value={link}
                          onChange={(e) =>
                            handleSocialChange(idx, e.target.value)
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
                  value={form.skills ? form.skills.map((s) => s.trim()) : []}
                  onChange={(values) => setForm({ ...form, skills: values })}
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
                  onChange={handleChange}
                  type="file"
                  name="cvFile"
                  accept=".pdf,.doc,.docx"
                >
                  <Button icon={<UploadOutlined />}>Tải lên file CV</Button>
                </Upload>
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
        {success && (
          <div
            style={{
              marginTop: 18,
              color: "#239852",
              textAlign: "center",
              fontWeight: 600,
              fontSize: 17,
            }}
          >
            Gửi CV thành công!
          </div>
        )}
        <div style={{ marginTop: 36 }}>
          <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>
            Xem trước thông tin
          </h3>
          <div
            style={{
              background: "#fafafa",
              borderRadius: 8,
              padding: 20,
              fontSize: 15,
              boxShadow: "0 1px 6px #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 12,
              }}
            >
              {preview && (
                <img
                  src={preview}
                  alt="avatar"
                  style={{ width: 54, height: 54, borderRadius: "50%" }}
                />
              )}
              <div>
                <div style={{ fontWeight: 600, fontSize: 17 }}>{form.name}</div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  {form.email} | {form.phone}
                </div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  Ngày sinh: {form.dob} | Giới tính: {form.gender}
                </div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  Địa chỉ: {form.address}
                </div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  Học vấn: {form.education}
                </div>
                {form.social && (
                  <div style={{ color: "#888", fontSize: 14 }}>
                    Mạng xã hội:{" "}
                    <a
                      href={form.social}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {form.social}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <b>Kinh nghiệm:</b> {form.experience}
            </div>
            <div style={{ marginBottom: 6 }}>
              <b>Kỹ năng:</b> {form.skills}
            </div>
            {form.cvFile && (
              <div>
                <b>File CV:</b> {form.cvFile.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
