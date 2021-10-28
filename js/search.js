const state = {
  loading: true,
  items: [],
  results: []
}

function setLoading(value = true) {
  state.loading = value;
  document.body.classList.toggle('loading', value);
}

async function onSearch() {
  console.group('Search Routine');
  console.log(`Raw querystring: ${location.search}`);

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('term');

  console.log(`Querystring term: ${searchTerm}`);

  setTitle(searchTerm);

  state.items = await getItems(searchTerm);

  state.results = state.items.filter(item => item.title.includes(searchTerm));

  console.groupCollapsed('API Results')
  console.log("All items");
  console.log(state.items);
  console.log("Search results");
  console.log(state.results);
  console.groupEnd();

  renderResults(state.results);

  console.groupEnd();
}

function setTitle(term) {
  document.title = `Search Results for ${term}`;
  document.querySelectorAll('.term').forEach(span => span.textContent = term);
}

async function getItems(term) {
  setLoading();

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await response.json();
  } catch(error) {
    return [];
  } finally {
    setLoading(false);
  }
}

function createStringSeed() {
  const seed = Math.random().toString(36).substring(2, 15);
  return seed;
}

function clearResults() {
  state.results = [];
  document.querySelectorAll('.results').forEach(ul => ul.innerHTML = '');
}

function renderError(message) {
  const li = document.createElement('li');
  li.classList.add('error');
  li.textContent = message;
  return li;
}

function renderResult(result) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const img = document.createElement('img');

  li.id = result.id;
  li.classList.add('result');

  img.src = `https://picsum.photos/seed/${createStringSeed()}/300`;

  div.classList.add('result-title');
  div.textContent = result.title;
  li.append(img, div);
  return li;
}

function renderResults(results) {
  clearResults()
  let list = results.map(renderResult);
  list = list.length ? list : [renderError('No results found')]
  document.querySelectorAll('.results').forEach(ul => ul.append(...list));
}

function searchAgain() {
  clearResults();
  setLoading(false);
}

onSearch();