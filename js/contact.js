const form = document.querySelector('form#contact');

form.addEventListener('submit', sendContactForm);

async function sendContactForm(event) {
  event.preventDefault();

  const form = event.target;

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form)
    });
    const data = await response.json();
  } catch(error) {
    console.warn(error)
  }
}