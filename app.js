// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Autor: Aley Cabrera D.


const amigosIngresados = [];//Array para almacenar los amigos ingresados

        function agregarAmigo() {//Función para agregar amigos
            const amigo = document.getElementById('amigo').value;//Obtener el valor del input amigo
            if (amigo.trim() === '') {//Validar que el campo no esté vacío
                alert('Por favor, ingrese un nombre de amigo.'); // Mostrar un mensaje de alerta
                return;
            }
            amigosIngresados.push(amigo); // Agregar el amigo al array
            actualizarListaAmigos(); // Actualizar la lista de amigos
            document.getElementById('amigo').value = ''; // Limpiar el input después de agregar el amigo
        }

        function sortearAmigo() {//Función para sortear amigo secreto
            if (amigosIngresados.length < 2) {//Validar que haya al menos dos amigos para sortear
                alert('Debe haber al menos dos amigos para sortear.');//Mostrar un mensaje de alerta
                return;
            }
            const amigoSorteado = amigosIngresados[Math.floor(Math.random() * amigosIngresados.length)];//Obtener un amigo aleatorio
            const resultado = document.getElementById('resultado');//Obtener el elemento de resultado
            resultado.textContent = `El amigo secreto es: ${amigoSorteado}`;//Mostrar el amigo secreto en el resultado

            // Activar la celebración
            iniciarCelebracion();

            // Reiniciar la página después de 15 segundos
            setTimeout(() => {
                location.reload(); // Recargar la página
            }, 15000); // 15000 milisegundos = 15 segundos
        }

        function handleKeyPress(event) {//Función para manejar la tecla Enter
            if (event.key === 'Enter') {//Validar si la tecla presionada es Enter
                const input = document.getElementById('amigo');//Obtener el input amigo por su ID
                if (input.value.trim() === '') {//Validar si el campo está vacío o no
                    sortearAmigo(); // Si el campo está vacío, sortear amigo secreto
                } else {
                    agregarAmigo(); // Si hay texto, añadir el amigo
                }
            }
        }

        function actualizarListaAmigos() { // Función para actualizar la lista de amigos en el HTML
            const listaAmigos = document.getElementById('listaAmigos'); // Obtener el elemento <ul> por su ID en el HTML
            listaAmigos.innerHTML = ""; // Limpiar la lista existente

            // Recorrer el array y agregar cada nombre como un <li>
            for (let i = 0; i < amigosIngresados.length; i++) { // Recorrer el array de amigos ingresados con un bucle for 
                const amigoItem = document.createElement('li'); // Crear un elemento <li> para cada amigo
                amigoItem.textContent = amigosIngresados[i]; // Asignar el nombre del amigo al contenido del <li>
                listaAmigos.appendChild(amigoItem); // Agregar el <li> a la lista existente
            }
        }

        function iniciarCelebracion() { // Función para iniciar la celebración con fuegos artificiales al sortear el amigo secreto 
            // Configuración de los fuegos artificiales
            const duration = 15 * 1000; // 15 segundos
            const animationEnd = Date.now() + duration; // Fecha de fin de la animación en milisegundos
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }; // Configuración de los fuegos artificiales por defecto

            // Función para generar los fuegos artificiales
            function randomInRange(min, max) { // Función para generar un valor aleatorio dentro de un rango
                return Math.random() * (max - min) + min; // Fórmula para generar un número aleatorio dentro de un rango
            }

            const interval = setInterval(() => { // Intervalo para generar los fuegos artificiales
                const timeLeft = animationEnd - Date.now(); // Tiempo restante en milisegundos

                if (timeLeft <= 0) { // Si el tiempo restante es menor o igual a 0
                    return clearInterval(interval); // Detener el intervalo
                }

                const particleCount = 50 * (timeLeft / duration); // Cantidad de partículas en función del tiempo restante (más partículas al principio)

                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0, 1), y: Math.random() - 0.2 } }); // Generar un fuego artificial
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                });
            }, 250);
        }

        document.querySelector('.button-add').addEventListener('click', agregarAmigo);
        document.querySelector('.button-draw').addEventListener('click', sortearAmigo);