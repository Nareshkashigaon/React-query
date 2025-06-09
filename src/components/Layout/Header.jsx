import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header >
      <div style={{display:"flex", gap:"10px",justifyContent:"space-between",padding:"0px 75px"}}>
        <NavLink>
            React Query
        </NavLink>
        <ul style={{display:"flex", gap:"10px"}} >
            <li><NavLink to="/">home</NavLink></li>
            <li><NavLink to="/trad">FetchOld</NavLink></li>
            <li><NavLink to="/rq">FetchRQ</NavLink></li>
            <li><NavLink to="/infinite-scroll">Infinite Scroll</NavLink></li>

        </ul>
        {/* <input type="file" typeof=""  /> */}
      </div>
    </header>
  )
}

export default Header
