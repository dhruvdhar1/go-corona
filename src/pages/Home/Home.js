import React, { PureComponent } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/BounceLoader";
import urls from '../../constants/urls'
import * as actions from '../../actions/Application/actions';
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart';
import DetailsPane from '../../components/DetailsPane/DetailsPane';
import CountryTable from '../../components/CountryTable/CountryTable';
import WorldMap from '../../components/WorldMap/WorldMap'
import Topbar from '../../components/Topbar/Topbar'
import {
    formatCountrySpecificCoronaDataForDoughnutChart,
    formatCountrySpecificCoronaDataForDetailsPane,
    formatGlobalDataForTable
} from '../../deserializer/countrySpecificDataDeserializer';
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
            selectedCountryInfo: {
                country: "China",
                countryInfo: {
                    flag: "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/cn.png"
                },
            },
        }
    };

    componentDidMount() {
        this.fetchGlobalCoronaData();
        this.fetchCountrySpeceficCoronaData('china');
    }

    componentWillReceiveProps() {
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
        this.fetchCountrySpeceficCoronaData(countryData.name);
    }

    fetchGlobalCoronaData() {
        const { getGlobalCoronaData } = this.props;
        axios.get(urls.CORONA_GLOBAL_DATA).then(response => {
            getGlobalCoronaData(response.data);
            this.fetchAllCountriesData(response.data);
        }).catch();
    }

    fetchAllCountriesData(globalData) {
        const { getAllCountriesData } = this.props
        axios.get(`${urls.CORONA_COUNTRY_DATA}?sort=country`).then(response => {
            this.setState({
                globalDataLoadComplete: true,
            });
            getAllCountriesData(formatGlobalDataForTable(response.data, globalData));
        }).catch();
    }

    fetchCountrySpeceficCoronaData(country) {
        axios.get(`${urls.CORONA_COUNTRY_DATA}/${country}`).then(response => {
            this.setState({
                selectedCountryInfo: response.data,
            }, () => {
                const { getSelectedCountry } = this.props;
                getSelectedCountry(formatCountrySpecificCoronaDataForDetailsPane(response.data));
            });
        }).catch();
    }

    getMortalityRate() {
        const { selectedCountry } = this.props;
        let cases = selectedCountry && selectedCountry.find(object => object.key === 'cases');
        cases = cases ? cases.value : 1;
        let deaths = selectedCountry && selectedCountry.find(object => object.key === 'deaths');
        deaths = deaths ? deaths.value : 0;
        return ((deaths / cases) * 100).toFixed(2);
    }

    render() {
        const { globalDataLoadComplete, selectedCountryInfo } = this.state;
        const { selectedCountry, allCountriesData } = this.props;
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
                                <div className="info-heading">Please click on a location to load detailed stats.</div>
                                <div className="map-container">
                                    <WorldMap
                                        getSelectedCountryObject={(data) => this.getSelectedCountryObject(data)} />
                                </div>
                                <div className="stats-and-copyright">
                                    <div className="info-container">
                                        <div className="sub-info-container custom-pie-chart-container">
                                            <div className="mortality-rate-container">
                                                <span className="mortality-rate">{`Mortality Rate: ${this.getMortalityRate()} %`}</span>
                                                <span className="country-name">
                                                    <img src={selectedCountryInfo.countryInfo.flag} height={25} width={35} alt="country-flag" />&nbsp;
                                                {selectedCountryInfo.country}
                                                </span>
                                            </div>
                                            <div className="doughnut-chart-container">
                                                {
                                                    selectedCountry.length && (
                                                        <DoughnutChart data={selectedCountry} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="sub-info-container custom-pie-chart-container">
                                            <div className="data-point-container">
                                                <CountryTable data={allCountriesData} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="seperator"></div>
                                    <div className="copyright-text">&copy;copyright 2019-2020. All rights reserved.</div>
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
        allCountriesData: store.getAllCountriesData,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getGlobalCoronaData: data => dispatch(actions.getGlobalCoronaData(data)),
        getSelectedCountry: data => dispatch(actions.getSelectedCountry(data)),
        getAllCountriesData: data => dispatch(actions.getAllCountriesData(data)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);