<template>
<main class="d-flex flex-nowrap">
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 390px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <img src="https://cdn-icons-png.flaticon.com/512/889/889766.png" alt="Banana icons created by Pixel perfect - Flaticon" style="width: 43px; height: 32px; padding-right: 16px"/>
      <span class="fs-4">mon<strong>key</strong> 공방</span>
    </a>
    <hr>
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-warning" type="submit" @submit="onSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <a href="#" :class="{'nav-link':true, 'link-dark': themas[0]!='active', 'active':themas[0]=='active'}" @mouseover="changeThema0" @mouseout="changeThema0">
          <i class="fa-solid fa-map" style="padding-right: 8px"></i>
          Orders
        </a>
      </li>
      <li>
        <a href="#" :class="{'nav-link':true, 'link-dark': themas[1]!='active', 'active':themas[1]=='active'}" @mouseover="changeThema1" @mouseout="changeThema1">
          <i class="fa-solid fa-earth-asia" style="padding-right: 8px"></i>
          Products
        </a>
      </li>
      <li>
        <a href="#" :class="{'nav-link':true, 'link-dark': themas[2]!='active', 'active':themas[2]=='active'}" @mouseover="changeThema2" @mouseout="changeThema2">
          <i class="fa-solid fa-apple-whole" style="padding-right: 8px"></i>
          Customers
        </a>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://mblogthumb-phinf.pstatic.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>test</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</main>
</template>

<script>
export default {
  data() {
    return {
      themas: ['', '', '']
    }
  },
  methods: {
    changeThema0() {
      if (this.themas[0] == 'active') {
        this.themas[0] = '';
        return;
      }
      this.themas[0] = 'active';
    },
    changeThema1() {
      if (this.themas[1] == 'active') {
        this.themas[1] = '';
        return;
      }
      this.themas[1] = 'active';
    },
    changeThema2() {
      if (this.themas[2] == 'active') {
        this.themas[2] = '';
        return;
      }
      this.themas[2] = 'active';
    },
    onSearch() {
      // if (!window.kakao.maps.services) {
      //   const script = document.createElement("script");
      //   script.src =
      //     `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_MAP_SERVICE_KEY}&libraries=services`;
      //   document.head.appendChild(script);
      // }
      // const places = new kakao.maps.services.Places();
      // // eslint-disable-next-line
      // const callback = function(status, result, pagination) {
      //   if (status === kakao.maps.services.Status.OK) {
      //     alert("검색된 음식점의 갯수는 " +  result.places.length + "개 입니다.");
      //   }
      // };

      // places.categorySearch('FD6', callback, {
      //   location: new kakao.maps.LatLng(33.450701, 126.570667)
      // });
    }
  }
}
</script>

<style>
main {
  height: 100vh;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.nav-pills {
  --bs-nav-pills-link-active-bg: #ffc107;
}
</style>