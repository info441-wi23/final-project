import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './css/studyspotpage.css'
import ReviewLocation from "../components/reviewlocation"

export default function StudySpotPage() {
    const { id } = useParams()
    const [reviewData, setReviewData] = useState([])
    const [generalInfo, setGeneralInfo] = useState({ rating: 0, name: '' })
    const [toggleForm, setToggleForm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getCardData = async (id) => {
            const data = await fetch(`http://localhost:8080/reviews?spotID=${id}`)
            setReviewData(await data.json())
        }

        getCardData(id)
    }, [id])

    useEffect(() => {
        const getCardData = async (id) => {

            const totalRating = reviewData.reduce((acc, cur) => acc + cur.rating, 0);
            if (reviewData.length === 0) {
                setGeneralInfo({ name: reviewData.spotid, rating: -1 })
            } else if (reviewData.length > 0) {
                setGeneralInfo({ name: reviewData.spotid, rating: totalRating / reviewData.length })
            }
        }
        getCardData(reviewData)
    }, [reviewData])

    return (
        <div className="root">
            <div className="button-container">
                <button className="add-button" onClick={() => setToggleForm(!toggleForm)}>Add Review</button>
                {toggleForm && (
                    <ReviewLocation id={id} setToggleForm={setToggleForm} />
                )}
            </div>
            <div className="title-text">
                <button className="add-button" onClick={() => { navigate('/') }}>Back</button>
                <p>Study Spot Page</p>
                <hr></hr>
                <p>Location Name: {generalInfo.name}</p>
                <p>Average Rating: {parseInt(generalInfo.rating) === -1 ? 'NA' : generalInfo.rating + '/5'}</p>
            </div>
            {reviewData.length > 0 && (
                reviewData.map((entry, index) => (
                    <div className="review-container" key={index}>
                        <div className="row" style={{ textAlign: 'left' }}>
                            <div className="column" style={{ padding: '10px 20px' }}>
                                <p><strong>Author:</strong> {entry.author}</p>
                                <p><strong>Rating:</strong> {entry.rating}/5</p>
                                <p><strong>Date Created:</strong> {(new Date(entry.dateCreated)).toLocaleDateString()}</p>
                                <div><strong>Review:</strong> {entry.reviewText}</div>
                            </div>
                            <div className="column">
                                <div className="image">
                                    <img src="https://cdn.pixabay.com/photo/2021/03/10/06/32/campus-6083653_1280.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {reviewData.length === 0 && (
                <div>No reviews yet!</div>
            )}
        </div>
    )
}