import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Header from './Header'
import DaftarMhs from './DaftarMhs'

function App () {
    return (
        <BrowserRouter>
            <Header/>
            <Route path="/" exact component={DaftarMhs}/>
        </BrowserRouter>
    )
}

export default App