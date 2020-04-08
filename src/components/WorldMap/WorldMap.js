import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as actions from '../../actions/Application/actions';
import './WorldMap.scss';
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
        const { getSelectedCountryObject } = this.props;
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
            getSelectedCountryObject(ev.target.dataItem.dataContext);
        })
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#f55142");

        var click = polygonTemplate.states.create("hit");
        click.properties.fill = am4core.color("#f55142");
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
            <div id="chartdiv" className="world-map-root" onClick={(e) => this.getTooltipData(e)}></div>
        )
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getSelectedCountry: data => dispatch(actions.getSelectedCountry(data)),
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(WorldMap);