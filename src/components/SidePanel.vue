<template>
<div class="slide-panel slide-panel--from-right js-slide-panel-home">
    <div class="slide-panel__header">
      <a @click="$emit('close')" class="slide-panel__close js-slide-panel-close">Close</a>
    </div>
    <div class="slide-panel__container">
      <div class="slide-panel__content">
        <div class="slide-panel__image">
          <img id="photograph" alt="lot" :src="record.photo">
        </div>
        <div class="slide-panel-header">
          <div class="row">
            <div class="col-md-9">
              <h4 class="address">
                {{ record.label }}
              </h4>
              <p>{{record.max_beds }} Bed | {{ record.max_baths }} Bath | {{ record.max_garage }} Garage | {{ record.stories }} Stories</p>
            </div>
            <div class="col-md-3">
              <h4 class="price">${{ record.min_price }}
              </h4>
              <p>
                <em>Starting From</em>
              </p>
            </div>
          </div>
        </div>

        <div class="slide-panel-inner">
<!--           <div class="row">
            <div class="col-md-6 padding-10">
              <div>
                Lot Size
              </div>
              <div> 
                {{record.size}}
              </div>
              <div>
                {{ record.width }} X {{ record.length }}
              </div>
            </div>
          </div> -->
          <div id="property-details" class="row">
            <div class="col-md-6 col-xs-12">
              <div class="details">
                <span class="label-small">Overview</span>
                <div class="data-text">
                  <p class="description">
                    {{ record.description }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="additional-details">
                <span class="label-small">Additional Details</span>
                <div class="data-text">
                  <ul>
                    <li v-if="record.plan">
                      <span>{{ record.plan.label }}</span> Plan:
                    </li>
                    <li v-if="record.elevation">
                      <span>{{ record.elevation.label }}</span> Elevation:
                    </li>
                    <li v-if="record.style">
                      <span>{{ record.style.label }}</span> Architectural Style:
                    </li>
                    <li v-if="record.size">
                      <span>{{ record.size }}</span> Lot Size:
                    </li>
                    <li>
                      <button type="button" class="btn btn-primary btn-lg btn-block">Request More Info</button>
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
          <div id="build-info" class="row" v-if="record.builder">
            <div class="col-md-4 col-xs-12">
              <div class="builder">
                <div class="data-logo">
                  <img id="builder-logo" alt="builder-logo" :src="record.builder.logo">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12" v-if="record.builder && record.builder.model_home">
              <div class="model-address">
                <span class="label-small">Model Address</span>
                <div class="data-text">
                  <p>{{ record.builder.model_home.street_address }}<br></span>{{ record.builder.model_home.city }}, {{ record.builder.model_home.state }}<span>{{ record.builder.model_home.zipcode }}</span></p>
                  <p>
                    <a :href="'https://www.google.com/maps/dir/' + record.builder.model_home.directions" class="" target="_blank">Get Driving Directions</a>
                  </p>
                  <p>
                    <a :href="record.builder.website" class="" target="_blank">Visit Website</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="model-hours">
                <span class="label-small">Model Hours</span>
                <div class="data-text">
                  <ul>
                    <li v-for="day, hours in this.fixDays(record.builder.schedule)">
                      <span>{{hours}}</span> {{day}} 
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'SidePanel',
  props: ['record'],
  data () {
    console.log(this.record)
    return {

    }
  },
  methods: {
    fixDays(schedule) {
      let week_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

      let equal_week_days = week_days.filter(day => {
        return schedule[day] == schedule['monday']
      })

      let new_schedule = {}

      new_schedule[
        equal_week_days[0].substring(0, 3) + " - " + equal_week_days[equal_week_days.length - 1].substring(0, 3)
      ] = schedule[equal_week_days[0]]

      Object.keys(schedule).forEach((day) => {
        if (equal_week_days.indexOf(day) == -1 && day != "id") {
          new_schedule[day] = schedule[day]
        }
      })

      return new_schedule

    },
  }
}
</script>

<style lang="scss" scoped>

#builder-logo {
  width: 100%;
}

.slide-panel::after {
  /* overlay layer */
  content: "";
  // position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: pointer;
  -webkit-transition: background 0.3s 0.3s;
  transition: background 0.3s 0.3s;
}

.slide-panel.slide-panel--is-visible {
  visibility: visible;
  -webkit-transition: visibility 0s 0s;
  transition: visibility 0s 0s;
}

.slide-panel.slide-panel--is-visible::after {
  background: rgba(0, 0, 0, 0.6);
  -webkit-transition: background 0.3s 0s;
  transition: background 0.3s 0s;
}

.slide-panel__header {
  position: fixed;
  width: 90%;
  height: 60px;
  line-height: 60px;
  z-index: 2;
  -webkit-transition: -webkit-transform 0.3s 0s;
  transition: -webkit-transform 0.3s 0s;
  transition: transform 0.3s 0s;
  transition: transform 0.3s 0s, -webkit-transform 0.3s 0s;
  -webkit-transform: translateY(-50px);
  -ms-transform: translateY(-50px);
  transform: translateY(-50px);
}

.slide-panel--from-right .slide-panel__header {
  right: 0;
  height: 40px;
  position: relative;
  top: 35px;
}

