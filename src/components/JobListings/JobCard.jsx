import { Card, Rate, Tooltip, Tag } from "antd";
import React from "react";
import "../../style/JobListings.css";
const JobCard = ({ job, style, onClick }) => {
  return (
    <Card
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
      styles={{ body: { flex: 1 } }}
    >
      {/* Phần thông tin công ty */}
      <div className="company-info-section">
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div>
            <img
              src={job?.companyAvatar}
              className={"companyLogo"}
              alt="Company logo"
            />
          </div>
          <div className={"companyName"}>{job?.companyName}</div>
        </div>
        <div
          className={"jobCardInfo"}
          onClick={onClick}
        >
          <div style={{ fontSize: "14px" }}>
            Mức lương:{" "}
            <span
              style={{ fontWeight: "600", color: "#333", fontSize: "12px" }}
            >
              {job?.minSalary} ~ {job?.maxSalary} {job?.currency}
            </span>
          </div>
          <h3 className={"jobTitle"}>{job?.jobTitle}</h3>
          <p className={"jobDescription"}>{job?.overview}</p>
        </div>
      </div>

      {/* Phần tags */}
      <div style={{ margin: "12px 0" }}>
        <Tooltip
          title={job.tags?.join(", ")}
          styles={{ root: { maxWidth: 400 } }}
        >
          <div
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
            }}
          >
            {job.tags?.map((tag, index) => (
              <Tag key={index} style={{ margin: "2px" }}>
                {tag}
              </Tag>
            ))}
          </div>
        </Tooltip>
      </div>

      {/* Phần thông tin chi tiết */}
      <div className="job-details-section">
        <div className={"jobCardTags"}>
          <div className={"tagContainer"}>
            <div
              className={"tagGroup"}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                maxHeight: "56px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {job?.skills.slice(0, 7).map((skill, index) => (
                <span key={index} className={"tag"}>
                  {skill}
                </span>
              ))}
              {job?.skills.length > 7 && (
                <Tooltip title={job?.skills.join(", ")}>
                  <span className={"tag"}>+{job?.skills.length - 7}</span>
                </Tooltip>
              )}
            </div>
            <Tooltip
              title={job?.rating ? job.rating.star + " ★" : "Chưa có đánh giá"}
              placement="left"
            >
              <div className={"ratingContainer"}>
                <Rate
                  disabled
                  allowHalf
                  value={job?.rating ? job.rating.star : 0}
                  style={{ fontSize: "12px" }}
                />
                <div className="jobCardrecruitment">
                  <div>Tuyển dụng</div>: {job?.openings} người
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
