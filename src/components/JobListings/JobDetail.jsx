import {
  faClock,
  faCoins,
  faHourglassHalf,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/JobListings.css";
// Then import whatever icons you plan to use:
function JobDetail({ job }) {
  const textRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const handleCopy = async () => {
    try {
      const text = textRef.current.innerText;
      await navigator.clipboard.writeText(text);
      setFeedback("Copied!");
      setTimeout(() => setFeedback(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setFeedback("Copy failed");
      setTimeout(() => setFeedback(""), 2000);
    }
  };
  return (
    <article className={"jobDetail"}>
      <header className={"jobDetailHeader"}>
        <div className={"companyInfo"}>
          <img
            src={job?.companyLogo}
            className={"companyLogo"}
            alt="Company logo"
          />
          <div className={"companyMeta"}>
            <h4 className={"companyName"}>{job?.companyName}</h4>
            <h2 className={"jobDetailTitle"}>{job?.title}</h2>
          </div>
        </div>
        <img
          src={"assets/icon/bookmark.png"}
          className={"bookmarkIcon"}
          alt="Bookmark"
        />
      </header>

      <section>
        <div className="job-detail__introduce">
          <div className="introduce_item">
            <div className="introduce_item_icon">
              <FontAwesomeIcon
                icon={faCoins}
                style={{
                  width: "20px",
                  height: "20px",
                  padding: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#239852",
                  color: "#f2f2f2",
                }}
              />
            </div>
            <div className="introduce_item_group">
              <div className="introduce_item_group_title">Thu nhập</div>
              <div className="introduce_item_group_value">Thỏa thuận</div>
            </div>
          </div>
          <div className="introduce_item">
            <div className="introduce_item_icon">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{
                  width: "20px",
                  height: "20px",
                  padding: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#239852",
                  color: "#f2f2f2",
                }}
              />
            </div>
            <div className="introduce_item_group">
              <div className="introduce_item_group_title">Địa điểm</div>
              <div className="introduce_item_group_value">Thỏa thuận</div>
            </div>
          </div>
          <div className="introduce_item">
            <div className="introduce_item_icon">
              <FontAwesomeIcon
                icon={faHourglassHalf}
                style={{
                  width: "20px",
                  height: "20px",
                  padding: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#239852",
                  color: "#f2f2f2",
                }}
              />
            </div>
            <div className="introduce_item_group">
              <div className="introduce_item_group_title">Kinh nghiệm</div>
              <div className="introduce_item_group_value">Thỏa thuận</div>
            </div>
          </div>
        </div>
        <div className="job-detail__info--flex">
          <div className="job-detail__info--deadline">
            <span className="job-detail__info--deadline--icon">
              <FontAwesomeIcon icon={faClock} />
            </span>
            Hạn nộp hồ sơ: 10/05/2025
          </div>
        </div>
      </section>
      <section>
        <h3 className={"sectionTitle"}>Tổng quan về công việc</h3>
        <p className={"projectDescription"}>{job?.description}</p>
      </section>

      <section>
        <h3 className={"sectionTitle"}>Skills</h3>
        <div className={"skillTags"}>
          {job?.skills.map((skill, index) => (
            <span key={index} className={"skillTag"}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={"projectDetails"}>
        <div className={"detailColumn"}>
          <h3 className={"detailTitle"}>Đánh giá công ty</h3>
          <p className={"reviewScore"}>
            {job?.rating.star} of {job?.rating.evaluate} reviews
          </p>
          <div className={"ratingStars"}>
            <Rate
              disabled
              allowHalf
              value={job?.rating.star}
              style={{ fontSize: "12px" }}
            />
          </div>
        </div>

        <div className={"detailColumn"}>
          <p className={"successCount"}>
            <span style={{ fontWeight: "400", marginRight: "5px" }}>
              Tuyển dụng:
            </span>{" "}
            {job?.proposals} người
          </p>
        </div>

        <div className={"detailColumn"}>
          <p className={"spentAmount"}>
            <span style={{ fontWeight: "400", marginRight: "5px" }}>
              Ứng tuyển:
            </span>{" "}
            {job?.fileCount} người
          </p>
        </div>
      </section>

      <footer className={"jobActions"}>
        <div className={"jobUrl cursor-pointer"} onClick={handleCopy}>
          <span ref={textRef} style={{ userSelect: "none", cursor: "pointer" }}>
            {feedback ? feedback : job?.linkCompany}
          </span>
          <img src="assets/icon/copy.png" className={"copyIcon"} alt="Copy" />
        </div>
        <button
          className={"proposalButton"}
          onClick={() => {
            navigate("/addCv");
          }}
        >
          Ứng tuyển ngay
        </button>
      </footer>
    </article>
  );
}

export default JobDetail;
