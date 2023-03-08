import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './css/studyspotpage.css'

export default function StudySpotPage() {
    const { id } = useParams()
    const [reviewData, setReviewData] = useState([])
    const [avgRating, setAvgRating] = useState(0)

    useEffect(() => {
        const getCardData = async (id) => {
            const data = await fetch(`http://localhost:8080/reviews?spotID=${id}`)
            setReviewData(await data.json())
        }

        getCardData(id)

        const totalRating = reviewData.reduce((acc, cur) => acc + cur.rating, 0);
        if (reviewData.length === 0) {
            setAvgRating(-1)
        } else {
            setAvgRating(totalRating / reviewData.length)
        }
    })

    return (
        <div className="root">
            <div className="title-text">
                <p>Study Spot Page</p>
                <hr></hr>
                <p>Location Name: {reviewData.map(entry => entry.name)[0]}</p>
                <p>Average Rating: {avgRating === -1 ? 'NA' : avgRating + '/5'}</p>
            </div>
            {reviewData.length > 0 && (
                reviewData.map((entry, index) => (
                    <div className="container" key={index}>
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
        </div>
    )
}