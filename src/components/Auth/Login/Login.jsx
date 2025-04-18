import React from "react";
import imgLogin from "../../../assets/images/login/imglogin.svg";
import "../Auth.css";
const Login = () => {
  return (
    <div className="content">
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col-md-6">
            <img src={imgLogin} alt="Image" className="img-fluid" />
          </div>
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <h1 className="text-2xl" style={{fontWeight:'bold'}}>Đăng nhập</h1>
                  <p className="mb-4 mt-2">
                    Hãy đăng nhập và trải nghiệm, chúng tôi sẽ giúp bạn tìm được
                    những công việc phù hợp nhất.
                  </p>
                </div>
                <form>
                  <div className="form-group first">
                    <label htmlFor="username" className="text-base">
                      Tài khoản
                    </label>
                    <input type="text" className="form-control" id="username" />
                  </div>
                  <div className="form-group last mb-4 mt-2">
                    <label htmlFor="password" className="text-base">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
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
