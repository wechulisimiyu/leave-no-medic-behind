const { Chart } = await import('chart.js');


const myChart = new Chart(ctx, {
	type: 'pie',
	data: {
		datasets: [{
			data: [
				80,
				50,
				40,
				30,
				100,
			],
			backgroundColor: [
				'#191d21',
				'#63ed7a',
				'#ffa426',
				'#fc544b',
				'#6777ef',
			],
			label: 'Dataset 1'
		}],
		labels: [
			'Black',
			'Green',
			'Yellow',
			'Red',
			'Blue'
		],
	},
	options: {
		responsive: true,
		legend: {
			position: 'bottom',
		},
	}
});