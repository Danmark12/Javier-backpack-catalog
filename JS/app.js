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
    listItem.innerHTML = `
      <ul>
        <li><strong>Name:</strong> ${item.name}</li>
        <li><strong>Description:</strong> ${item.description}</li>
        <li><strong>Price:</strong> $${item.price}</li>
        <li><strong>Date Added:</strong> ${item.date_added}</li>
      </ul>
    `;
    dataList.appendChild(listItem);
  });
}
