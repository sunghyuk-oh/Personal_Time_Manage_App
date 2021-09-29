import { NavLink } from 'react-router-dom'

export function Menu() {
    return (
        <nav className='navbar'>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/history'>History</NavLink></li>    
            </ul>
        </nav>
    )
}

export function Main(props) {
    return (
        <div>
            <Menu />
            {props.children}
        </div>
    )
}

