import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Sidebar: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <aside className="col-2 h-100">
      <img src={logo} alt="Logo" className="img-fluid px-3 py-4" />
      <ul className="p-0 m-0">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <span className="mdi mdi-calendar-check"></span>
            <label>Agendamentos</label>
          </Link>
        </li>
        <li>
          <Link to="/clientes" className={location.pathname === '/clientes' ? 'active' : ''}>
            <span className="mdi mdi-account-multiple"></span>
            <label>Clientes</label>
          </Link>
        </li>
        <li>
          <Link to="/colaboradores" className={location.pathname === '/colaboradores' ? 'active' : ''}>
            <span className="mdi mdi-card-account-details-outline"></span>
            <label>Colaboradores</label>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default withRouter(Sidebar);