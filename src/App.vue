<template>
  <div id="app">
    <router-view :records="records"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$http.get('https://staging.rpgbuilders.com/map/walsh/script').then(response => {
      this.records = response.body.records
    })
  },
  data () {
    return {
      records: []
    }
  }
}
</script>

<style lang='scss'>
@import "../static/styles/styles";
.mapboxgl-popup-tip, .mapboxgl-popup-content {
  background: transparent;
  box-shadow: none;
}
.mapboxgl-popup-close-button, .mapboxgl-popup-tip {
  display: none;
}
.mapboxgl-popup-content {
  width: 360px;
}
body #app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  .row {
    padding-left: 0px;
    padding-right: 0px;
  }
  .navbar-default {
    border-top: 0px;
  }
  .vue-input-tag-wrapper {
    width: 85%;
    display: inline-block;
    height: 33px;
    padding-top: 2px;
    border: none;
    .input-tag {
      float: left;
      margin-right: .5em;
      margin-bottom: .5em;
      color: #90a4ae;
      background-color: #FFF;
      border: 1px solid #cfd8dc;
      span {
        display: inline;
        padding: .5em 1em;
        font-size: 0.9em;
        font-weight: 400;
        line-height: 1;
        color: #b0bec5;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0em;
      }
       .remove {
        cursor: pointer;
        font-weight: 400;
        color: #b0bec5;
        margin-right: 6px;
      }
    }
  }
  .pagination {
    margin: 12px;
    margin-left: 110px;
    li {

      &.active, &::hover {
        a {
          border-bottom: 1px solid #1e1c32;
        }
      }
      a {
        min-width: 48px;
        font-size: 12px !important;
        border-bottom: 1px solid rgb(221, 221, 221);
        padding-top: 12px !important;
        &::after {
          background-color: initial !important;
        }
      }
    }
  }
  .table-view {
    .homes-sites-toggles {
      padding-left: 150px;
      padding: 0 167px;
      li{
        height: 60px;
        a {
          font-size: 15px;
          padding-top: 25px;
        }
      }

    }
    .container {
      .table-component__message {
        font-family: din-2014;
        padding: 20px;
        font-weight: bold;
      }
      .table-component__table-wrapper {
        .table-component__table {
          width: 100%;
          .table-component__table__head {
            tr {
              font-family: din-2014;
              font-weight: bold;
              font-size: 12px;
              height: 30px;
              color: #99a7b7;
              background-color: #f5f8fa;
              letter-spacing: 0px;
              border-bottom: 1px solid #BDC4CB;
              border-top: none;
              // text-transform: uppercase;
              th {
                padding: 0px 15px;
                padding-top: 8px;
              }
            }
          }
          .table-component__table__body {
            tr {
              font-family: din-2014;
              border-bottom: 1px solid #f2f4f6;
              td {
                padding: 0 15px;
                .row {
                  .col-md-4 {
                    img {
                      height: 80px;
                      padding: 10px;
                    }
                  }
                  .col-md-8 {
                    font-family: 'Helvetica';
                    padding: 26px 20px 20px 0px;
                  }
                }
                .address {
                  font-weight: bold;
                  font-size: 11px;
                }
                .builder {
                  font-size: 10px;
                  font-weight: 200;
                }
                .beds, .baths, .garage, .pretty-price, .style {
                  font-weight: bold;
                  display: inline-block;
                  height: 30px;
                  width: 100%;
                  padding-top: 10px;
                  font-size: 11px;
                }
                .price-label {
                  font-size: 10px;
                  font-weight: 300;
                }
                .pretty-price {
                  padding-top: 15px;
                }
                .status {
                  font-size: 10px;
                  background-color: #b0bfb0;
                  color: white;
                  width: 70px;
                  display: inline-block;
                  text-align: center;
                  padding-top: 8px;
                  text-transform: uppercase;
                  font-weight: bold;
                  border: 1px solid #d6ded6;
                }
              }
            }
          }
        }
      }
    }
  }
}
#listingstabs > div:nth-child(2) > div > div.table-component__table-wrapper > table > tbody > tr > td:nth-child(5) {
  padding-left: 25px !important;
}

</style>
