import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export function List({ entries, onEdit, onDeleteListEl, onReorder, getLabel}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    function handleDragEnd({ active, over }) {
        if (!over || active.id === over.id) return

        const toIndex = entries.findIndex(entry => entry.id === over.id)
        onReorder(active.id, toIndex)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={entries.map(entry => entry.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul>
                    {entries.map((entry) => (
                        <ListEl
                            key={entry.id}
                            entry={entry}
                            label={getLabel(entry)}
                            onDelete={onDeleteListEl}
                            onEdit={() => onEdit(entry.id)}
                        />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
    )
}


export function ListEl({ entry, onEdit, onDelete, label}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: entry.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            id={entry.id}
            className={`list-li ${isDragging ? "dragged" : ""}`}
        >
            <div
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
                className="draggable-dots"
            ></div>
            <p>{label}</p>
            <button type="button" className='btn-li-edit' onClick={onEdit}></button>
            <button type="button" className='btn-li-delete' onClick={() => onDelete(entry.id)}></button>
        </li>
    )
}