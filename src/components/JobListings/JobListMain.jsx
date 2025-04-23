"use client";
import React, { useState } from "react";
import { jobListings } from "../../Data/Data";
import "../../style/JobListings.css";
import JobDetail from "./JobDetail";
import JobFilters from "./JobFilters";
import JobList from "./JobList";
import UserProfile from "./UserProfile";
function JobListMain() {
  const [selectedJob, setSelectedJob] = useState(jobListings[0]);

  return (
    <div id={"JobListMain"}>
      <main className={"mainContent"}>
        <div className={"contentLayout"}>
          <div className={"leftColumn"}>
            <JobFilters />
            <div className={"jobListContainer"}>
              <div className={"jobListLayout"}>
                <JobList onSelectJob={setSelectedJob} />
                <JobDetail job={selectedJob} />
              </div>
            </div>
          </div>
          <aside className={"rightColumn"}>
            <UserProfile />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default JobListMain;
