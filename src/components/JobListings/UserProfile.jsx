import { faGithub, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/JobListings.css";

function UserProfile() {
  const navigate = useNavigate();
  return (
    <div className={"profileContainer"}>
      <section className={"profileCard"}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c563694c7ec9be296fe110c3b500a827cc31453?placeholderIfAbsent=true&apiKey=6e85c143718d44d386fa32b0be9df1fa"
          className={"profileAvatar"}
          alt="Ảnh đại diện người dùng"
        />
        <h2 className={"profileName"}>Nguyễn Quang Đạo</h2>
        <p className={"profileTitle"}>FullStack Developer</p>
        <button
          className={"editProfileButton"}
          onClick={() => {
            navigate("/profile");
          }}
        >
          Chỉnh sửa hồ sơ
        </button>
      </section>

      <section className={"profileDetails"}>
        <h3 className={"profileSectionTitle"}>Trạng thái</h3>
        <span className={"availabilityBadge"}>🔥 Sẵn sàng làm việc</span>

        <h3 className={"profileSectionTitle"}>Mạng xã hội & Liên hệ</h3>
        <div className={"connectCount"}>
          <p className="connectIcon flex items-center fs-6 cursor-pointer connectIconRow">
            <span className={"connectIcon mr-2"}>
              <FontAwesomeIcon icon={faLinkedin} />
            </span>
            <span className="fs-7">Linkedin</span>
          </p>
          <p className="connectIcon flex items-center fs-6 cursor-pointer connectIconRow">
            <span className={"connectIcon mr-2"}>
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span className="fs-7">GitHub</span>
          </p>
          <p className="connectIcon flex items-center fs-6 cursor-pointer connectIconRow">
            <span className={"connectIcon mr-2"}>
              <FontAwesomeIcon icon={faSquareFacebook} />
            </span>
            <span className="fs-7">FaceBook</span>
          </p>
        </div>
        <h3 className={"profileSectionTitle"}>Kỹ năng & Chuyên môn</h3>
        <div className="groupSkills">
          <div className={"skillsRow"}>
            <span className={"skillBadge"}>UI Designer</span>
            <span className={"skillBadge"}>UX Designe</span>
          </div>
          <div className={"skillsRow"}>
            <span className={"skillBadge"}>ReactJs</span>
            <span className={"skillBadge"}>Web 3D</span>
          </div>
          <div className={"skillsRow"}>
            <span className={"skillBadge"}>Landing Page</span>
            <span className={"skillBadge"}>Figma</span>
          </div>
        </div>
        <button className={"viewProfileButton"}>Xem hồ sơ</button>
      </section>
    </div>
  );
}

export default UserProfile;
