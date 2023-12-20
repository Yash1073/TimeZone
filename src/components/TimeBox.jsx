import React, { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
// import Slider from "react-rangeslider";
// import RangeSlider from 'react-range-slider-input';
// import { Tooltip } from "@mui/material";
// import noUiSlider from "nouislider-react";
// import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";




const TimeBox = ({ zone, global, setGlobal, hover }) => {
  const [timing, setTiming] = useState(
    DateTime.local().setZone(zone.timezone).hour * 2 +
    Math.round(DateTime.local().setZone(zone.timezone).minute / 30)
  );
  const formattedDayDateMonthYear = DateTime.local()
    .setZone(zone.timezone)
    .toFormat("ccc, LLL dd");

  var city = zone.city;

  const url = `https://rough-night-99a5.alkmt.workers.dev/cities?fields%5B%5D=geonameid&fields%5B%5D=asciiname&fields%5B%5D=timezone&filterByFormula=SEARCH(%22${city.toLowerCase()}%22%2C+LOWER(asciiname))&maxRecords=3&sort%5B0%5D%5Bfield%5D=population&sort%5B0%5D%5Bdirection%5D=desc`;

  const getTime = async () => {
    const response = await fetch(url);
    const data = await response.json();
  };

  const timeMap = [];

  for (let hours = 0, key = 1; hours < 24; hours++) {
    for (let minutes = 0; minutes <= 30; minutes += 30) {
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
      timeMap.push({
        key: key++,
        value: hours * 2 + minutes / 30,
        label: formattedTime,
      });
    }
  }
  let dateformatted = formattedDayDateMonthYear
  if (Math.abs(parseInt(timing - global)) > 47) {
    dateformatted = DateTime.local().setZone(zone.timezone).plus({ day: 1 }).toFormat("ccc, LLL dd");
  }
  var display =
    Math.abs(parseInt(timing - global)) > 47
      ? parseInt(timing - global) % 48
      : Math.abs(parseInt(timing - global));

  useEffect(() => {
    getTime();
  }, []);
  //

  const sliderRef = useRef(null);

  const updateSliderValue = (newValue) => {
    if (sliderRef.current) {
      sliderRef.current.Nouislider.set(newValue);
    }
  };
  useEffect(() => {
    updateSliderValue(display);
    getTime();
  }, [global]);

  const sliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    console.log(newValue);
    setGlobal(timing - newValue);
  }
  return (
    <>
      <div className="relative">
        <div>
          {/* <noUiSlider
            range={{ min: 0, max: 47 }}
            start={display}
            connect /> */}
          {/* <div ref={sliderRef} className="slider w-full"></div> */}
          <input
            className="w-full h-4 black bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600 rounded-full  appearance-none  "
            type="range"
            min={0}
            max={47}
            onChange={sliderChange}
            value={display}

          />



          <div className="pl-0 sm:pl-0 md:pl-10 flex justify-between text-sm m-4">
            {timeMap.map((item) => {
              return (
                item.key % 4 === 0 && <label key={item.key}>{item.label}</label>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold">{timeMap[display].label}</div>
          <div className="font-light">{dateformatted}</div>
        </div>
      </div >
    </>
  );
};

export default TimeBox;