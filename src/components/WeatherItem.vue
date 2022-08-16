<template>
<div class="weather-item m-2">
  <a-button @click="$emit('delete', item.id)" class="close-btn" size="small" type="text" >
    <template #icon><close-outlined style="color: #ff4d4f;" /></template>
  </a-button>
  <div class="flex justify-between items-center">
    <div>
      <div class="main-color text-base font-bold">{{item.name}}</div>
      <div class="main-color">Feels like {{item.feelLike}} С°</div>
    </div>
    <span class="font-bold text-3xl mt-2 mr-2 main-color">{{item.temp}} С°</span>
  </div>
  <div class="flex justify-between items-center">
    <span class="main-color">Wind: {{item.wind}}m/s</span>
    <span class="main-color">Pressure: {{item.pressure}}hPa </span>
  </div>
  <div class="flex justify-between items-center">
    <span class="main-color">Humidity: {{item.humidity}}%</span>
    <span class="main-color">Visibility: {{item.visibility}} Km </span>
  </div>
</div>

</template>
<script setup lang="ts">
import {Weather} from "../types/weather";
import {CloseOutlined} from "@ant-design/icons-vue";

defineProps<{
  item: Weather
}>()

defineEmits<{
  (e: 'delete', id: number): void
}>()

</script>

<style scoped lang="scss">
.weather-item{
  border: 3px solid #ff4d4f;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  .main-color{
    color: #ff4d4f;
  }
.close-btn{
  position: absolute;
  top: 3px;
  right: 2px;
}

}
</style>