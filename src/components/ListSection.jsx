import { useState } from "react";
import { Input } from "./Input";
import "./ListSection.css"


export function ListSection({title, fields, list, onSubmitForm}) {
    const [isSectionOpen, setIsSectionOpen] = useState(false)

    function handleClick() {
        setIsSectionOpen(current => !current)
    }

    const [isNewForm, setIsNewForm] = useState(false)

    function handleNewForm() {
        setIsNewForm(current => !current)
    }

    const titleFormat = title.toLowerCase().split(' ')[0]

    return (
        <section className={`section-${titleFormat}`}>
            <div className="title-click" onClick={handleClick}>
                <h2><span className={`icon-from-${titleFormat}`}></span>{title}</h2>
            </div>

            <div className={`expand ${isSectionOpen ? "" : "hidden"}`}>
               <List 
                    entries = {list}
                    isNewForm={isNewForm}
                />

                {isNewForm && <FormMock/>}

               <div className={`buttonsEdit ${isNewForm ? 'hidden' : ''}`}>
                   <button type='button' className='btn-add btn-section'
                           onClick={handleNewForm}>+</button>
               </div>
            </div>
        </section>
    )
}

function List({entries, isNewForm}) {
    return (
        <ul className={isNewForm ? 'hidden' : ''}>
            {entries.map(entry => (
                <ListEl position={entry.position}
                        company ={entry.company}
                        key ={entry.id}
                />
            ))}
        </ul>
    )
}

function ListEl({position, company}) {
    return (
        <li>
            <p>{position} in {company}</p>
            <button className='btn-listEL-edit'>Edit</button> {/* add state that shows prefilled form */}
            <button className='btn-listEL-edit'>Delete</button>
        </li>
    )
}

function FormMock() {
    return (
        <div>
            I am form
        </div>
    )
}

function Form({fields, onSubmit, onCancel}) {
    return (
        <form action="" className='form-list' onSubmit={onSubmit}>
            {fields.map(field => (
                <Input 
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                />
            ))}

            <button type="button" onClick={onCancel}>Cancel</button>
            <button 
                type="submit"
                >Save</button>
        </form>
    )
}