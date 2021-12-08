import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Holiday from "./Holiday";

const TaskOne = () => {
	document.title = "Task One";

	const [holidays, setHolidays] = useState([]);
	const [dropDown, setDropDown] = useState(false);
	const [filterOption, setFilterOption] = useState("all");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState('');

	useEffect(() => {
		const url = "https://www.gov.uk/bank-holidays.json";
		axios.get(url).then((res) => setHolidays(res.data.scotland.events));
	}, [filterOption]);

	console.log(holidays);

	const handleFilterOption = (e) => {
		let option = e.target.value;

		if (option === "yesterday") {
			setEndDate(moment().format("YYYY-MM-DD"));
			setStartDate(moment(endDate).subtract(1, "month").format("YYYY-MM-DD"));
		} else if (option === "week") {
			setEndDate(moment().format("YYYY-MM-DD"));
			setStartDate(moment(endDate).subtract(7, "day").format("YYYY-MM-DD"));
		} else if (option === "month") {
			setEndDate(moment().format("YYYY-MM-DD"));
			setStartDate(moment(endDate).subtract(1, "month").format("YYYY-MM-DD"));
		} else{
			handleCustomDate();
		}

		setFilterOption(option);
		setDropDown(!dropDown);
	};

	const handleCustomDate = () => {

	}

	// const endDate = moment("2020-01-09").format('YYYY-MM-DD');
	// const startDate = moment("2017-05-29").format('YYYY-MM-DD');
	// const endDate = moment().format("YYYY-MM-DD");
	// const startDate = moment(endDate).subtract(1, "month").format("YYYY-MM-DD");
	// const startDate = moment(endDate).subtract(1, 'day').format('YYYY-MM-DD');
	// const startDate = moment(endDate).subtract(7, 'day').format('YYYY-MM-DD');

	const filteredHolidays = holidays.filter((item) => {
		if (!item.date) {
			return;
		}

		const date = moment(item.date).format();
		return date > startDate && date < endDate;
	});

	console.log(startDate);
	console.log(endDate);
	console.log(filterOption);
	console.log(filteredHolidays);

	return (
		<div>
			<h1>Holidays</h1>
			<h3>
				Filtering the Holidays :{" "}
				<button onClick={() => setDropDown(!dropDown)}>{filterOption}</button>
			</h3>
			{dropDown && (
				<ul className="dropdown-menu">
					<li>
						<button value="all" onClick={(e) => handleFilterOption(e)}>
							All
						</button>
					</li>
					<li>
						<button value="yesterday" onClick={(e) => handleFilterOption(e)}>
							Yesterday
						</button>
					</li>
					<li>
						<button value="week" onClick={(e) => handleFilterOption(e)}>
							Last Week
						</button>
					</li>
					<li>
						<button value="month" onClick={(e) => handleFilterOption(e)}>
							Last Month
						</button>
					</li>
					<li>
						<button value="custom" onClick={(e) => handleFilterOption(e)}>
							Custom
						</button>
					</li>
				</ul>
			)}
			{
				filterOption === 'custom' && <div>
					<input type="text" name="startDate" id="startDate" placeholder="YYYY-MM-DD" onBlur={(e) => setStartDate(e.target.value)}/>
					<input type="text" name="endDate" id="endDate" placeholder="YYYY-MM-DD" onBlur={(e) => setEndDate(e.target.value)}/>
				</div>
			}
			{filterOption === "all"
				? holidays.map((holiday) => (
						<Holiday holiday={holiday} key={holiday.id}></Holiday>
				  ))
				: filteredHolidays.map((holiday) => (
						<Holiday holiday={holiday} key={holiday.id}></Holiday>
				  ))}
		</div>
	);
};

export default TaskOne;
