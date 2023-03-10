import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import HomePage from './pages/homepage';
import StudySpotPage from "./pages/studyspotpage";
import UserInfoPage from "./pages/userinfopage";


function App() {
	const [data, setData] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		address: '',
		authorReview: '',
		initialRating: '5',
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
			}).catch(err => {
				console.log(err);
			})
	}, [url, formData]);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={
						<HomePage
							cards={data}
							formState={[formData, setFormData]}
						/>
					} />
					<Route path='/location/:id' element={
						<StudySpotPage />
					} />
					<Route path='/userinfo' element={
						<UserInfoPage />
					} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
