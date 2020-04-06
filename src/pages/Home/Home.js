import React, { PureComponent } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/BounceLoader";
import urls from '../../constants/urls'
import * as actions from '../../actions/Application/actions';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import DetailsPane from '../../components/DetailsPane/DetailsPane';
import WorldMap from '../../components/WorldMap/WorldMap'
import Topbar from '../../components/Topbar/Topbar'
import { formatCountrySpecificCoronaDataForDoughnutChart } from '../../deserializer/countrySpecificDataDeserializer';
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
        this.fetchCountrySpeceficCoronaData('china');
    }

    shouldComponentUpdate() {
        const { selectedCountry } = this.props;
        return selectedCountry.length;
    }

    componentWillUnmount() {
        const { getSelectedCountry, getGlobalCoronaData } = this.props;
        getGlobalCoronaData([]);
        getSelectedCountry([]);
        this.setState({
            globalDataLoadComplete: false,
        });
    }

    getSelectedCountryObject(countryData) {
        console.log('Hellooooooo : ', countryData)
        this.fetchCountrySpeceficCoronaData(countryData.name);
    }

    fetchGlobalCoronaData() {
        const { getGlobalCoronaData } = this.props;
        axios.get(urls.CORONA_GLOBAL_DATA).then(response => {
            this.setState({
                globalDataLoadComplete: true,
            });
            getGlobalCoronaData(formatCountrySpecificCoronaDataForDoughnutChart(response.data));
        }).catch();
    }

    fetchCountrySpeceficCoronaData(country) {
        const { getSelectedCountry } = this.props;
        axios.get(`${urls.CORONA_COUNTRY_DATA}${country}`).then(response => {
            getSelectedCountry(formatCountrySpecificCoronaDataForDoughnutChart(response.data));
        }).catch();
    }

    render() {
        const { globalDataLoadComplete } = this.state;
        const { globalData, selectedCountry } = this.props;
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
                                    <WorldMap
                                        getSelectedCountryObject={(data) => this.getSelectedCountryObject(data)} />
                                </div>
                                <div className="info-container">
                                    <div className="sub-info-container custom-pie-chart-container">
                                        <div className="country-info">
                                            <img className="country-flag" src="https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/in.png" alt="country-flag" height={40} width={65} />
                                            <span className="country-text">India</span>
                                        </div>
                                        <div className="data-point-container">
                                            {
                                                selectedCountry.length && (
                                                    <div>
                                                        <div className="sub-vertical-section">
                                                            <DetailsPane
                                                                data={selectedCountry}
                                                                colorPallet={['#f2493d', '#6e2ce8', '#e86e2c', '#dfe82c', '#1ade16']}
                                                            />
                                                        </div>
                                                        <div className="sub-vertical-section">
                                                            <DetailsPane
                                                                data={selectedCountry}
                                                                colorPallet={['#dfe82c', '#6e2ce8', '#e86e2c', '#1ade16', '#f2493d']}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div className="sub-info-container custom-pie-chart-container">
                                        {
                                            globalData.length && (
                                                <DoughnutChart data={globalData} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

export function mapStateToProps(store) {
    return {
        selectedCountry: store.getSelectedCountry,
        globalData: store.getGlobalCoronaData,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getGlobalCoronaData: data => dispatch(actions.getGlobalCoronaData(data)),
        getSelectedCountry: data => dispatch(actions.getSelectedCountry(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);