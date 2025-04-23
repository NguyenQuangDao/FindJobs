import { Rate, Tooltip } from "antd";
import React from "react";
import "../../style/JobListings.css";
function JobCard({ job, onClick }) {
  return (
    <article className={"jobCard"}>
      <div className={"jobCardHeader"}>
        <div className={"jobCardCompany"}>
          <img
            src={job?.companyLogo}
            className={"companyLogo"}
            alt="Company logo"
          />
          <div
            className={"jobCardInfo"}
            onClick={() => {
              onClick(job);
            }}
          >
            <h3 className={"jobTitle"}>{job?.title}</h3>
            <p className={"jobDescription"}>{job?.description}</p>
          </div>
        </div>
        <img
          src={"assets/icon/bookmark.png"}
          className={"bookmarkIcon"}
          alt="Bookmark"
        />
      </div>
      <div className={"jobCardTags"}>
        <div className={"tagContainer"}>
          <div className={"tagGroup"}>
            {job?.skills.map((skill, index) => (
              <span key={index} className={"tag"}>
                {skill}
              </span>
            ))}
          </div>
          <Tooltip title={job?.rating.star + " ★"} placement="left">
            <div className={"ratingContainer"}>
              <Rate
                disabled
                allowHalf
                value={job?.rating.star}
                style={{ fontSize: "12px" }}
              />
              <div className="jobCardrecruitment">
                <p>Tuyển dụng</p>: {job?.proposals} người
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </article>
  );
}

export default JobCard;
