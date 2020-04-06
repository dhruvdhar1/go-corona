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
    formattedData.push({
        key: 'mortalityRate',
        value: `${((data['deaths']/ data['cases']) * 100).toFixed(2)} %`,
    })
    return formattedData;
}
export default formatCountrySpecificCoronaDataForDoughnutChart;