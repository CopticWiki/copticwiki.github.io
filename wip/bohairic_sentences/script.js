// Replace with your actual Spreadsheet ID
//const spreadsheetId = '2PACX-1vShz06pVOzmNvBcBl0Dq71i1bqdJB52-ETEQVDUOouDsaIDN36y3diJOWP--nCbqe-p1pU0g0PDzH-m';
const spreadsheetId = '1joD_lLF1kbvQozNPpMXXwPQ_iYL0JmMyv2nJy2uicz0';

// Replace with your API Key
const apiKey = 'AIzaSyABf_IFY_ZyNQk_9xQL19v_vEgZfBa0Dt4';

// Construct the URL for Google Sheets API v4
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;
async function fetchGoogleSheetData() {
	try {
		
		// Fetch data from Google Sheets API
		const response = await fetch(url);
		const data = await response.json();
		
		// Extract rows from the data
		const rows = data.values;

		// Get the table body element
		const tableBody = document.querySelector('#data-table tbody');
		
		// Loop through the rows (starting from row 1 to skip headers)
		for (let i = 0; i < rows.length; i++) {
			const row = document.createElement('tr');

			// Loop through each cell in the row and create a table cell for each
			rows[i].forEach(cell => {
				const cellElement = document.createElement('td');
				cellElement.textContent = cell;
				row.appendChild(cellElement);
			});
			
			// Append the row to the table
			tableBody.appendChild(row);
		}
	}
	catch (error) {
		console.error('Error fetching Google Sheets data:', error);
	}
}

// Call the function to fetch and display data
document.addEventListener('DOMContentLoaded', fetchGoogleSheetData);