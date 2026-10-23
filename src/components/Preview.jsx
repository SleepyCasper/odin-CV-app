import { useState } from "react";
import "./Preview.css"

export function Preview({personal, education, experience, techSkills, softSkills, zoom}) {
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const [currentY, setCurrentY] = useState(0)

    const [isDragging, setIsDragging] = useState(false)

    function startMove(e) {
        if (zoom === 1) return
        setIsDragging(true)
        e.currentTarget.setPointerCapture(e.pointerId)

        setStartX(e.clientX - currentX)
        setStartY(e.clientY - currentY)
    }

    function handleDragging(e) {
        if (!isDragging) return;

        setCurrentX(e.clientX - startX)
        setCurrentY(e.clientY - startY)

        e.currentTarget.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    function endMove(e) {
        if (!isDragging) return;

        setIsDragging(false)
        e.currentTarget.releasePointerCapture(e.pointerId);
    }

    return (
        <div 
            id="preview"
            className={`preview ${zoom > 1 ? 'grab' : ''}`} 
            style={{ '--zoom': zoom }}
            onPointerDown={startMove}
            onPointerMove={handleDragging}
            onPointerUp={endMove}>
            <div className="heading">
                <div className="left">
                    <div className="name">{personal.fullName}</div>
                    <div className="role">{personal.role}</div>
                </div>
                
                <div className="personal">
                    <p>{personal.email}</p>
                    <p>{personal.phone}</p>
                    <p>{personal.address}</p>
                </div>
            </div>

            <div className="main-content">
                <div className="main-left">
                    <div className={`profile ${personal.desc ? "" : "hidden"}`}>
                        <h3>Profile</h3>
                        <p>{personal.desc}</p>
                    </div>
                    <div className={`experience ${experience.length !== 0 ? '' : 'hidden'}`}>
                        <h3>Work Experience</h3>
                        <div className="experience-grid">
                            {experience.map(entry => (
                                <div className="entry">
                                    <div className="left">
                                        <p className="company">{entry.company}</p>
                                        <p className="date">{entry.startDate} - {entry.endDate}</p>
                                    </div>
                                    <div className="right">
                                        <p className="role">{entry.position}</p>
                                        <p className="desc">{entry.desc}</p>
                                        <ul className="list-achiev">
                                            {entry.bullets && entry.bullets.map(bullet => (
                                                <li key={bullet.id}>{bullet.string}</li>
                                            ))}
                                        </ul>
                                        
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`education ${education.length !== 0 ? "" : "hidden"}`}>
                        <h3>Education</h3>
                        <div className="education-grid">
                            {education.map(entry => (
                                <div className="entry">
                                    <div className="left">
                                        <p className="school">{entry.school}</p>
                                        <p className="date">{entry.startDate} - {entry.endDate}</p>
                                    </div>
                                    <div className="right">
                                        <p className="degree">{entry.degree}</p>
                                        <p className="desc">{entry.desc}</p>
                                        <ul className="list-achiev">
                                            {entry.bullets && entry.bullets.map(bullet => (
                                                <li key={bullet.id}>{bullet.string}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`skills ${techSkills.length === 0 && softSkills.length === 0 ? 'hidden' : ''}`}>
                    <h3>Skills</h3>
                    <div className="list-group">
                        <h4>Technical skills</h4>
                        <ul className="list-technical">
                            {techSkills.map(skill => (
                                <li className="skill">{skill.string}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="list-group">
                        <h4>Soft skills</h4>
                        <ul className="list-soft">
                            {softSkills.map(skill => (
                                <li className="skill">{skill.string}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export function Zoom({onZoomIn, onZoomOut}) {
    
    return (
        <div className="zoom">
            <button type="button" className="zoom-out" onClick={onZoomOut}>-</button>
            <button className="zoom-in" onClick={onZoomIn}>+</button>
        </div>
    )
}