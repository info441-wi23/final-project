import StudySpotCard from "../components/studyspotcard";

import './css/homepage.css'

export default function HomePage(props) {

    const handleAddLocation = () => {
        //alert('handles add location @ /create (POST)')
        
    }
    return (
        <div className="home-page">
            <div className="add-card">
                
                <button
                    onMouseEnter={(event) => {
                        handleMouseEvent(event, {
                            params: {backgroundColor: '#2F2F2F', color: '#F4F4F5', cursor: 'pointer'}
                        })
                    }}
                    onMouseLeave={(event) => {
                        handleMouseEvent(event, {
                            params: {backgroundColor: '#EEE', color: '#000', cursor: ''}
                        })
                    }}
                    onClick={handleAddLocation}
                >
                    Rate Location
                </button>
            </div>
            <div className="grid">
                {/* Later */}
                {props.cards.map((entry, index) => (
                    <div key={index} className='grid-item'>
                        <StudySpotCard card={entry}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

const handleMouseEvent = (event, {params}) => {
    event.currentTarget.style.backgroundColor = params.backgroundColor
    event.currentTarget.style.color = params.color
    event.currentTarget.style.cursor = params.cursor
    event.currentTarget.style.transition = '0.3s'
}