import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function CalendarChart() {
  const [value, setValue] = useState(new Date());
  const onChange = (value: any, event: any) => {
    setValue(value);
  };
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
