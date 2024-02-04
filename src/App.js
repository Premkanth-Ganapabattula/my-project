import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './Components/LoginForm'
import Home from './Components/Home'
import Products from './Components/Products'
import ProductItemDetails from './Components/ProductItemDetails'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'
import RegistrationForm from './Components/RegistrationForm'
import UserProfileSetup from './Components/userProfileSetup'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/registration" component={RegistrationForm} />
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/user/profile/setup" component={UserProfileSetup} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute exact path="/products/:id" component={ProductItemDetails} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
