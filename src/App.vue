<template>
  <div id="app">
    <KakaoMap :start_lat="36.2606" :start_lng="127.4027" />
  </div>
</template>

<script>
import KakaoMap from "./components/KakaoMap";

export default {
  name: "App",
  components: {
    KakaoMap,
  },
};
</script>