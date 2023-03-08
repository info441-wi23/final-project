import './css/header.css'
import React from 'react';
export default function Header() {
    return (
        <div className='header'>
            <div className='title' onClick={() => window.location = '/'}>
                <p>Rate My Study Spot</p>
            </div>
            <div className='call-to-action'>
                <a href="http://localhost:3000/signin">
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
                        Sign in
                    </button>
                </a>
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