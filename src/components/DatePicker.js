// DatePickerComponent.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ selectedDate, onDateChange }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => onDateChange(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control w-100"
        />
    );
};

export default DatePickerComponent;
