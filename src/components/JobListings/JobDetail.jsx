import {
  faClock,
  faHourglassHalf,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import "../../style/JobListings.css";
// Then import whatever icons you plan to use:
function JobDetail({ job }) {
  const textRef = useRef(null);
  const [feedback, setFeedback] = useState("");

  const handleCopy = async () => {
    try {
      const text = textRef.current.innerText;
      await navigator.clipboard.writeText(text);
      setFeedback("Copied!");
      setTimeout(() => setFeedback(""), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setFeedback("Copy failed");
      setTimeout(() => setFeedback(""), 1500);
    }
  };
  return (
    <article className={"jobDetail"}>
      <header className={"jobDetailHeader"}>
        <div className={"companyInfo"}>
          <img
            src={job?.companyAvatar}
            className={"companyLogo"}
            alt="Company logo"
          />
          <div className={"companyMeta"}>
            <h4 className={"companyName"}>{job?.companyName}</h4>
            <h2 className={"jobDetailTitle"}>{job?.jobTitle}</h2>
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
                icon={faClock}
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
              <div className="introduce_item_group_title">Thời gian</div>
              <div className="introduce_item_group_value">{job?.workTime}</div>
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
              <div className="introduce_item_group_value">{job?.city}</div>
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
              <div className="introduce_item_group_value">
                {job?.experience}
              </div>
            </div>
          </div>
        </div>
        <div className="job-detail__info--flex">
          <div className="job-detail__info--deadline">
            <span className="job-detail__info--deadline--icon">
              <FontAwesomeIcon icon={faClock} />
            </span>
            Hạn nộp hồ sơ:{" "}
            {job?.deadline
              ? new Date(job.deadline.seconds * 1000).toLocaleDateString(
                  "vi-VN"
                )
              : "Không giới hạn"}
          </div>
        </div>
      </section>
      <div
        className="introduce_item"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div style={{ fontSize: "14px" }}>
          Địa điểm:{" "}
          <span style={{ fontWeight: "600", color: "#333" }}>{job?.city}</span>
        </div>
        <div
          style={{
            fontSize: "14px",
            display: "flex",
            gap: "10px",
          }}
        >
          <span style={{ width: "65px" }}>Chi tiết:</span>
          <span style={{ fontWeight: "600", color: "#333", lineHeight: "1.2" }}>
            {job?.detailedAddress}
          </span>
        </div>
        <div style={{ fontSize: "14px" }}>
          Mức lương:{" "}
          <span style={{ fontWeight: "600", color: "#333" }}>
            {job?.minSalary} ~ {job?.maxSalary} {job?.currency}
          </span>
        </div>
      </div>
      <section>
        <h3 className={"sectionTitle"}>Tổng quan về công việc</h3>
        <p className={"projectDescription"}>{job?.overview}</p>
      </section>

      <section>
        <h3 className={"sectionTitle"}>Skills</h3>
        <div className="skillTags">
          <Tooltip title={job.skills?.join(", ")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {job.skills?.slice(0, 8).map((skill, index) => (
                <span key={index} className="skillTag">
                  {skill}
                </span>
              ))}
              {job.skills?.length > 8 && (
                <span className="skillTag">+{job.skills.length - 8}</span>
              )}
            </div>
          </Tooltip>
        </div>
      </section>

      <section className={"projectDetails"}>
        <div className={"detailColumn"}>
          <h3 className={"detailTitle"}>Đánh giá công ty</h3>
          <p className={"reviewScore"}>
            {job?.rating
              ? `${job.rating.star} of ${job.rating.evaluate} reviews`
              : "Không có đánh giá"}
          </p>
          <div className={"ratingStars"}>
            <Rate
              disabled
              allowHalf
              value={job?.rating ? job.rating.star : 0}
              style={{ fontSize: "12px" }}
            />
          </div>
        </div>

        <div className={"detailColumn"}>
          <p className={"successCount"}>
            <span style={{ fontWeight: "400", marginRight: "5px" }}>
              Tuyển dụng:
            </span>{" "}
            {job?.openings} người
          </p>
        </div>

        <div className={"detailColumn"}>
          <p className={"spentAmount"}>
            <span style={{ fontWeight: "400", marginRight: "5px" }}>
              Ứng tuyển:
            </span>{" "}
            {job?.fileCount ? job?.fileCount : 0} người
          </p>
        </div>
      </section>

      <footer className={"jobActions"}>
        <div className={"jobUrl cursor-pointer"} onClick={handleCopy}>
          <span ref={textRef} style={{ userSelect: "none", cursor: "pointer" }}>
            {feedback ? feedback : job?.companyWebsite}
          </span>
          <img src="assets/icon/copy.png" className={"copyIcon"} alt="Copy" />
        </div>
        <button className={"proposalButton"}>Ứng tuyển ngay</button>
      </footer>
    </article>
  );
}

export default JobDetail;
