
import React, { useState } from "react";
import './css/createlocation.css'


export default function CreateLocation() {
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newLocation = {
            ...formData,
            ratingsList: [formData.initialRating],
            avgRating: formData.initialRating,
            author: 'test person',
            dateCreated: new Date()

        };

        // todo: post newLocation to API endpoint here
        const data = await fetch('http://localhost:8080/create', {
            method: 'POST',
            body: JSON.stringify(newLocation),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(data)

        setFormData({
            name: '',
            address: '',
            authorReview: '',
            initialRating: '',
            ratingsList: [],         // not included in form
            avgRating: '',          // not included in form
            author: '',             // not included in form
            dateCreated: ''         // not included in form
        })

        alert(`Data being posted: ${JSON.stringify(newLocation)}`)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='form'
        >
            <div>
                <label>
                    Name:
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>
                    Address:
                </label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>
                    Your Review:
                </label>
                <textarea
                    type="text"
                    name="authorReview"
                    value={formData.authorReview}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>
                    How Many Stars:
                </label>
                <select
                    type="text"
                    name="initialRating"
                    value={formData.initialRating}
                    onChange={handleChange}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
}