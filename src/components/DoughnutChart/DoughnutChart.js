import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);


class DoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
    }
    componentDidMount() {
        const { data } = this.state;
        this.initializeDonutChart(data);
    }

    componentWillReceiveProps(nextProps) {
        this.initializeDonutChart(nextProps.data);
    }

    initializeDonutChart(data) {
        let chart = am4core.create("donut-chart", am4charts.PieChart);
        chart.data = data;
        chart.innerRadius = am4core.percent(40);
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "key";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        chart.legend = new am4charts.Legend();
    }

    render() {
        return (
            <div id="donut-chart" style={{ width: "100%", height: "100%" }} onClick={(e) => this.getTooltipData(e)}></div>
        );
    }
}
export default DoughnutChart;