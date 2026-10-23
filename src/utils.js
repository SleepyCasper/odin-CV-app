export function moveItem(array, id, toIndex) {
    const obj = array.find(obj => obj.id === id)
    const objIndex = array.indexOf(obj)

    return array.toSpliced(objIndex, 1).toSpliced(toIndex, 0, obj)
}

export function formatTitle(title) {
    return title.toLowerCase().split(' ')[0]
}