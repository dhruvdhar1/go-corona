import React, { PureComponent } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/BounceLoader";
import urls from '../../constants/urls'
import * as actions from '../../actions/Application/actions';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import WorldMap from '../../components/WorldMap/WorldMap'
import Topbar from '../../components/Topbar/Topbar'
import './Home.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            globalDataLoadComplete: false,
        }
    };

    componentDidMount() {
        this.fetchGlobalCoronaData();
    }

    componentWillUnmount() {
    }

    fetchGlobalCoronaData() {
        const { getGlobalCoronaData } = this.props;
        axios.get(urls.CORONA_GLOBAL_DATA).then(response => {
            this.setState({
                globalDataLoadComplete: true,
            });
            console.log(response.data);
            getGlobalCoronaData(response.data);
        }).catch();
    }

    fetchCountrySpeceficCoronaData(country) {
        axios.get(`${urls.CORONA_COUNTRY_DATA}${country}`).then(response => {
            console.log(response.data);
        }).catch();
    }

    render() {
        const { globalDataLoadComplete } = this.state;
        return (
            <div>
                {
                    !globalDataLoadComplete ? (
                        <div className="spinner-container">
                            <ClipLoader
                                css={override}
                                size={50}
                                color={"#123abc"}
                                loading={!globalDataLoadComplete}
                                loader="BarLoader"
                            />
                        </div>
                    ) : (
                            <div>
                                <div className="top-bar-container">
                                    <Topbar />
                                </div>
                                <div className="map-container">
                                    <WorldMap />
                                </div>
                                <div className="info-container">
                                <div className="sub-info-container custom-pie-chart-container">
                                        {/* <div className="sub-vertical-section">
                                            <DetailsPane
                                                colorPallet = {['#f2493d', '#6e2ce8', '#e86e2c', '#dfe82c', '#1ade16']}
                                            />
                                        </div>
                                        <div className="sub-vertical-section">
                                            <DetailsPane 
                                                colorPallet = {['#dfe82c', '#6e2ce8', '#e86e2c',  '#1ade16', '#f2493d']}
                                            />
                                        </div> */}
                                        <DoughnutChart />
                                    </div>
                                    <div className="sub-info-container">
                                        {/* <DoughnutChart /> */}
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getGlobalCoronaData: data => dispatch(actions.getGlobalCoronaData(data)),
    };
} 
export default connect(
    null,
    mapDispatchToProps,
)(Home);