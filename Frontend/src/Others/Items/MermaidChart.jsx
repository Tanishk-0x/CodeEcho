import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import './MermaidChart.css'

const MermaidChart = ({ chart }) => {
  
  const chartRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true,
      theme : "dark" , 
     });

    if (chartRef.current) {
      chartRef.current.removeAttribute("data-processed"); // Important for re-rendering
      try {
        mermaid.contentLoaded();
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    }
  }, [chart]);

  return (
    <div className="mermaid" ref={chartRef} theme : dark>
      {chart}
    </div>
  );
};

export default MermaidChart;
