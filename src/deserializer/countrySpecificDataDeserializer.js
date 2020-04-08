import globe from '../assets/global.svg';
export function formatCountrySpecificCoronaDataForDoughnutChart(data) {
    let formattedData = [];
    const dataPoints = ['cases', 'todayCases', 'deaths', 'recovered', 'active'];
    Object.keys(data).length && Object.keys(data).forEach(item => {
        let tempObject = {};
        if (dataPoints.find(point => point === item)) {
            tempObject = {
                key: item,
                value: data[item],
            }
            formattedData.push(tempObject);
        }
    });
    return formattedData;
}

export function formatCountrySpecificCoronaDataForDetailsPane(data) {
    let formattedData = [];
    const dataPoints = ['cases', 'deaths', 'recovered', 'active'];
    Object.keys(data).length && Object.keys(data).forEach(item => {
        let tempObject = {};
        if (dataPoints.find(point => point === item)) {
            tempObject = {
                key: item,
                value: data[item],
            }
            formattedData.push(tempObject);
        }
    });
    return formattedData;
}

export function formatGlobalDataForTable(data, globalData) {
    const formattedData = [];
    formattedData.push({
        country: {
            flag: globe,
            name: 'World',
        },
        cases: globalData.cases,
        deaths: globalData.deaths,
    })
    data.forEach(index => {
        let countryObject = {
            country: {
                flag: index.countryInfo.flag,
                name: index.country,
            },
            cases: index.cases,
            deaths: index.deaths,
        }
        formattedData.push(countryObject);
    });
    return formattedData;
}
export default formatCountrySpecificCoronaDataForDoughnutChart;