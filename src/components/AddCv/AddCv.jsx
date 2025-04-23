import React, { useState } from "react";
import "../../style/JobListings.css";

const AddCv = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    education: "",
    social: "",
    avatar: null,
    experience: "",
    skills: "",
    cvFile: null,
  });
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
    <div className="mainContent" style={{ maxWidth: 1000, margin: "40px auto" }}>
      <div className="jobCard" style={{ boxShadow: "0 2px 16px #e0e0e0", padding: 32 }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, fontWeight: 700, fontSize: 28 }}>Tạo mới CV</h2>
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
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
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
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
            <div style={{ flex: 3, minWidth: 260, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 500 }}>Họ và tên</label>
                  <input
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 500 }}>Ngày sinh</label>
                  <input
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 500 }}>Giới tính</label>
                  <select
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
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
                  <label style={{ fontWeight: 500 }}>Email</label>
                  <input
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 500 }}>Số điện thoại</label>
                  <input
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
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
                  <label style={{ fontWeight: 500 }}>Địa chỉ</label>
                  <input
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                    type="text"
                    name="address"
                    placeholder="Nhập địa chỉ"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 500 }}>Học vấn</label>
                  <input
                    className="filterTab"
                    style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                    type="text"
                    name="education"
                    placeholder="VD: Đại học Bách Khoa"
                    value={form.education}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label style={{ fontWeight: 500 }}>Liên kết mạng xã hội (LinkedIn, Facebook...)</label>
                <input
                  className="filterTab"
                  style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                  type="text"
                  name="social"
                  placeholder="Nhập liên kết mạng xã hội"
                  value={form.social}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ fontWeight: 500 }}>Kinh nghiệm làm việc</label>
              <textarea
                className="filterTab"
                style={{ border: "1px solid #eee", borderRadius: 7, minHeight: 60, width: "100%" }}
                name="experience"
                placeholder="Mô tả kinh nghiệm làm việc"
                value={form.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ fontWeight: 500 }}>Kỹ năng (ngăn cách bởi dấu phẩy)</label>
              <input
                className="filterTab"
                style={{ border: "1px solid #eee", borderRadius: 7, width: "100%" }}
                type="text"
                name="skills"
                placeholder="VD: JavaScript, React, Node.js"
                value={form.skills}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ fontWeight: 500 }}>Đính kèm file CV (PDF, DOCX)</label>
              <input
                type="file"
                name="cvFile"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button className="proposalButton" type="submit" style={{ fontWeight: 600, fontSize: 17, padding: "12px 0" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12 }}>
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
                    Mạng xã hội: <a href={form.social} target="_blank" rel="noopener noreferrer">{form.social}</a>
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

export default AddCv;
