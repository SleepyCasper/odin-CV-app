import { useState } from 'react'
import './App.css'
import { ObjectSection } from './components/ObjectSection';
import { ListSection } from './components/ListSection';

const personalInfoFields = [
    {name: 'fullName', label: 'Full Name', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'address', label: 'Address', type: 'text' }
]

const educationFields = [
  { name: 'school', label: 'School / University', type: 'text' },
  { name: 'degree', label: 'Degree / Major', type: 'text' },
  { name: 'startDate', label: 'Start Date', type: 'text' },
  { name: 'endDate', label: 'End Date', type: 'text' }
];

const experienceFields = [
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'startDate', label: 'Start Date', type: 'text' },
    { name: 'endDate', label: 'End Date', type: 'text' }
]

function App() {
    // Personal info states
    const [personal, setPersonal] = useState(initiatePersonal)

    function initiatePersonal() {
        let array = personalInfoFields.map(obj => [obj.name, ''])

        return Object.fromEntries(array)
    }

    function handlePersonalChange(e) {
        setPersonal(personal => ({...personal, [e.target.name]:e.target.value}))
    }

    // Experience states
    const [experience, setExperience] = useState([])


    function handleAddExperience(entry) {
        const object = {...entry, 'id':crypto.randomUUID()}
        setExperience(experience => [...experience, object])
    }

    return (
        <>
        <header className='header'>
            <h1>CV generator</h1>
            <ButtonsTop/>
        </header>
        <aside className='editor'>
            <ObjectSection 
                title="Personal info"
                fields={personalInfoFields}
                onChange={handlePersonalChange}
            />

            <ListSection
                title="Experience"
                fields={experienceFields}
                list={experience}
                onSubmitForm={handleAddExperience}
            />

            <ListSection 
                title="Education"
                fields={educationFields}
                /* onSubmitForm={handleAddEducation} */
            />
        </aside>

        <main className='preview'>
            
        </main>
        </>
    )
}

function ButtonsTop() {
    return (
        <div className='buttons-top'>
            <button type='button' className='btn-clear'><span className='icon'></span>Clear resume</button>
            <button type='button' className='btn-fill'><span className='icon'></span>Fill with example</button>
            <button type='button' className='btn-pdf'><span className='icon'></span>Download as PDF</button>
        </div>
    )
}

export default App
