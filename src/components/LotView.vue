<template>
	<div class="container">
		<div class="home-header">
			<img v-bind:src="record.photo">
			<div class="row">
				<div class="col-md-3">
					<div class="address">
						{{record.label}}
					</div>
					<div class="lot-info">
						<span class="bed-room">{{record.beds}} Bed Room</span> |
						<span class="bath">{{record.bath}} Bath</span> |
						<span class="sqft">{{record.sqft ? record.sqft.toLocaleString() : record.sqft }} sq. ft.</span>
					</div>
				</div>
				<div class="col-md-3"></div>
				<div class="col-md-3">
					<span class="price">{{prettyPrice(record.price)}}</span>
					<span class="price-label">Starting From</span>
				</div>
				<div class="col-md-3">
					<button class="btn btn-default">
						<i class="fa fa-cube"></i>
					</button>
					<button class="btn btn-default">
						<i class="fa fa-flag"></i>
					</button>
					<button class="btn btn-default">
						<i class="fa fa-image"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="home-description">
			<div class="row">
				<div class="col-md-6">
					<h2>Architecturally Stunning</h2>
					<h2>{{ record.style }}</h2>
					<div class="description">
						{{ record.description }}
					</div>
				</div>
				<div class="col-md-6">
					<div class="builder-info">
						<span class="builder-label">
							{{ record.builder.label }}
						</span>
						<span class="model-address-label">
							MODEL ADDRESS
						</span>
						<span class="model-address">
							{{ record.model_address }}
						</span>
						<div class="builder-contact-actions">
							<button class="btn btn-default">
								DIRECTIONS TO OUR MODEL
							</button>
							<button class="btn btn-default">
								INQUIRE ABOUT THIS HOME
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="home-related">
			<div class="row">
				<div class="related-header">
					<span class="related-header-title">
						Related Homes
					</span>
					<span class="spearator">--</span>
					<span>
						OTHER HOMES YOU MAY BE INTERESTED IN
					</span>
				</div>
			</div>			
			<div class="row">
				<div class="col-md-4" v-for="home in record.related_homes">
			    <div class="homes-list-item" v-on:mouseover="mouseOverHandler" v-on:mouseleave="mouseLeaveHandler" @click="clickHandler()">
		        <div class="home-list-container animation-scale-up">
	            <div class="home">
                <img v-bind:src="home.photo" alt="">
                <div class="home-info">
                  <div class="col-xs-8 text-left">
                    <div class="address">{{ home.label }}</div>
                    <div class="beds-bath">{{ home.beds }} Bed / {{home.baths }} Bath</div>
                    <div class="builder" v-if="home.builder">{{ home.builder.label }}</div>
                  </div>
                  <div class="col-xs-4 text-right">
                    <div class="price">{{ home.prettyPrice }}</div>
                    <div class="price-label">Starting From</div>
                  </div>
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

  name: 'LotView',
  props: ['records'],
  data () {
    return {
    	record: {
    		builder: {},
    		related_homes: []
    	}
    }
  },
  created() {
  	var url = "https://staging.rpgbuilders.com/api/projects/1/lots/" + this.$route.params.lot_id + "/marketing_site"
  	this.$http.get(url).then(response => {
  		this.record = response.body.lot
  	})
  },
  methods: {
    prettyPrice(price) {
    	if (price) {
	      return "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    	}

    	return price
    
    },
  }
}
</script>

<style lang="scss" scoped>
</style>