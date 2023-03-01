import StudySpotCard from "../components/studyspotcard";
import React, { useState } from 'react';

import './css/homepage.css'
import CreateLocation from "../components/createlocation";

export default function HomePage(props) {
    const [toggleForm, setToggleForm] = useState(false)

    const handleFormToggle = () => {
        setToggleForm(!toggleForm)
    }

    return (
        <div className="home-page">
            <div className="add-card">
                <button
                    onMouseEnter={(event) => {
                        handleMouseEvent(event, {
                            params: { backgroundColor: '#2F2F2F', color: '#F4F4F5', cursor: 'pointer' }
                        })
                    }}
                    onMouseLeave={(event) => {
                        handleMouseEvent(event, {
                            params: { backgroundColor: '#EEE', color: '#000', cursor: '' }
                        })
                    }}
                    onClick={handleFormToggle}
                >
                    Add Location
                </button>
                <button
                    onMouseEnter={(event) => {
                        handleMouseEvent(event, {
                            params: { backgroundColor: '#2F2F2F', color: '#F4F4F5', cursor: 'pointer' }
                        })
                    }}
                    onMouseLeave={(event) => {
                        handleMouseEvent(event, {
                            params: { backgroundColor: '#EEE', color: '#000', cursor: '' }
                        })
                    }}
                >
                    Rate Location
                </button>
            </div>
            {toggleForm && (
                <div style={{ width: '80%' }}>
                    <CreateLocation />
                </div>
            )}
            <div className="grid">
                {/* Later */}
                {props.cards.map((entry, index) => (
                    <div key={index} className='grid-item'>
                        <StudySpotCard card={entry} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const handleMouseEvent = (event, { params }) => {
    event.currentTarget.style.backgroundColor = params.backgroundColor
    event.currentTarget.style.color = params.color
    event.currentTarget.style.cursor = params.cursor
    event.currentTarget.style.transition = '0.3s'
}