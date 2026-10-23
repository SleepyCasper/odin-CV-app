import {use, useState} from "react";
import { List } from "./List";
import { Title } from "./Title";
import { formatTitle } from "../utils";

export function SkillsSection({title, lists, handleTech, handleSoft}) {
    const [isOpen, setIsOpen] = useState(false)
    
    function handleClick() {
        setIsOpen(current => !current)
    }

    return (
       <section className={`section section-${formatTitle(title)}`}>
            <Title
                title={title}
                handleClick={handleClick}
                isOpen={isOpen}
            />

            <div className={`expand ${isOpen ? "" : "hidden"}`}>
                {lists.map((list, index) => {
                    let handler
                    if (index === 0) {
                        handler = handleTech
                    } else {
                        handler = handleSoft
                    }

                    return (
                        <Skills
                            title={index === 0 ? "Technical Skills" : "Soft skills"}
                            list={list}
                            onAdd={handler.onAdd}
                            handleEdit={handler.handleEdit}
                            onDelete={handler.onDelete}
                            onReorder={handler.onReorder}
                        ></Skills>
                    )
                })}
            </div>
       </section> 
    )
    
}

function Skills({title, list, onAdd, handleEdit, onDelete, onReorder }) {
    const [currentBullet, setCurrentBullet] = useState('')
    const [editingBullet, setEditingBullet] = useState(null)
    console.log("Current bullet:" + currentBullet)
    console.log("Editing bullet:" + editingBullet)

    function startEditSkill(id) {
        let skill = list.find((skill) => skill.id === id)
        setCurrentBullet(skill.string)
        setEditingBullet(id)
    }

    function endEditSkill(id) {
        handleEdit(id, {"string" : currentBullet})
        resetEditSkill()
    }

    function resetEditSkill() {
        setCurrentBullet('')
        setEditingBullet(null)
    }
    
    function getLabel(entry) {
        return entry.string
    }

    return (
        <>
        <h3>{title}</h3>
        {list.length > 0 && <List
            entries={list}
            onEdit={startEditSkill}
            onDeleteListEl={onDelete}
            onReorder={onReorder}
            getLabel={getLabel}
        />}

        <div className="input-group">
            <input 
                type="text" 
                id="input-tech"
                value={currentBullet}
                onChange={(e) => setCurrentBullet(e.target.value)}
            />
            <button 
                type="button" 
                className="btn-add-upgrade" 
                onClick={editingBullet === null ? 
                    () => {onAdd({string: currentBullet}); setCurrentBullet('')}:
                    () => endEditSkill(editingBullet)}>
                {editingBullet === null ? 'Add' : 'Update'}
            </button>
            {editingBullet !== null && <button type="button" className="btn-edit-cancel" onClick={resetEditSkill}></button>}
        </div>
        </>
    )
}