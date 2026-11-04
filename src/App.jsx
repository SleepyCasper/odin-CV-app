import { useRef, useState } from 'react'
import './App.css'
import { personalExample, experienceExample, educationExample, techSkillsExample, softSkillsExample } from './example';
import { ObjectSection } from './components/ObjectSection';
import { ListSection } from './components/ListSection';
import { SkillsSection } from './components/SkillsSection';
import { Preview } from './components/Preview';
import { Zoom } from './components/Preview';
import { Footer } from './components/Footer';
import { moveItem } from './utils';

// TODO warning about CV being too long
// // TODO fix cut off of preview
// // TODO fix dragging offset
// // TODO do save as PDF
// // TODO conformation dialog when clearing or filling with example 

const personalInfoFields = [
    { name: 'fullName', label: 'Full Name', type: 'text'},
    { name: 'role', label: 'Role', type: 'text'},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'desc', label: 'Profile', type: 'textarea'}
]

const educationFields = [
  { name: 'school', label: 'School / University', type: 'text' },
  { name: 'degree', label: 'Degree / Major', type: 'text' },
  { name: 'startDate', label: 'Start Date', type: 'text' },
  { name: 'endDate', label: 'End Date', type: 'text' },
  { name: 'desc', label: 'Description', type: 'textarea'},
];

const experienceFields = [
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'startDate', label: 'Start Date', type: 'text' },
    { name: 'endDate', label: 'End Date', type: 'text' },
    { name: 'desc', label: 'Description', type: 'textarea'},
]

