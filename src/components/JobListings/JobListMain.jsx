"use client";
import React, { useState } from "react";
// import { jobListings } from "../../Data/Data";
import "../../style/JobListings.css";
import JobDetail from "./JobDetail";
import JobFilters from "./JobFilters";
import JobList from "./JobList";
import UserProfile from "./UserProfile";
import JobListAll from "./JobListAll";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
function JobListMain() {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTab, setSelectedTab] = useState("hot");
console.log(jobList);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push({ id: doc.id, ...doc.data() });
        });
        setJobList(jobs);
        setSelectedJob(jobs[0] || null);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div id={"JobListMain"}>
      <main className={"mainContent"}>
        <div className={"contentLayout"}>
          <div className={"leftColumn"}>
            <JobFilters
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
            />
            <div className={"jobListContainer"}>
              {selectedTab === "hot" && (
                <div className={"jobListLayout"}>
                  <JobList jobListings={jobList} onSelectJob={setSelectedJob} />
                  {selectedJob && <JobDetail job={selectedJob} />}
                </div>
              )}
              {selectedTab === "all" && (
                <div className={"jobListLayout"}>
                  <JobListAll jobListings={jobList} />
                </div>
              )}
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
