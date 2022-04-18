<template>
  <div id="app">
    <div v-show="isLoading" class="loading">
      <div class="loading-icon"></div>
    </div>

    <div class="card-container">
      <card v-for="(card, index) in cards.data" :key="index" v-bind:current="index === cards.index" v-bind:fullName="card.name" v-bind:picture="card.picture" v-bind:rating="card.rating" v-bind:approved="card.approved" v-on:draggedThreshold="setApproval"> </card>
    </div>
  </div>
</template>
var app = new Vue({
	el: '#app',
	template: `
		<div id="app">

			<div v-show="isLoading" class="loading">
				<div class="loading-icon"></div>
			</div>

			<div class="card-container">
				<card v-for="(card, index) in cards.data" :key="index"
					v-bind:current="index === cards.index"
					v-bind:fullName="card.name"
					v-bind:picture="card.picture"
					v-bind:rating="card.rating"
					v-bind:approved="card.approved"
					v-on:draggedThreshold="setApproval">
				</card>
			</div>

		</div>
	`,
	data: {
		isLoading: true, // Toggles the loading overlay
		cards: {
			data: null, // Array for card data
			index: 0, // Current index in the cards.data array
			max: 10 // Max cards to show in each stack
		}
	},
	methods: {
		getData: function() {
			
			this.isLoading = true;
			this.cards.data = null;
			const self = this;

			// Get a random list of people
			const request = new XMLHttpRequest();
			request.open('GET', 'https://randomuser.me/api/?results=' + this.cards.max, true);

			request.onload = function() {
				
				const response = JSON.parse(request.responseText).results;

				const data = response.map(function(object) {
					
					/*
						Construct a new array with objects containing only
						the relevent data from the original response data
					*/

					return {
						name: object.name.first + ' ' + object.name.last,
						picture: object.picture.large,
						rating: Math.floor(Math.random() * 5 + 1),
						approved: null
					};
					
				});
				
				// Fake delay for purposes of demonstration
				setTimeout(function() {
					self.cards.data = data;
					self.cards.index = 0;
					self.isLoading = false;	
				}, 500);
				
			};

			request.send();
			
		},
		setApproval: function(approval) {
			
			/*
				Change approval value for current card, and request new data
				if at the end of the card array
			*/

			this.cards.data[this.cards.index].approved = approval;
			this.cards.index++;
			
			if (this.cards.index >= this.cards.data.length) {
				this.getData();
			}
			
		}
		
	},
	mounted: function() {
		
		this.getData();
		
	}
});