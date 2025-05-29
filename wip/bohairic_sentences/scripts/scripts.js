const spreadsheetId = '1joD_lLF1kbvQozNPpMXXwPQ_iYL0JmMyv2nJy2uicz0';
const apiKey = 'AIzaSyABf_IFY_ZyNQk_9xQL19v_vEgZfBa0Dt4';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;
let isSameNumber = "";
let newNum = "";
async function fetchGoogleSheetData() {
	try {
		// Fetch data from Google Sheets API
		const response = await fetch(url);
		const data = await response.json();
		
		// Extract rows from the data
		const rows = data.values;
		console.log(rows);
		
		// Get the table body element
		const tableBody = document.querySelector('#data-table tbody');
		
		function htmlEncode(text) {
			return text.replace(/<i>/g, '&lt;b&gt;')
			.replace(/<\/i>/g, '&lt;/b&gt;');
		}
		
		function getRandomInt(min, max) {
			let minCeiled = Math.ceil(min);
			let maxFloored = Math.floor(max);
			// The maximum is exclusive and the minimum is inclusive
			newNum = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
			if (newNum == isSameNumber) {
				getRandomInt(min, max);
			}
			isSameNumber = newNum;
			return newNum;
		}
		let randomNumber = getRandomInt(1, rows.length);
		//console.log("~~~" + randomNumber + "~~~");
		let selectedRow = rows[randomNumber];
		
		
		let coptic = selectedRow[1];
		let cellElement0 = document.querySelector("#data-table tr:nth-child(1) td");
		cellElement0.textContent = coptic;
		
		let verse = selectedRow[0];
		let cellElement1 = document.querySelector("#data-table tr:nth-child(2) td");
		cellElement1.textContent = verse;
		
		let tags = selectedRow[3];
		let cellElement2 = document.querySelector("#data-table tr:nth-child(3) td");
		cellElement2.textContent = tags;
		
		let english = selectedRow[2];
		//english = htmlEncode(english);
		let cellElement3 = document.querySelector("#data-table tr:nth-child(4) td");
		cellElement3.textContent = english;
/*
		rows[randomNumber].forEach(cell => {
			const cellElement = document.createElement('td');
			cellElement.textContent = cell;
			row.appendChild(cellElement);
			collectValues += cell + "\n";
		});
*/
		
		// Append the row to the table
		//tableBody.appendChild(row);
		
		
		
		
		
		
		// Loop through the rows (starting from row 1 to skip headers)
		//for (let i = 0; i < rows.length; i++) {
		//	const row = document.createElement('tr');

		//	// Loop through each cell in the row and create a table cell for each
		//	rows[i].forEach(cell => {
		//		const cellElement = document.createElement('td');
		//		cellElement.textContent = cell;
		//		row.appendChild(cellElement);
		//		collectValues += cell + "\n";
		//	});
			
			// Append the row to the table
		//	tableBody.appendChild(row);
		//}
	}
	catch (error) {
		console.error('Error fetching Google Sheets data:', error);
	}
}

// Call the function to fetch and display data
document.addEventListener('DOMContentLoaded', fetchGoogleSheetData);
document.querySelector("#reload-sentence").addEventListener("click", fetchGoogleSheetData);