import "../../../style/Auth.css";
const Register = () => {
  return (
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
                    <form className="mx-1 mx-md-4">
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
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
