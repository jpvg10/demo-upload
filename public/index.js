window.addEventListener('load', () => {
    const form = document.querySelector('form');
    const inputNombre = document.getElementById('input-nombre');
    const selectEstrellas = document.getElementById('select-estrellas');
    const inputFoto = document.getElementById('input-foto');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = inputNombre.value;
        const estrellas = selectEstrellas.value;
        const foto = inputFoto.files;

        console.log(foto);

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('estrellas', estrellas);
        formData.append('foto', foto[0]);

        console.log(formData);

        const res = await fetch('/api/hoteles', {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            alert('Error');
        } else {
            const data = await res.json();
            alert(data.message);

            form.reset();
        }
    });
});
