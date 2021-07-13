
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import Agendamentos from './pages/Agendamentos'
import Clientes from './pages/Clientes'
import Colaboradores from './pages/Colaboradores'
import Servicos from './pages/Servicos'

import './styles.css';


const Routes = () => {
  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Router>
            <Sidebar />

            <Switch>
              <Route path="/" component={Agendamentos} exact />
              <Route path="/clientes" component={Clientes} exact />
              <Route path="/colaboradores" component={Colaboradores} exact />
              <Route path="/servicos" component={Servicos} exact />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  )
}

export default Routes;