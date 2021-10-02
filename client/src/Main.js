import { NavLink } from 'react-router-dom'
import logo from './logo.png'

export function Menu() {
    return (
        <nav className='navbar'>
            <ul>
                <li><NavLink to='/' className="navLink" activeClassName="active-navLink">Home</NavLink></li>
                <li><img src={logo} />Daily Time Keeper</li>
                <li><NavLink to='/history' className="navLink" activeClassName="active-navLink">History</NavLink></li>    
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

