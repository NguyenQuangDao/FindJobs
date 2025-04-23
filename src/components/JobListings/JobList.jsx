import React from "react";
import { jobListings } from "../../Data/Data";
import "../../style/JobListings.css";
import JobCard from "./JobCard";

function JobList({ onSelectJob }) {
  return (
    <div className={"jobListSection"}>
      {jobListings.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onSelectJob(job)} />
      ))}
    </div>
  );
}

export default JobList;
