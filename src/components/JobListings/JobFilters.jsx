import React from "react";

function JobFilters({ setSelectedTab, selectedTab }) {
  // Tab options
  const tabOptions = [
    { label: "Nổi bật", value: "hot" },
    { label: "Tất cả", value: "all" },
    { label: "Danh mục", value: "category" },
  ];
  // Handle tab 1
  const handleTab1Click = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className="filtersSection">
      <div className="filterTabs">
        {tabOptions.map((tab) => (
          <div
            key={`row1-${tab.value}`}
            className={`filterTab ${
              selectedTab === tab.value ? "filterTabActive" : ""
            }`}
            onClick={() => handleTab1Click(tab.value)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobFilters;
