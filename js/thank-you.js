const table = document.querySelector('table');
const tbody = table.querySelector('tbody');

function renderValue(value, key) {
  const tr = document.createElement('tr');
  const tdKey = document.createElement('td');
  const tdValue = document.createElement('td');
  tdKey.textContent = key;
  tdValue.textContent = value;
  tr.append(tdKey, tdValue);
  tbody.append(tr);
}

function thankUser() {
  const searchParams = new URLSearchParams(location.search);
  searchParams.forEach(renderValue);
  document.querySelector('.name').textContent = searchParams.get('name');
}

thankUser()