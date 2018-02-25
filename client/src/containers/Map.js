import React, { Component } from "react";
import keys from '../config/keys';
import Search from "../components/forms/Search";
import PropertyDetail from "./PropertyDetail";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Dimmer, Loader } from "semantic-ui-react";

mapboxgl.accessToken = keys.mapboxToken;

class Map extends Component {
  componentDidMount() {
    this.props.fetchCurrentUserData();
    this.props.fetchMapData([ -73.98, 40.75 ]);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lng = await position.coords.longitude;
        const lat = await position.coords.latitude;
        const map = new mapboxgl.Map({
          container: "mapbox",
          style: "mapbox://styles/mapbox/outdoors-v10",
          center: [ lng, lat ],
          zoom: 15
        });
        new mapboxgl.Marker().setLngLat([ lng, lat ]).addTo(map);
        this.props.fetchMapData([ lng, lat ]);
      });
    } else {
      alert("This browser does not support geolocation.");
      this.props.fetchMapData([ -73.98, 40.75 ]);
    }
  }

  componentDidUpdate() {
    if (this.props.data.features[0]) {
      const lng = this.props.data.features[0].center[0];
      const lat = this.props.data.features[0].center[1];
      const map = new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/mapbox/outdoors-v10",
        center: [ lng, lat ],
        zoom: 15
      });
      new mapboxgl.Marker().setLngLat([ lng, lat ]).addTo(map);
    } else {
      new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/mapbox/outdoors-v10",
        center: [ -73.98, 40.75 ],
        zoom: 1
      });
    }
  }

  renderPropertyDetail = () => {
    if (this.props.loading) {
      return (
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    } else if (this.props.loading === "") {
      return <div></div>
    } else {
      return (
        <div>
          <PropertyDetail/>
          <hr/>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <Search/>
        <hr/>
        <div
          id="mapbox"
          style={{ height: "40vh", width: "100%", marginTop: "20px" }}
        />
        <hr/>
        {this.renderPropertyDetail()}
      </div>
    );
  }
}

function mapStateToProps({ mapData: { data }, propData: { loading } }) {
  return {
    data,
    loading
  }
}

export default connect(mapStateToProps, actions)(Map);