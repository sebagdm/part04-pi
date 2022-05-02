import React, { useState, useEffect, useRef } from "react";
import s from "./styles/ProgressBar.module.css";

const ProgressBar = ({ start, end, width }) => {
  const containerRef = useRef(null);
  const [progressWidth, setprogressWidth] = useState(100);

  const calculateProgress = (start, end) => {
    const porcentaje = (end - start) / (end / 100);
    return porcentaje;
  };

  useEffect(() => {
    calculateProgress(start, end);

    const instersectionCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setTimeout(() => {
          setprogressWidth(calculateProgress(start, end));
        }, 100);
      }
    };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver(instersectionCallback, options);
    if (containerRef.current) observer.observe(containerRef.current);
    let ContRefCurrent = containerRef.current;

    return () => {
      if (ContRefCurrent) observer.unobserve(ContRefCurrent);
    };
  }, [progressWidth, containerRef, end, start]);

  return (
    <div
      ref={containerRef}
      style={{ maxWidth: width === "full" ? "100%" : `${width}px` }}
      className={s.barContainer}
    >
      <div className={`${s.child} ${s.progressColor}`}></div>
      <div
        style={{ width: `${progressWidth}%` }}
        className={`${s.child} ${s.progressTracker}`}
      ></div>
    </div>
  );
};

export default ProgressBar;
