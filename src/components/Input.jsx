export function Input({label, name, type, value, onChange}) {
    return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
    )
}

export function Textarea({label, name, value, onChange}) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        rows={5}
        maxLength={600}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}