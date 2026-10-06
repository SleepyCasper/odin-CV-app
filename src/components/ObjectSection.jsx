import { useState } from "react"
import { Input } from "./Input"

export function ObjectSection({ title, fields, /* formData, */ onChange}) {
    const [isOpen, setIsOpen] = useState(false)

    function handleClick() {
        setIsOpen(current => !current)
    }

    const titleFormat = title.toLowerCase().split(' ')[0]

    return (
        <section className={`section-${titleFormat}`}>
            <div className="title-click" onClick={handleClick}>
                <h2><span className={`icon-from-${titleFormat}`}></span>{title}</h2>
            </div>

            <div className={`expand ${isOpen ? "" : "hidden"}`}>
                {fields.map((field) => (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    onChange={onChange}
                  />
                ))}
            </div>
        </section>
    )
    /* return (
            <form action="" className={`form-${titleFormat}`}>
                <div className="title-click" onClick={onClick}>
                    <h2><span className={`icon-from-${titleFormat}`}></span>{title}</h2>
                </div>
                <div className="expand hidden">
                    {fields.map((field) => (
                      <Input
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ''} 
                        onChange={onChange}
                      />
                    ))}
                </div>
            </form>
    ) */
}