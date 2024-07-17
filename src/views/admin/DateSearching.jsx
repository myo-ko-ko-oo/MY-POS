import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useAuth } from "../../services/provider/AuthContextProvider";
import instance from "../../services/api/axios";
const DateSearching = ({ setProfitReports }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { headers } = useAuth();
  console.log(startDate);

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  //Search with Date
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post(
        "date-search/profit/report",
        {
          startDate: startDate ? formatDate(startDate) : null,
          endDate: endDate ? formatDate(endDate) : null,
        },
        { headers }
      );
      setProfitReports(res.data.profitReport);
      //   console.log("Response data:", res.data.profitReport);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="flex gap-3 items-center justify-end">
          <div className="start-date">
            <small className="block">start date</small>
            <DatePicker
              className="rounded-md"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date(2024, 5, 1)}
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="end-date">
            <small className="block">end date</small>
            <DatePicker
              className="rounded-md"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate} // Ensure end date is after start date
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="btn mt-6">
            <button className="p-3 ">
              <span>
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DateSearching;
