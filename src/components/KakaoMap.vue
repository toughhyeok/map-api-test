<template>
  <div>
    <div class="MapControlView">
      <a href="#" class="current-marker" @click="onCurrentMarkerBtn"></a>
      <a href="#" class="access-location" @click="onCurrntBtn"></a>
      <div class="zoom-btn">
        <span class="zoom-in-btn" @click="zoomIn"></span>  
        <span class="zoom-out-btn" @click="zoomOut"></span>
      </div>
    </div>

    <div class="shadow" :style="{left: barShadowLeft}">
      <div class="bar"></div>
      <span class="sidebar-btn" :style="{'background-position-y': sidebarBtnPostion}"
        @click="onSideBarBtn">
      </span>
    </div>

    <div class="mapContainer" :style="{left: mapContainerLeft}">
      <div id="map"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
    start_lat: {
      type: Number,
      required: true
    },
    start_lng: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      barShadowLeft: '390px',
      sidebarBtnPostion: 0,
      mapContainerLeft: '390px',
    }
  },
  watch: {
    barShadowLeft() {
      this.mapContainerLeft = this.barShadowLeft;
      if (this.barShadowLeft) this.sidebarBtnPostion = 0;
      else this.sidebarBtnPostion = '-66px';
      this.setPostPosition();
      setTimeout(this.movePostPosition, 0.1);
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_SERVICE_KEY}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      this.getStationsInfo();
      this.setCurrentPosition();

      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.start_lat, this.start_lng),
        level: 13,
      };
      
      this.map = new kakao.maps.Map(container, options);
    },
    getStationsInfo() {
      const $this = this;
      this.$axios.get(`http://openapi.seoul.go.kr:8088/${process.env.VUE_APP_DATA_SEOUL_AUTH_KEY}/json/StationAdresTelno/1/5/`)
        .then(response => {
          $this.stationsInfo = response.data.StationAdresTelno;
          console.log(response);
        });
    },
    setCurrentPosition() {
      if (navigator.geolocation) {
      const $this = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        $this.cur_lat = position.coords.latitude;
        $this.cur_lng = position.coords.longitude;
      });
      }
    },
    movePositionSmooth(lat, lng) {
      if (!lat || !lng) return;
      this.relayout();
      this.map.panTo(new kakao.maps.LatLng(lat, lng));
    },
    movePosition(lat, lng) {
      if (!lat || !lng) return;
      this.relayout();
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
    },
    setPostPosition() {
      const tmp_pos = this.getCenter();
      this.post_lat = tmp_pos.Ma, this.post_lng = tmp_pos.La;
    },
    movePostPosition() {
      this.movePosition(this.post_lat, this.post_lng);
    },
    onCurrntBtn() {
      this.setCurrentPosition();
      this.movePositionSmooth(this.cur_lat, this.cur_lng);
    },
    onCurrentMarkerBtn() {
      if (this.marker) {
        this.deleteCurrentMarker();
      } else {
        this.mode = 'default';
        this.makeCurrentMarker();
      }
    },
    onSideBarBtn() {
      if (this.barShadowLeft) this.barShadowLeft = 0;
      else this.barShadowLeft = '390px';
    },
    makeCurrentMarker() {
      const imageSrc = `./img/current-monkey-${this.mode}.png`,
            imageSize = new kakao.maps.Size(64,64),
            imageOption = {
              alt: "원숭이 아이콘  제작자: smalllikeart - Flaticon"
            };
      
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(this.cur_lat, this.cur_lng);
      
      this.marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
      });
      kakao.maps.event.addListener(this.marker, 'click', this.changeCurrentMarker);

      this.marker.setMap(this.map);
    },
    deleteCurrentMarker() {
      this.marker.setMap(null);
      this.marker = null;
    },
    changeCurrentMarker() {
      this.deleteCurrentMarker();
      this.mode = this.mode == 'default' ? 'wink' : 'default';
      this.makeCurrentMarker();
    },
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1, {animate: true});
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1, {animate: true});
    },
    relayout() {
      this.map.relayout();
    },
    getCenter() {
      return this.map.getCenter();
    },
    getLevel() {
      return this.map.getLevel();
    },
  },
};
</script>

<style scoped>
.shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 390px;
  z-index: 20;
  height: 100%;
}

.sidebar-btn {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 22px;
  height: 54px;
  font-size: 0;
  line-height: 0;
  background-image: url('~@/assets/mynav_btn.png');
  background-position-x: 0px;
  background-position-y: -66px;
  background-size: initial;
  background-repeat: no-repeat;
  text-indent: -9999px;
  cursor: pointer;
}

.bar {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  height: 100%;
  background: url(//t1.daumcdn.net/localimg/localimages/07/2018/pc/shadow/map_shadow.png) repeat-y;
}

.mapContainer{
  overflow: hidden;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

#map{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}

.MapControlView {
  position: absolute;
  top: 149px;
  right: 9px;
  z-index: 420;
  width: 38px;
}

.access-location {
  margin-top: 0px;
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  background: url(//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/img_search.png) no-repeat -153px -450px;
}

.current-marker {
  border-radius: 0.3rem;
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  background: url('~@/assets/current-monkey-default-btn.png') no-repeat;
}

@media (hover:hover) {
  .access-location:hover { background-position: -153px -400px; }
  #current-icon:hover {content: './img/current-monkey-wink.png';}
  .current-marker:hover {background: url('~@/assets/current-monkey-wink-btn.png') no-repeat;}
}

.zoom-btn {
  margin-top: 14px;
  width: 32px;
  border-radius: 3px;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 2px 0px;
}

.zoom-in-btn {
  float: left;
  cursor: pointer;
  width: 32px;
  height: 32px;
  user-select: none;
  -webkit-user-drag: none;
  border-top: none;
  border-right: none;
  border-bottom: 1px solid rgb(226, 226, 226);
  border-left: none;
  border-image: initial;
  background: url(https://t1.daumcdn.net/mapjsapi/images/2x/control.png) -40px 0px / 116px 264px no-repeat rgb(255, 255, 255);
  border-radius: 3px 3px 0px 0px;
}

.zoom-out-btn {
  float: left;
  cursor: pointer;
  width: 32px;
  height: 32px;
  user-select: none;
  -webkit-user-drag: none;
  border-top: 1px solid rgb(226, 226, 226);
  border-right: none;
  border-bottom: none;
  border-left: none;
  border-image: initial;
  background: url(https://t1.daumcdn.net/mapjsapi/images/2x/control.png) -40px -32px / 116px 264px no-repeat rgb(255, 255, 255);
  border-radius: 0px 0px 3px 3px;
  margin: -1px 0px 0px;
}
</style>
