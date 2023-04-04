window.onload = () => {
  
  const content = document.querySelector('.content');
  const inputParagraph = document.querySelector('.input-paragraph');
  const inputWord = document.querySelector('.input-word');
  const btnGenerate = document.querySelector('.btn-generate');
  btnGenerate.addEventListener('click', generate);
  
  async function generate() {
    try {
      // value input
      const paragraph = inputParagraph.value.trim();
      const word = inputWord.value.trim();
      // validasi terlebih dahulu
      if (validate(paragraph, word) == true) {
        // fetch data
        const data = await fetchData(paragraph, word);
        // tampilkan hasilnya ke bagian halaman
        content.innerText = data;
      }
    } catch (error) {
      // tampilkan error
      const err = showError(error.message);
      content.innerHTML = err;
    }
  }
  
  function validate(paragraph, word) {
    // jika semua input kosong
    if (!paragraph && !word) return alerts('error', 'field`s was empty!');
    // jika input "paragraph" kosong
    if (!paragraph) return alerts('error', 'field paragraph was empty!');
    // jika input "word" kosong
    if (!word) return alerts('error', 'field word was empty!');
    // jika input berisikan "huruf"
    if (paragraph.match(/[a-zA-Z]/g) || word.match(/[a-zA-Z]/g)) return alerts('error', 'input can only contain numbers!');
    // jika input berisikan sebuah "spasi"
    if (paragraph.match(/\s/g) || word.match(/\s/g)) return alerts('error', 'please enter a number and no spaces');
    // jika berhasil melewati semua validasi
    return true;
  }
  
  function alerts(type, text) {
    // plugin dari "sweetalert2"
    swal.fire ({
      icon: type,
      title: 'Alert',
      text: text
    });
  }
  
  function fetchData(paragraph, word) {
    return fetch(`https://dinoipsum.com/api/?format=text&words=${word}&paragraphs=${paragraph}`)
      .then(response => response.text())
      .then(response => response)
      .catch(error => {
        throw new Error(error);
      });
  }
  
  function showError(message) {
    return `
    <div class="alert alert-danger rounded-1 my-3" role="alert">
      <h3 class="fw-normal mb-2">Alert</h3>
      <p class="fw-light my-auto">${message}</p>
    </div>
    `;
  }
  
  // salin teks 
  const btnCopy = document.querySelector('.btn-copy');
  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(content.innerText);
    alerts('success', 'text copied to clipboard!');
  });
  
}