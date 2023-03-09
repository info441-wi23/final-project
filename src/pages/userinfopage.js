import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './css/userinfopage.css'
import ReviewLocation from "../components/reviewlocation"

export default function UserInfoPage() {
    const navigate = useNavigate()

    return (<div>
        <div className="title-text">
                <button className="add-button" onClick={() => { navigate('/') }}>Back</button>
                <p>User Info Page</p>
                <hr></hr>
                <p>User Name: username</p>
        </div>
    </div>

    );
}