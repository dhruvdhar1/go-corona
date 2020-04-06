import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

class WorldMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryName: ''
        }
    };

    getTooltipData(e) {
        console.log(e)
    }

    componentDidMount() {
        let countryName;
        let chart = am4core.create("chartdiv", am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.data = [{
            "id": "US",
            "color": am4core.color("#3F4B3B"),
        }];
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = `{name}`;
        polygonTemplate.fill = am4core.color("#878a87");
        polygonTemplate.events.on("hit", function(ev) {
            ev.target.series.chart.zoomToMapObject(ev.target);
            countryName = ev.target.dataItem.dataContext;
            // hello(ev.target.dataItem.dataContext);
        })

        console.log(countryName);
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#e8912e");
        chart.zoomControl = new am4maps.ZoomControl();
        chart.events.on("ready", function(ev) {
            polygonSeries.getPolygonById("CN").isHover = true;
        });
        this.chart = chart; 
    }

    componentWillUnmount() {
        this.chart.dispose();
    }
    render() {
        return (
            <div id="chartdiv" style={{ width: "100%", height: "500px" }} onClick={(e) => this.getTooltipData(e)}></div>
        )
    }
}
export default WorldMap;