.slide-panel--is-visible .slide-panel__header {
  -webkit-transition: -webkit-transform 0.3s 0.3s;
  transition: -webkit-transform 0.3s 0.3s;
  transition: transform 0.3s 0.3s;
  transition: transform 0.3s 0.3s, -webkit-transform 0.3s 0.3s;
  -webkit-transform: translateY(0px);
  -ms-transform: translateY(0px);
  transform: translateY(0px);
}

@media only screen and (min-width: 768px) {
  .slide-panel__header {
    width: 70%;
  }
}

@media only screen and (min-width: 1170px) {
  .slide-panel__header {
    width: 50%;
  }
}

.slide-panel__close {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 60px;
  /* image replacement */
  display: inline-block;
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
}

.slide-panel__close::before,
.slide-panel__close::after {
  /* close icon created in CSS */
  content: "";
  position: absolute;
  top: 28px;
  left: 20px;
  height: 1px;
  width: 20px;
  background-color: #424f5c;
  /* this fixes a bug where pseudo elements are slighty off position */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.slide-panel__close::before {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.slide-panel__close::after {
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.slide-panel__close:hover {
  background-color: black;
}

.slide-panel__close:hover::before,
.slide-panel__close:hover::after {
  background-color: #ffffff;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

.slide-panel--is-visible .slide-panel__close::before {
  -webkit-animation: slide-panel-close-1 0.6s 0.3s;
  animation: slide-panel-close-1 0.6s 0.3s;
}

.slide-panel--is-visible .slide-panel__close::after {
  -webkit-animation: slide-panel-close-2 0.6s 0.3s;
  animation: slide-panel-close-2 0.6s 0.3s;
}

@-webkit-keyframes slide-panel-close-1 {
  0%,
  50% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

@keyframes slide-panel-close-1 {
  0%,
  50% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

@-webkit-keyframes slide-panel-close-2 {
  0%,
  50% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

@keyframes slide-panel-close-2 {
  0%,
  50% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

.slide-panel__container {
  width: 100%;
  height: 100%;
  top: 0;
  background: #ffffff;
  z-index: 1;
  -webkit-transition: -webkit-transform 0.3s 0.3s;
  transition: -webkit-transform 0.3s 0.3s;
  transition: transform 0.3s 0.3s;
  transition: transform 0.3s 0.3s, -webkit-transform 0.3s 0.3s;
}


.slide-panel__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0%;
  overflow: auto;
  /* smooth scrolling on touch devices */
  -webkit-overflow-scrolling: touch;
}

.slide-panel__content p {
  font-size: 1.4rem;
  color: #445870;
  line-height: 1.4;
}

.slide-panel__content p:first-of-type {
  margin-top: 0;
}

.slide-panel__content .slide-panel-header {
  padding: 30px;
  background-color: #182234;
  color: white;
}

.slide-panel__content .slide-panel-header h4 {
  font-size: 1.8em;
  line-height: 1;
  margin: 0 0 10px 0;
  font-weight: 400;
  text-transform: inherit;
  text-align: inherit;
  color: #ffffff;
}

.slide-panel__content .slide-panel-header p {
  color: #76838f;
  padding: 0;
  margin: 0;
}

.slide-panel__content .slide-panel-header .col-md-3 {
  text-align: right;
}

.slide-panel__content .slide-panel-inner {
  padding: 0 30px;
  margin: 30px 0;
}

.slide-panel__content .slide-panel-inner .row .col-md-6 {
  padding: 30px;
}

.slide-panel__content .slide-panel-inner .row .col-md-4 {
  padding: 30px;
}

.slide-panel__content .slide-panel-inner .row .data-text {
  margin-top: 10px;
}

.slide-panel__content .slide-panel-inner .row .data-text p {
  margin-bottom: 10px;
}

.slide-panel__content .slide-panel-inner .row div#build-info {
  margin-top: 30px;
}

.slide-panel__content .slide-panel-inner .row .data-logo {
  margin-top: 20px;
  vertical-align: middle;
}

.slide-panel__content .slide-panel-inner .row span.label-small {
  text-transform: uppercase;
  font-weight: 700;
}

.slide-panel__content .slide-panel-inner .row ul {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 0;
  list-style: none;
}

.slide-panel__content .slide-panel-inner .row ul li {
  position: relative;
  display: block;
  padding: 5px 0;
  margin-bottom: -1px;
}

.slide-panel__content .slide-panel-inner .row ul li span {
  float: right;
  display: inline-block;
  white-space: nowrap;
  text-align: right;
}

.slide-panel__content .slide-panel-inner .row ul li button {
  border-radius: 0px;
  margin-top: 20px;
  color: #ffffff;
  background-color: #beb19f;
  text-transform: uppercase;
  border-color: #beb19f;
  padding: 20px 16px;
  font-size: 1.5rem;
  line-height: 1.33333;
}

.slide-panel__content .slide-panel-inner .row ul li button:hover {
  color: #fff;
  background-color: #181f35;
  border-color: #181f35;
}
.padding-10 {
  padding: 10px !important;
}
@media only screen and (min-width: 768px) {
  .slide-panel__content p {
    font-size: 1.6rem;
    line-height: 1.6;
  }
}

</style>