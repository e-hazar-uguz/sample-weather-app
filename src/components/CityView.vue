<template>
  <div class="flex flex-col flex-1 items-center">
    <div
    v-if="route.query.preview"
    class="text-white p-4 bg-red-400 w-full text-center">
    <p class="infos">
      You are currently viewing this city, click the "+" icon to save this city.
    </p>
  </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-blue-100 py-12">
    <h1 class="text-4xl  mb-2">{{ route.params.city }}</h1>
    <p class="text-sm mb-12">
      {{
        new Date(weatherData.currentTime).toLocaleDateString(
          "en-us",
          {
            weekday: "short",
            day: "2-digit",
            month: "long",
          }
        )
      }}
      {{
        new Date(weatherData.currentTime).toLocaleTimeString(
          "en-us",
          {
            timeStyle: "short",
          }
        )
      }}
    </p>
    <p class="text-8xl mb-8">
      {{ Math.round(((weatherData.current.temp - 32) * 5) / 9) }}&deg;C 
    </p>
    <p>
      Feels like
      {{ Math.round(((weatherData.current.feels_like - 32) * 5) / 9) }} &deg;C
    </p>
    <p class="capitalize">
      {{ weatherData.current.weather[0].description }}
    </p>
    <img
      class="w-[150px] h-auto"
      :src="
        `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
      "
      alt=""
    />
    </div>

    <hr class="border-white border-opacity-25 border w-full" />

<!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-blue-100">
        <h2 class="mb-4 text-center  text-2xl text-gradient">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll" style="padding-bottom: 3rem;">

          <div
          v-for="hourData in weatherData.hourly"
          :key="hourData.dt"
          class="flex flex-col gap-4 items-center">

          <p class="whitespace-nowrap text-md">
            {{
              new Date(
                hourData.currentTime
              ).toLocaleTimeString("en-us", {
                hour: "numeric",
              })
            }}
          </p>
          <img
            class="w-auto h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
            "
            alt=""
          />
          <p class="text-xl">
            {{ Math.round(hourData.temp) }}&deg;C 
          </p>
          </div>

        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-25 border w-full" />
<!-- Weekly Weather -->
<div class="max-w-screen-md w-full py-12">
  <div class="mx-8 text-blue-100 ">
      <h2 class="mb-4  text-center text-2xl text-gradient">7 Day Forecast</h2>
      <div
        v-for="day in weatherData.daily"
        :key="day.dt"
        class="flex items-center hazar">

        <p class="flex-1">
          {{
            new Date(day.dt * 1000).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
              }
            )
          }}
        </p>
        <img
          class="w-[50px] h-[50px] object-cover"
          :src="
            `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
          "
          alt=""
        />
        <div class="flex gap-2 flex-1 justify-end ">
          <p>H : {{ Math.round(day.temp.max) }}&deg;C</p>
          <p>L : {{ Math.round(day.temp.min) }}&deg;C</p>
        </div>
      </div>
  </div>
</div>

<div v-if="!route.query.preview"
    class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-600"
    @click="removeCity">
    <i class="fa-solid fa-trash"></i>
    <p>Remove City</p>
</div>

  </div>
</template>

<script setup>

import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();

const getWeatherData = async () => {
  try {
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
  );
  // cal current date & time
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const utc = weatherData.data.current.dt * 1000 + localOffset;
  weatherData.data.currentTime =
    utc + 1000 * weatherData.data.timezone_offset;

  // cal hourly weather offset
  weatherData.data.hourly.forEach((hour) => {
    const utc = hour.dt * 1000 + localOffset;
    hour.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
  });

  weatherData.data.daily.forEach((day) => {
    day.temp.max = ((day.temp.max - 32) * 5) / 9;
    day.temp.min = ((day.temp.min - 32) * 5) / 9;
  });

  weatherData.data.hourly.forEach((hour) => {
    hour.temp = ((hour.temp - 32) * 5) / 9; // Fahrenheit to Celsius conversion formula
  });

  return weatherData.data;
} catch (err) {
  console.log(err);
}
};

const weatherData = await getWeatherData();

const removeCity = () => {
const cities = JSON.parse(localStorage.getItem("savedCities"));
const updatedCities = cities.filter(
  (city) => city.id !== route.query.id
);
localStorage.setItem(
  "savedCities",
  JSON.stringify(updatedCities)
);
router.push({
  name: "home",
});
};

</script>

<style>
.text-gradient {
  background: linear-gradient(to right, #f94109, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.overflow-x-scroll::-webkit-scrollbar {
  height: 1.3rem;
  width: 1rem;
}

.overflow-x-scroll::-webkit-scrollbar-track {
  background:#feb47b; 
}

.overflow-x-scroll::-webkit-scrollbar-thumb {
  background: #888;
}

@media only screen and (max-width: 640px) {

  .text-md {
      font-size: 0.8rem;
    }

    .text-xl {
    font-size: 1rem!important;
  }

  .flex.flex-col.gap-4.items-center img {
    width: 35px; 
    height: 35px;
  }

  .infos{
    font-size:small
  }

  .flex-col h1{
    font-size: x-large;
  }

  .flex-col .text-8xl {
    font-size: 3.5rem;
  }

  .flex-col  .h-auto{
    width: 100px; 
    height: 100px;
  }

  .max-w-screen-md h2{
    font-size: large;
  }

  .overflow-x-scroll::-webkit-scrollbar {
  height: .6rem;
}
.hazar p{
  font-size: small;
}

.hazar img{
  width: 35px; 
    height: 35px;
}

}

</style>
