import { NavLink } from 'react-router-dom'
import logo from './logo2.png'

export function Menu() {
    return (
        <nav className='navbar'>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                {/* <li><img src={logo} /></li> */}
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

