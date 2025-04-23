import React, { useState } from "react";

function JobFilters() {
  const [activeTab1, setActiveTab1] = useState("Nổi bật");
  const [activeTab2, setActiveTab2] = useState("Nổi bật");
  // Tab options
  const tabOptions = ["Nổi bật", "Mới nhất", "Danh mục"];
  // Handle tab 1
  const handleTab1Click = (tab) => {
    setActiveTab1(tab);
  };
  // Handle tab 2
  const handleTab2Click = (tab) => {
    setActiveTab2(tab);
  };

  return (
    <section className="filtersSection">
      <div className="filterTabs">
        {tabOptions.map((tab) => (
          <div
            key={`row1-${tab}`}
            className={`filterTab ${activeTab1 === tab ? "filterTabActive" : ""}`}
            onClick={() => handleTab1Click(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      
      <div className="filterTabs">
        {tabOptions.map((tab) => (
          <div
            key={`row2-${tab}`}
            className={`filterTab ${activeTab2 === tab ? "filterTabActive" : ""}`}
            onClick={() => handleTab2Click(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobFilters;