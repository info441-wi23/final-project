import React from "react";
import { useState } from "react";
import './css/form.css'

export default function ReviewLocation({ id, setToggleForm }) {
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        spotID: '',
        reviewText: '',
        rating: '',
        dateCreate: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        const newLocation = {
            ...formData,
            rating: formData.rating ? formData.rating : 1,
            spotID: id,
            dateCreated: new Date()

        };

        // todo: post newLocation to API endpoint here
        const data = await fetch('http://localhost:8080/reviews', {
            method: 'POST',
            body: JSON.stringify(newLocation),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => {
            console.log(err);
        })

        console.log(data)

        setFormData({
            name: '',
            author: '',
            spotID: '',
            reviewText: '',
            rating: '',
            dateCreate: ''
        })

        setToggleForm(false)
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
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
                    Author
                </label>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>
                    Your Review:
                </label>
                <textarea
                    type="text"
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>
                    How Many Stars:
                </label>
                <select
                    type="text"
                    name="rating"
                    value={formData.rating}
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