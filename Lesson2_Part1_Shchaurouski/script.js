'use strict';
(function () {
	var createTab = function (data, tab, tabs) {
		for (i = 0; i < data.length; i++) {
			tab = document.createElement('div');
			tab.setAttribute('class', 'tab');
			tab.innerText = data[i]['orderName'];
			tabs.appendChild(tab);
		}
	},
	drawTable = function(index, table) {
		var i = 0,
		j = 0,
		dataFields = ['id', 'name', 'count', 'price'],
		tr = [data[index]['orderBody'].length],
		td = [dataFields.length];

		for (i = 0; i < data[index]['orderBody'].length; i++) {
			tr[i] = document.createElement('tr');
			tr[i].setAttribute('class', 'table-row');
			for (j = 0; j < dataFields.length; j++) {
				td[j] = document.createElement('td');
				td[j].setAttribute('class', dataFields[j]);
				td[j].innerText = data[index]['orderBody'][i][dataFields[j]];
				tr[i].appendChild(td[j]);
			}
			table.appendChild(tr[i]);
		}
	}, 
	cleanTable = function (table) {
		debugger;
		while (table.rows.length > 1) {
			table.deleteRow(1);
		}
	},
	data = [
	{
		'orderName': 'Order 1',
		'orderBody': [{
			'id': 11,
			'name': 'Book1',
			'count': 5,
			'price': 10
		}, {
			'id': 21,
			'name': 'Pen1',
			'count': 2,
			'price': 1
		}, {
			'id': 31,
			'name': 'Phone1',
			'count': 1,
			'price': 350
		}, {
			'id': 41,
			'name': 'Glass1',
			'count': 10,
			'price': 50
		}
		]
	}, {
		'orderName': 'Order 2',
		'orderBody': [{
			'id': 12,
			'name': 'Book2',
			'count': 6,
			'price': 11
		}, {
			'id': 22,
			'name': 'Pen2',
			'count': 3,
			'price': 2
		}, {
			'id': 32,
			'name': 'Phone2',
			'count': 2,
			'price': 351
		}, {
			'id': 42,
			'name': 'Glass2',
			'count': 11,
			'price': 51
		}
		]
	}, {
		'orderName': 'Order 3',
		'orderBody': [{
			'id': 13,
			'name': 'Book3',
			'count': 7,
			'price': 12
		}, {
			'id': 23,
			'name': 'Pen3',
			'count': 4,
			'price': 3
		}, {
			'id': 33,
			'name': 'Phone3',
			'count': 3,
			'price': 352
		}, {
			'id': 43,
			'name': 'Glass3',
			'count': 12,
			'price': 52
		}
		]
	}, {
		'orderName': 'Order 4',
		'orderBody': [{
			'id': 14,
			'name': 'Book4',
			'count': 8,
			'price': 13
		}, {
			'id': 24,
			'name': 'Pen4',
			'count': 5,
			'price': 4
		}, {
			'id': 34,
			'name': 'Phone4',
			'count': 4,
			'price': 353
		}, {
			'id': 44,
			'name': 'Glass4',
			'count': 13,
			'price': 53
		}
		]
	}
	],
	tabs = document.querySelector('.tabs'),
	tab,
	i;

	createTab(data, tab, tabs);

	tabs.addEventListener('click', function(event) {
		var tabElements = tabs.childNodes, 
		i;
		if(event.target.className === 'tabs') {
			return;
		}
		for (i = 1; i < tabElements.length; i++) {
			tabElements[i].setAttribute('class', 'tab');
		}
		event.target.setAttribute('class', 'tab active');

		cleanTable(document.querySelector('table'));
		for (i = 0; i < data.length; i++) {
			if (data[i]['orderName'] === event.target.innerText) {
				drawTable(i, document.querySelector('tbody'));
			}
		}
	});
})()