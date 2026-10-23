import { useState } from "react"
import { Input } from "./Input"
import { Textarea } from "./Input"
import { Title } from "./Title"
import { formatTitle } from "../utils"
import "./ObjectSection.css"

export function ObjectSection({title, fields, entry, onChange}) {
    const [isOpen, setIsOpen] = useState(true)

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
                {fields.map((field) => (
                  field.name !== "desc" ? <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={entry[field.name]}
                    onChange={onChange}
                  /> :
                    <Textarea
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={entry.desc}
                        onChange={onChange}
                    />
                ))}
            </div>
        </section>
    )
}