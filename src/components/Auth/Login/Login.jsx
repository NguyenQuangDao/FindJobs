import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppProvider/AppProvider";
import { useCommonMessage } from "../../../shared/CommonMessage";
import "../../../style/Auth.css";
import { handleFocus } from "../../../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { alertSuccess, alertError } = useCommonMessage();
  const { login } = useAppContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      handleFocus("username");
      return;
    }
    if (password === "") {
      handleFocus("password");
      return;
    }
    try {
      await login(username, password);
      alertSuccess("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      alertError("Đăng nhập thất bại!");
      console.log("Đăng nhập thất bại: " + error.message);
    }
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col-md-6">
            <img
              src={"assets/images/login/imglogin.svg"}
              alt="Image"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <h1 className="text-2xl" style={{ fontWeight: "bold" }}>
                    Đăng nhập
                  </h1>
                  <p className="mb-4 mt-2">
                    Hãy đăng nhập và trải nghiệm, chúng tôi sẽ giúp bạn tìm được
                    những công việc phù hợp nhất.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group first">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tài khoản"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group last mb-4 mt-2">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="submit"
                      value="Đăng nhập ngay"
                      className="btn btn-block btn-primary"
                    />
                    <span className="ml-auto">
                      <a href="#" className="forgot-pass">
                        Quên mật khẩu?
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
