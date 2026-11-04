export function Footer() {
    const footerStyle = {
        display: 'flex',
        justifyContent: 'center',
        color: 'black',
        gap: '0.3rem',
        fontSize: '0.8rem',
        padding: '0.5rem',
    }

    const linkStyle = {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
    }

    return (
        <footer style={footerStyle}>
        © 2026 <a className="credits-link" style={linkStyle} href="https://www.theodinproject.com/" target="_blank" rel="noopener noreferrer">The Odin Project</a> | <a className="credits-link" style={linkStyle} href="https://github.com/SleepyCasper" target="_blank" rel="noopener noreferrer">SleepyCasper</a>
        </footer>
    )
}