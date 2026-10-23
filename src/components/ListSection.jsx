import { useState } from "react";
import { Input, Textarea } from "./Input";
import { List, ListEl } from "./List";
import { Title } from "./Title";
import { moveItem, formatTitle } from "../utils";
import "./ListSection.css"



export function ListSection({title, fields, list, onSubmitNewForm, onSubmitEditForm, onDeleteListEl, onReorder}) {
    const [isOpen, setIsSectionOpen] = useState(false)

    function handleClick() {
        setIsSectionOpen(current => !current)
    }

    const [formState, setFormState] = useState("closed")

    function changeFormState(state) {
        setFormState(state)
    }

    const [editingEntry, setEditingEntry] = useState(null)

    function handleEdit(id) {
        setFormState("edit")
        setEditingEntry(id)
    }

    function getLabel(entry) {
        return `${entry.position ? entry.position : entry.degree} in ${entry.company ? entry.company : entry.school}`
    }

    let initialValues;

    if(formState === "edit") {
        initialValues = list.find(entry => entry.id === editingEntry)
    } else initialValues = null;

    return (
        <section className={`section section-${formatTitle(title)}`}>
            <Title
                title={title}
                handleClick={handleClick}
                isOpen={isOpen}
            />

            <div className={`expand ${isOpen ? "" : "hidden"}`}>
               {list.length > 0 && formState === "closed" && <List 
                   entries = {list}
                   onDeleteListEl={onDeleteListEl}
                   onEdit={handleEdit}
                   onReorder={onReorder}
                   getLabel={getLabel}
               />}

                {formState !== "closed" && 
                    <Form 
                        fields={fields} 
                        entry={initialValues}
                        onSubmitNewForm={onSubmitNewForm} 
                        onSubmitEditForm={onSubmitEditForm}
                        formState={formState} 
                        clearEditingEntry={() => setEditingEntry(null)}
                        changeFormState={changeFormState}
                        id={editingEntry}/>}

               <div className={`buttonsEdit ${formState !== "closed" ? 'hidden' : ''}`}>
                   <button type='button' className='btn-add btn-section'
                           onClick={() => setFormState("new")}><span className="icon-add"></span> Add {title.toLowerCase()}</button>
               </div>
            </div>
        </section>
    )
}

function Form({fields, entry, formState, clearEditingEntry, changeFormState, onSubmitNewForm, onSubmitEditForm, id}) {
    // Create draft of inputs
    const [draft, setDraft] = useState(initiateDraft)
    const [currentBullet, setCurrentBullet] = useState('')
    const [editingBullet, setEditingBullet] = useState(null)

    console.log(editingBullet)

    function getLabel(bullet) {
        return `${bullet.string}`
    }

    function initiateDraft() {
        let array
        if(formState === "new") {
            array = fields.map(field => [field.name, ''])
            array.push(["bullets", []])
        } else if (formState === "edit") {
            array = fields.map(field => [field.name, entry[field.name]])
            array.push(["bullets", entry.bullets])
        }
        
        return Object.fromEntries(array)
    }

    function setValue(e) {
        setDraft(draft => ({...draft, [e.target.name]:e.target.value}))
    }

    // Pass form data to App
    function submitForm(e) {
        e.preventDefault();
        e.target.reset()

        if(formState === "new") {
            onSubmitNewForm(draft)
        } else if (formState === "edit") {
            onSubmitEditForm(id, draft)
        }

        clearEditingEntry()
        changeFormState("closed")
    }



    // Add/edit/delete/reorder bullet
    function addBullet() {
        setDraft(draft => (
            {...draft, bullets:[...draft.bullets, {"string": currentBullet, "id": crypto.randomUUID()}]}))
        
        setCurrentBullet('')
    }

    function startEditBullet(id) {
        let bullet = draft.bullets.find(bullet => bullet.id === id)
        setCurrentBullet(bullet.string)
        setEditingBullet(id)
    }

    function endEditBullet(id) {
        setDraft(prevDraft => (
        {...prevDraft, bullets: prevDraft.bullets.map(bullet => 
            bullet.id === id ? {...bullet, string: currentBullet} : bullet)
        }))
        resetEditBullet()
    }

    function reorderBullet(id, toIndex) {
        setDraft(draft => ({...draft, bullets: moveItem(draft.bullets, id, toIndex)}))
    }

    function deleteBullet(id) {
        setDraft(draft => (
            {...draft, bullets: draft.bullets.filter(bullet => bullet.id !== id)}
        ))

        resetEditBullet()
    }

    function resetEditBullet() {
        setEditingBullet(null)
        setCurrentBullet('')
    }

    return (
        <form 
            action="" 
            className='form-list' 
            onSubmit={submitForm}>
            {fields.map(field => (
                field.name !== "desc" ?
                <Input 
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={draft[field.name]}
                    onChange={setValue}
                /> :
                <Textarea
                    key={field.name}
                    label={`${field.label} (optional)`}
                    name={field.name}
                    value={draft[field.name]}
                    onChange={setValue}
                />
            ))}

            <div className="achiev">
                <p className="title">Achievements (optional)</p>
                <List 
                    className="achiev-list"
                    entries={draft.bullets}
                    onEdit={startEditBullet}
                    onDeleteListEl={deleteBullet}
                    onReorder={reorderBullet}
                    getLabel={getLabel}>
                </List>

                <div className="input-group">
                    <input 
                        type="text" 
                        id="input-achiev"
                        value={currentBullet}
                        onChange={(e) => setCurrentBullet(e.target.value)}/>
                    <button type="button" className="btn-add-upgrade" onClick={editingBullet === null ? addBullet : () => endEditBullet(editingBullet)}>
                        {editingBullet === null ? 'Add' : 'Update'}
                    </button>
                    {editingBullet !== null && <button type="button" className="btn-edit-cancel" onClick={resetEditBullet}></button>}
                </div>
                
            </div>

            <div className="wrapper-form-buttons">
                <button type="button" className="btn-form-cancel" onClick={() => changeFormState("closed")}>Cancel</button>
                <button type="submit" className="btn-form-save">Save</button>
            </div>
        </form>
    )
}