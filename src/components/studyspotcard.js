import './css/studyspotcard.css'
import React, { Component }  from 'react';
/**
 * 
 * Study Spot Card Schema
 * 
 * props: {
 *      name : String
 *      address : String 
 *      review: String
 *      initialRating: Number
 *      ratingList: Array
 *      avgRating: Number
 *      author: String
 *      dateCreated: Date
 * }
 */

export default function StudySpotCard(props) {
    return (
        <div className="container">
            <div className="content">
                <div className="image">
                    {/* <p>Image here</p> */}
                    <img 
                        src='https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' 
                        alt='study spot location placeholder'
                    />
                </div>
                <div className="study-spot-information">
                    <p>{props.card.name}</p>
                    <p>{props.card.avgRating}/5</p>
                </div>
            </div>
        </div>
    )
}