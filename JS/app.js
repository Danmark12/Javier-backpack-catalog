// script.js
document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
  fetch('Json/data.json')
    .then(response => response.json())
    .then(data => displayData(data))
    .catch(error => console.error('Error fetching data:', error));
}

function displayData(data) {
  const dataList = document.getElementById('dataList');

  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${item.name}, Description: ${item.description}, Price: $${item.price}, Date Added: ${item.date_added}`;
    dataList.appendChild(listItem);
  });
}
