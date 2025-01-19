import React from 'react';
import { StreakSubmission } from '../slices/streakSlice';
import './streak-tracker.css';


interface StreakTrackerProps {
    submissions: StreakSubmission[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ submissions }) => {

    return (
        <div className='streak-tracker-container'>
            {submissions.map((submission, index) => (
                <div key={index} className='submission-item'>
                    {submission.dateCreated.toDateString()}
                </div>
            ))}
        </div>
    )

}

export default StreakTracker;