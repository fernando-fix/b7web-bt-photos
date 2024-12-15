let input_buscar_fotos = document.getElementById('input_buscar_fotos');
let form_buscar_fotos = document.getElementById('form_buscar_fotos');
let listar_fotos = document.getElementById('listar_fotos');
let loader = document.getElementById('loader');

form_buscar_fotos.addEventListener('submit', function (e) {
    loader_start();
    e.preventDefault();
    let busca = input_buscar_fotos.value;
    let url = `https://jsonplaceholder.typicode.com/photos`;
    fetch(url)
        .then(response => response.json())
        .then(json => json.filter(foto => foto.title.includes(busca)).slice(0, 9))
        .then(resultado => {
            loader_end();
            listar_fotos.innerHTML = '';
            resultado.forEach(foto => {
                listar_fotos.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="${foto.thumbnailUrl}" class="skeleton card-img-top" alt="${foto.title}">
                            <div class="card-body">
                                <h5 class="card-title">${foto.title}</h5>
                            </div>
                        </div>
                    </div>
                `;
            });
            new SkeletonLoader();
        });
});


function loader_start() {
    loader.classList.remove('d-none');
    loader.classList.add('d-flex');
}

function loader_end() {
    loader.classList.remove('d-flex');
    loader.classList.add('d-none');
}

