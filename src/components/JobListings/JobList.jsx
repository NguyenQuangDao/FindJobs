import React from "react";
import "../../style/JobListings.css";
import JobCard from "./JobCard";

function JobList({ jobListings, onSelectJob }) {
  return (
    <div className={"jobListSection"}>
      {jobListings?.map((job) => (
        <div key={job.id}>
          <JobCard job={job} onClick={() => onSelectJob(job)} />
        </div>
      ))}
    </div>
  );
}

export default JobList;
