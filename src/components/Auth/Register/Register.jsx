import "antd/dist/reset.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useCommonMessage } from "../../../shared/CommonMessage";
import "../../../style/Auth.css";
import { handleFocus } from "../../../utils";
const Register = () => {
  const { alertSuccess, alertError } = useCommonMessage();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      alertError("Email không hợp lệ!");
      handleFocus("email");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alertError("Mật khẩu không khớp!");
      handleFocus("confirmPassword");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      // Lưu thông tin vào Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
        // Có thể thêm các trường khác nếu muốn
      });
      alertSuccess("Đăng ký thành công!");
      navigate('/login')
    } catch (err) {
      alertError(err.message);
    }
  };

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Đăng ký
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              placeholder="Tên của bạn"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              placeholder="Địa chỉ email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="Mật khẩu"
                              name="password"
                              value={form.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              placeholder="Nhập lại mật khẩu"
                              name="confirmPassword"
                              value={form.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center ">
                          <div
                            className="content"
                            style={{
                              paddingTop: "0px",
                            }}
                          >
                            <input
                              type="submit"
                              value="Đăng ký ngay"
                              className="btn btn-block btn-primary"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="./assets/images/login/imgRegister.webp"
                        className="img-fluid"
                        alt="imgRegister"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
