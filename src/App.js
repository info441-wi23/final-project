import React, { useState, useEffect } from "react";
import './App.css';
import HomePage from './pages/homepage';


function App() {
	const [data, setData] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		address: '',
		authorReview: '',
		initialRating: '1',
		ratingsList: [],         // not included in form
		avgRating: '',          // not included in form
		author: '',             // not included in form
		dateCreated: ''         // not included in form
	});

	// pass id to fetch relevant data
	const url = 'http://localhost:8080/studyspots'
	useEffect(() => {
		fetch(url)
			.then((r) => r.json())
			.then((r) => {
				// save data from fetch request to state
				setData(r);
			});
	}, [url, formData]);

	return (
		<div className="App">
			<HomePage cards={data} formState={[formData, setFormData]} />
		</div>
	);
}

export default App;
