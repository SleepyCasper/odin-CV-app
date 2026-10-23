import { formatTitle } from "../utils"

export function Title({title, handleClick, isOpen}) {
    return (
    <div className="title-click" onClick={handleClick}>
        <span className={`icon-from-${formatTitle(title)}`}></span>
        <h2>{title}</h2>
        <span className={`icon-arrow ${isOpen ? 'down' : 'up'}`}></span>
    </div>
    )
}