import React from "react";
import { useParams } from "react-router-dom";

function Test() {
  const { type } = useParams();

  const testUrls = {
    "commerce-script":
      "https://www.careerguide.com/assessment/integration/commerce-assessment.aspx?hide_head=1&utm_source=partner_assessment&utm_campaign=school2campus&utm_medium=school2campus",

    "stream-test":
      "https://www.careerguide.com/assessment/integration/stream-suggestor.aspx?hide_head=1&utm_source=partner_assessment&utm_campaign=school2campus&utm_medium=school2campus",

    "engineering-script":
      "https://www.careerguide.com/assessment/integration/engineering-branch-assessment.aspx?hide_head=1&utm_source=partner_assessment&utm_campaign=school2campus&utm_medium=school2campus",

    "humanities-script":
      "https://www.careerguide.com/assessment/integration/humanities-assessment.aspx?hide_head=1&utm_source=partner_assessment&utm_campaign=school2campus&utm_medium=school2campus",

    "ideal-career-test":
      "https://www.careerguide.com/assessment/integration/ideal-career-test.aspx?hide_head=1&utm_source=partner_assessment&utm_campaign=megamindonline&utm_medium=megamindonline"
  };

  const selectedUrl =
    testUrls[type] || testUrls["commerce-script"];

  return (
    <div style={{ paddingTop: "80px" }}> {/* ✅ Fix navbar overlap */}
      <iframe
        src={selectedUrl}
        width="100%"
        height="1000px"
        style={{ border: "none" }}
        title="Career Test"
      />
    </div>
  );
}

export default Test;