function App() {
    //Sections keys
    const [listSectionsKeys, setKeys] = useState({'education': 0, 'experience': 1, 'skills':2})

    // Personal info states
    const [personal, setPersonal] = useState(initiatePersonal)

    function initiatePersonal() {
        let array = personalInfoFields.map(obj => [obj.name, ''])

        return Object.fromEntries(array)
    }

    function handlePersonalChange(e) {
        setPersonal(personal => ({...personal, [e.target.name]:e.target.value}))
    }

    // Experience/education states
    const [experience, setExperience] = useState([])
    const [education, setEducation] = useState([])

    function handleAdd(setter, entry) {
        const object = {...entry, 'id':crypto.randomUUID()}
        setter(state => [...state, object])
    }

    function handleDelete(setter, id) {
        setter(prevState => prevState.filter(obj => obj.id !== id))
    }

    function handleEdit(setter, id, entry) {
        setter(prevState => prevState.map(obj => 
            obj.id === id ? {...entry, "id": id} : obj
        ))
    }

    function handleReorder(setter, id, toIndex) {
        setter(prevState => moveItem(prevState, id, toIndex))
    }

    // Fill with example
    function fillWithExample(setter, example) {
        setter(example)
        console.log("Filling with examples")
    }

    //Clear states
    function clear() {
        setKeys(prev => {
            const next = {}
            for (const key in prev) {
                next[key] = crypto.randomUUID()
            }
            return next
        })
        console.log(listSectionsKeys)
        setPersonal(initiatePersonal)
        setEducation([])
        setExperience([])
        setTechSkills([])
        setSoftSkills([])
    }

    //Skills states
    const [techSkills, setTechSkills] = useState([])
    const [softSkills, setSoftSkills] = useState([])

    // handlers for skills
    function makeHandlers(setter) {
        return {
            onAdd: (argument) => handleAdd(setter, argument),
            handleEdit: (argument1, argument2) => handleEdit(setter, argument1, argument2),
            onDelete: (argument) => handleDelete(setter, argument),
            onReorder: (argument1, argument2) => handleReorder(setter, argument1, argument2)
        }
    }

    const techHandlers = makeHandlers(setTechSkills)
    const softHandlers = makeHandlers(setSoftSkills)

    const skillsList = [
        {   'id':0,
            'title': "Technical skills",
            'handlers': techHandlers,
            'list': techSkills
        },
        {
            'id':1,
            'title': "Soft skills",
            'handlers': softHandlers,
            'list': softSkills
        }
    ]

    // Handle preview scale
    const [zoom, setZoom] = useState(1)

    function zoomIn() {
        if(zoom >= 2) return;
        setZoom(zoom + 0.5)
    }

    function zoomOut() {
        if(zoom <= 1) return;
        setZoom(zoom - 0.5)
    }

    // Drop down menu
    const [dropped, setDropped] = useState(false)

    //Conformation dialog
    const dialogRef = useRef(null)

    const openModal = () => dialogRef.current?.showModal()
    const closeModal = () => dialogRef.current?.close();

    const [caller, setCaller] = useState(null)
    console.log(caller)

    return (
        <>
        <Dialog 
            dialogRef={dialogRef}
            onClose={closeModal}
            onFill={() => {
                fillWithExample(setPersonal, personalExample)
                fillWithExample(setExperience, experienceExample)
                fillWithExample(setEducation, educationExample)
                fillWithExample(setTechSkills, techSkillsExample)
                fillWithExample(setSoftSkills, softSkillsExample)
            }}
            onClear={clear}
            caller={caller}
        ></Dialog>
        <header className='header'>
            <h1>CV generator</h1>
            <ButtonsTop
                dropped={dropped}
                onClick={(caller) => {openModal(); setCaller(caller)}}
                />
            <DropMenu onClick={() => dropped ? setDropped(false) : setDropped(true)}/>
        </header>
        <aside className='editor'>
            <ObjectSection 
                title="Personal info"
                fields={personalInfoFields}
                onChange={handlePersonalChange}
                entry={personal}
            />

            <ListSection
                key={listSectionsKeys.experience}
                title="Experience"
                fields={experienceFields}
                list={experience}
                onSubmitNewForm={(argument) => handleAdd(setExperience, argument)}
                onDeleteListEl={(argument) => handleDelete(setExperience, argument)}
                onSubmitEditForm={(argument, argument2) => handleEdit(setExperience, argument, argument2)}
                onReorder={(argument, argument2) => handleReorder(setExperience, argument, argument2)}
            />

            <ListSection
                key={listSectionsKeys.education}
                title="Education"
                fields={educationFields}
                list={education}
                onSubmitNewForm={(argument) => handleAdd(setEducation, argument)}
                onDeleteListEl={(argument) => handleDelete(setEducation, argument)}
                onSubmitEditForm={(argument1, argument2) => handleEdit(setEducation, argument1, argument2)}
                onReorder={(argument1, argument2) => handleReorder(setEducation, argument1, argument2)}
            />
            
            <SkillsSection
                key={listSectionsKeys.skills}
                title="Skills"
                list={skillsList}
                handleTech={techHandlers}
                handleSoft={softHandlers}
            />
        </aside>

        <main className='main'>
            <Preview
                personal={personal}
                education={education}
                experience={experience}
                techSkills={techSkills}
                softSkills={softSkills}
                zoom={zoom}/>

            <Zoom 
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}/>
        </main>
        <Footer/>
        </>
    )
}

function ButtonsTop({onClick, dropped}) {
    return (
        <div className={`buttons-top ${dropped ? "dropped" : ""}`}>
            <button type='button' className='btn-clear' onClick={() => onClick('clear')}>Clear resume</button>
            <button type='button' className='btn-fill'
            onClick={() => onClick('fill')}>Fill with example</button>
            <button type='button' className='btn-pdf' onClick={() => window.print()}>Save as PDF</button>
        </div>
    )
}

function DropMenu({onClick}) {
    return (
        <div className='btn-drop'>
            <input id="checkbox2" type="checkbox"/>
            <label className="toggle toggle2" htmlFor="checkbox2" onClick={onClick}>
              <div id="bar4" className="bars"></div>
              <div id="bar5" className="bars"></div>
              <div id="bar6" className="bars"></div>
            </label>
        </div>
    )
}

function Dialog({caller, onFill, onClear, dialogRef, onClose}) {
    let text 
    if(caller === "fill") {
        text = "fill CV with example"
    } else {
        text = "clear CV"
    }
    return (
        <dialog ref={dialogRef}>
            <p>Are you sure you want to {text}? Your personal data will be wiped</p>
            <div className="dialog-buttons">
                <button onClick={onClose}>No</button>
                <button onClick={() => {
                    if (caller === "fill") {
                        onFill();
                    } else onClear()
                    onClose()
                }}>Yes</button>
            </div>
        </dialog>
    )
}

export default App
