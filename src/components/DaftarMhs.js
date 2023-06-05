import React, { Component } from 'react'
import API from '../axios/Api'
import DataTable from './DataTable'

export class DaftarMhs extends Component {

    state = {
        mhs: []
    }

    componentDidMount = async () => {
        await API.get("/viewdata.php")
            .then(response => this.setState({
                mhs: response.data
            }))
    }

    render() {

        const renderData = this.state.mhs.map(mhs => {
            return (
                <DataTable mhs={mhs} key={mhs.id} refresh={this.componentDidMount} />
            )
        })

        return (
            <div className="container" style={{marginTop: '20px'}}>
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nº Docto</th>
                                    <th>Fornecedor</th>
                                    <th>Lançamento</th>
                                    <th>Vencimento</th>
                                    <th>Valor R$</th>
                                    <th>Pagamento</th>
                                </tr>
                            </thead>
                            <tbody>

                                {renderData}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DaftarMhs
