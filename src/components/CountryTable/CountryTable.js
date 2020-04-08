import React, { Component } from 'react';
import './CountryTable.scss';

class CountryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                'Location',
                'Confirmed Cases',
                'Deaths'
            ],
            data: props.data ? props.data : []
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.data !== prevState.data) {
            return {
                data: nextProps.data,
            }
        }
    }

    onClickRow(row) {
        console.log('TableRow', row);
    }

    render() {
        const { data, headers } = this.state;
        return (
            <table class="table table-striped country-table-root">
                <tbody>
                        <tr>
                        {
                            headers.map(header => (
                                <th>{header}</th>
                            ))
                        }
                        </tr>
                        {
                        data.map((tableRow) => (
                            <tr className="country-table-row" onClick={() => this.onClickRow(tableRow)}>
                                {
                                    Object.keys(tableRow).map(tableData => (
                                        tableData === 'country' ? (
                                            <td>
                                                <div>
                                                    <img src={tableRow.country.flag} alt="country-flag" height={20} width={40} />&nbsp;
                                                    <span>{tableRow.country.name}</span>
                                                </div>
                                            </td>
                                        ) : (
                                            <td>
                                                {tableRow[tableData]}
                                            </td>
                                        )
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}
export default CountryTable;