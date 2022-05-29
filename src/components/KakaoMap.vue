<template>
  <div>
    <div class="MapControlView">
      <a href="#" class="access-location" @click="moveCurrentPosition"></a>
      <div class="zoom-btn">
        <span class="zoom-in-btn" @click="zoomIn"></span>  
        <span class="zoom-out-btn" @click="zoomOut"></span>
      </div>
    </div>
    <div class="mapContainer"><div id="map"></div></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      latitude: 37.56678,
      longitude: 126.97913
    }
  },
  mounted() {
    this.setCurrentPosition();
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_SERVICE_KEY}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.latitude, this.longitude),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    setCurrentPosition() {
      if (navigator.geolocation) {
      const $this = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        $this.latitude = position.coords.latitude;
        $this.longitude = position.coords.longitude;
      });
    }
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    moveCurrentPosition() {
      this.setCurrentPosition();
      this.map.panTo(new kakao.maps.LatLng(this.latitude, this.longitude));
      this.showCurrentPosition();
    },
    showCurrentPosition() {
      if (this.currentOverlay) this.currentOverlay.setMap(null);
      const $this = this;
      const current_content = '<div><img class="pulse" draggable="false" unselectable="on" src="https://ssl.pstatic.net/static/maps/m/pin_rd.png" alt=""></div>';
      this.currentOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng($this.latitude, $this.longitude),
        content: current_content,
        map: $this.map
      });
      this.currentOverlay.setMap(this.map);
    },
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1, {animate: true});
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1, {animate: true});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mapContainer{
  position:absolute;
  width: 100%;
  height: 100%;
}

#map{
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
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  padding: 1px 3px 5px;
  background: url(//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/img_search.png) no-repeat -153px -450px;
}

@media (hover:hover) {
  .access-location:hover { background-position: -153px -400px; }
}

.zoom-btn {
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

.pulse-container {
  width: 20px;
  height: 20px;
}

.pulse {
  object-fit: scale-down;
}

</style>
