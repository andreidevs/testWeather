<template>
  <div  class="m-10 main-container">
    <div class="flex justify-between items-center">
      <span class="font-medium ml-4" style="color:#1890ff; ">
        {{  showSettings ? 'Settings' :  'Weather Widget V1' }}</span>
      <a-button @click="showSettings = !showSettings" class="mr-1" type="link">
        <template v-if="!showSettings" #icon><setting-outlined /></template>
        <template v-else #icon><close-outlined/></template>
      </a-button>
    </div>

    <div v-if="loading" class="flex justify-center mt-2"><a-spin/></div>
    <div v-if="!showSettings">
      <WeatherItem  @delete="removeItem" v-for="item  in weatherList" :key="item.id" :item="item"/>
    </div>
    <div  v-if="showSettings">
      <div class="mx-2 my-2 flex">
        <a-input
            v-model:value="cityName"
        class="weather-input"
        placeholder="Enter the name of the city"
            allowClear
            @keydown.enter="addCity"
        ></a-input>
        <a-button @click="addCity"  class="ml-1" type="primary" style="border-radius: 10px; width: 40px">
          <template #icon><plus-outlined /></template>
        </a-button>
      </div>

      <draggable
          v-model="weatherList"
          @end="endDrag"
          item-key="id">
        <template  #item="{element, index}">
          <div :id="element.id" class="cursor-pointer city-element mx-2 my-2">
            <menu-outlined style="color: #1890ff;" />
            <span class="main-color">  {{element.name}}</span>
            <a-button @click="removeItem(element.id)" type="text">
              <template #icon><delete-outlined style="color: #ff4d4f" /></template>
            </a-button>
          </div>
        </template>
      </draggable>
  </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, UnwrapRef} from "vue";
import WeatherItem from "./components/WeatherItem.vue"
import {SettingOutlined, CloseOutlined, MenuOutlined, DeleteOutlined, PlusOutlined}
  from "@ant-design/icons-vue"
import axiosDefault from "./config/axios"
import {Weather} from "./types/weather";
const axios = axiosDefault
import draggable from 'vuedraggable'
import {message} from "ant-design-vue";

const weatherList: Ref<UnwrapRef<any[]>> = ref([])
const lat: Ref<number> = ref(0)
const lon: Ref<number> = ref(0)

const loading: Ref<boolean> = ref(false)
const showSettings: Ref<boolean> = ref(false)
const cityName: Ref<string> = ref("")

onMounted(async ()=>{
  getFromStorage()
})


const endDrag = (event: any) =>{
  const element: Weather = weatherList.value.find(el=> parseInt(el.id) === parseInt(event.item.id))
  weatherList.value.splice(event.oldIndex, 1);
  weatherList.value.splice(event.newIndex, 0, element);
  setToStorage()
}

const removeItem = (id: number)=>{
  weatherList.value = weatherList.value.filter(el=> el.id !== id)
  setToStorage()
}

const setToStorage =()=>{
  localStorage.setItem('weatherList', JSON.stringify(weatherList.value))
}

const getFromStorage = () =>{
  const data = localStorage.getItem('weatherList')
  if(data && JSON.parse(data).length ){
    weatherList.value = JSON.parse(data)
  } else getLocation()
}

const getLocation = async (current: boolean = true) =>{
  try {
    loading.value = true
    if(current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async ({coords}) => {
          try {
            lat.value = coords.latitude
            lon.value = coords.longitude
            const {data} = await axios('data/2.5/weather/',
                {params: {units: 'metric', lat: lat.value, lon: lon.value}})
            weatherList.value.push(getStructurData(data))
            setToStorage()
          }catch (e){ }

        })
      }
    }else {
      const {data} = await axios('data/2.5/weather/',
          {params: {units: 'metric', lat: lat.value, lon: lon.value}})
      const findIdx = weatherList.value.findIndex(el=> el.id === data.id)
      if(findIdx === -1) {
        weatherList.value.push(getStructurData(data))
        setToStorage()
      } else {
        message.info("City added earlier!")
      }
    }
  }
  catch (e){}
  finally {
    loading.value = false
  }
}

const getStructurData = (data: any) =>{
  let result: Weather = {
    id: data.id,
    name: `${data.name}, ${data.sys.country}`,
    temp: Math.floor(data.main.temp),
    wind: parseFloat(data.wind.speed.toFixed(1)),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    feelLike: Math.floor(data.main.feels_like),
    visibility: data.visibility / 1000

  }
  return result
}

const addCity = async () =>{
  try {
    if (cityName.value.length) {
      const {data} = await axios('geo/1.0/direct?/',
          {params: {q: cityName.value}})
      if (data.length) {
        lat.value = data[0].lat
        lon.value = data[0].lon
        await getLocation(false)
      } else {
        message.warn("City Name not found!")
      }
      cityName.value = ""
    }
  } catch (e){
    message.warn("City Name not found!")
  }
}

</script>

<style scoped>
.main-container{
  width: 300px;
  border: 3px solid #1890ff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.city-element{
  border: 2px solid #1890ff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;

}
.weather-input{
  border: 2px solid #1890ff;
  border-radius: 10px;
}
.main-color{
  color: #1890ff;
}
</style>
