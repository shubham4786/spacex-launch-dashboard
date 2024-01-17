"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMissionApi } from "../redux/slice";
import MissionDetails from "../components/MissionDetails";
import LoaderImage from "@/assets/loader.gif";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [updateData, setUpdateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const missionData = useSelector((data) => data.missionData.missionApiData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = UserAuth();
  const route = useRouter();

  function filterData(value) {
    let newData = [];
    if (value == "upcoming") {
      newData = missionData.filter((item) => {
        return item.upcoming;
      });
    } else if (value == "past") {
      newData = missionData.filter((item) => {
        return !item.upcoming;
      });
    } else {
      newData = missionData;
    }

    if (startDate && endDate) {
      newData = newData.filter((item) => {
        const newDate = new Date(item.launch_date_local);
        return newDate >= new Date(startDate) && newDate <= new Date(endDate);
      });
    }
    setUpdateData(newData);
  }

  const setDateStart = (e) => {
    setStartDate(e.target.value);
    filterData();
  };
  const setDateEnd = (e) => {
    setEndDate(e.target.value);
    filterData();
  };

  useEffect(() => {
    setUpdateData(missionData);
  }, [missionData]);

  useEffect(() => {
    dispatch(fetchMissionApi())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      route.push("/login");
    }
  }, [user]);
  return (
    <>
      <div className="bg-black text-white  ">
        <div className=" bg-black flex flex-wrap justify-center ">
          <select
            className="px-1 py-2  rounded-md w-1/3 bg-gray-800 m-5"
            onChange={(e) => filterData(e.target.value)}
          >
            <option value="all">All Mission</option>
            <option value="past">Past Mission</option>
            <option value="upcoming">Upcoming Mission</option>
          </select>
        </div>
        <div className=" bg-black flex flex-wrap justify-center ">
          <div>
            <label>Start Date:</label>
            <input
              className="px-1 py-2  rounded-md  bg-gray-700 m-5"
              type="date"
              value={startDate}
              onChange={(e) => setDateStart(e)}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              className="px-1 py-2  rounded-md  bg-gray-700 m-5"
              type="date"
              value={endDate}
              onChange={(e) => setDateEnd(e)}
            />
          </div>
        </div>
        {loading ? (
          <div className=" flex flex-wrap justify-center py-10  ">
            <Image
              className="rounded"
              src={LoaderImage}
              width={500}
              alt={LoaderImage}
              priority
            />
          </div>
        ) : (
          <div className=" flex flex-wrap justify-center  ">
            {updateData.map((flight, index) => (
              <MissionDetails key={index} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
