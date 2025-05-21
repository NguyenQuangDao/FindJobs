import JobCard from "./JobCard";

const JobListAll = ({ jobListings }) => {
  return (
    <div className="JobListAll" style={{ 
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      {jobListings?.map((job) => (
        <div 
          key={job.id}
          style={{ 
            width: 'calc(33.33% - 11px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <JobCard job={job} style={{ flex: 1 }}/>
        </div>
      ))}
    </div>
  );
};

export default JobListAll;
