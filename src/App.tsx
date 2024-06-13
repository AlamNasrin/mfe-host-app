
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import React, { Suspense } from "react";
import Message from './components/Message';
import Counter from './components/Counter';
import Login from './components/Login';
import ListProducts from './components/ListProducts';
import EditProduct from './components/EditProduct';
import ProtectedRoute from './components/ProtectedRoute';

//@ts-ignore
const RemoteMessage = React.lazy(() => import('customerModule/Message')) // customerModule is same as in ModuleFederationPlugin in webpack.config.js in remote app
//@ts-ignore
const ListCustomers = React.lazy(() => import('customerModule/ListCustomers'))
//@ts-ignore
const EditCustomer = React.lazy(() => import('customerModule/EditCustomer'))

function App() {

    return (
        <Router>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">React MFE Host</Link>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/counter">Counter</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/remote-msg">remoteMessage</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">Customers</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<Message text='MFE Application'/>} />
                      <Route path="/counter" element={<Counter initialValue={4}/>} />
                      <Route path="/login" element={<Login/>} />
                      <Route path="/products" element={<ProtectedRoute> <ListProducts/> </ProtectedRoute>} />
                      <Route path="/products/:id" element={<ProtectedRoute><EditProduct/></ProtectedRoute>} />
                      <Route path="/remote-msg" element={<RemoteMessage/>} />
                      <Route path="/customers" element={<ListCustomers/>} />
                      <Route path="/edit-customer" element={<EditCustomer/>} />
                    </Routes>
                </Suspense>

            </main>
        </Router>
    )
}

export default App;