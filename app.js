//-----------------------------------------------------------
//elementi del form
const form = document.getElementById("form");
const h1 = document.getElementById("h1");
//-----------------------------------------------------------
//campi del form
const titolo = document.getElementById("titolo");
const contenuto = document.getElementById("contenuto");
const creatore = document.getElementById("creatore");
const livello_gravità = document.getElementById("scelta_grav");
const livello_processo = document.getElementById("scelta_liv");
//----------------------------------------------------------
//contatori
const cont1 = document.getElementById("conta_backlog")
const cont2 = document.getElementById("conta_in_progress")
const cont3 = document.getElementById("conta_rewiew")
const cont4 = document.getElementById("conta_done")
const cont5 = document.getElementById("conta_backlog2")
const cont6 = document.getElementById("conta_in_progress2")
const cont7 = document.getElementById("conta_rewiew2")
const cont8 = document.getElementById("conta_done2")
//--------------------------------------------------------------
//elementi di testo html
const backlog = document.getElementById("backlog");
const inProgress = document.getElementById("in_progress");
const review = document.getElementById("rewiew");
const ullistadone = document.getElementById("listadone");
//-------------------------------------------------------------
//robe extra
const btnadd = document.getElementById("add");
const btn1 = document.getElementById("bottone");
const overlay = document.querySelector('.form-overlay');
const resetSchermo = document.getElementById("resetschermo");
const scatola_livello = document.getElementsByClassName("scatola_livello");
const todoBox = document.getElementsByClassName("todo-box");

resetSchermo.onclick = () => {
    localStorage.removeItem('themeColor');
    document.body.style.backgroundColor = '#ececece0';
    document.querySelectorAll('.scatola_livello').forEach(box => {
        box.style.backgroundColor = '#ffffff';
    });
    document.querySelectorAll('.todo-box').forEach(box => {
        box.style.backgroundColor = '#fafafa';
    });
}

let clickListenerAdded = false;
let a = false
const loadFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("pippo")) || [];
};

btn1.onclick = (e) => {
    e.stopPropagation(); // Impedisce che l'evento si propaghi al documento
    form.style.display = "block"; // Mostra il form
    overlay.style.display = "block"; // Mostra l'overlay
    h1.style.display = "block"; // Mostra il titolo

};

const todolistData = loadFromLocalStorage(); // Carica i dati salvati

const saveToLocalStorage = () => {
    const jsonSerialized = JSON.stringify(todolistData);
    localStorage.setItem("pippo", jsonSerialized);
};

console.log(todolistData);

const createTodo = (name, content, creator, gravity, level) => ({
    id: crypto.randomUUID(),
    name,
    content,
    creator,
    gravity,
    level,
    svolto: false,
});

saveToLocalStorage();

const showTodolist = () => {
    let conta_backlog = 0
    let conta_rewiew = 0
    let conta_in_progress = 0
    let conta_done = 0
    ullistadone.innerText = " ";
    backlog.innerText = " ";
    inProgress.innerText = " ";
    review.innerText = " ";

    for (const todo of todolistData) {
        const todoBox = document.createElement("div");
        todoBox.className = "todo-box";

        const li = document.createElement("li");
        li.innerText = `${todo.name} `;
        li.className = 'todo-item';

        const l_content = document.createElement("div");
        l_content.innerText = `${todo.content}`;
        l_content.className = 'todo-content';

        // Azioni in basso
        const actions = document.createElement("div");
        actions.className = "todo-actions";

        // Creatore pillola
        const creatorPill = document.createElement("span");
        creatorPill.className = "creator-pill";
        creatorPill.innerText = todo.creator;

        // Bottone "Sposta"
        const btnSposta = document.createElement("button");
        btnSposta.innerText = "Sposta";
        btnSposta.className = "bottone-blu-hover";

        // Dropdown
        const dropdown = document.createElement("select");
        dropdown.innerHTML = `
            <option value="backlog">Backlog</option>
            <option value="in_progress">In Progress</option>
            <option value="rewiew">Review</option>
            <option value="done">Done</option>
        `;
        dropdown.value = todo.level;
        btnSposta.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.todo-box select.show').forEach(s => {
                if (s !== dropdown) s.classList.remove('show');
            });
            dropdown.classList.toggle('show');
        };
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        dropdown.onchange = () => {
            if (dropdown.value) {
                todo.level = dropdown.value;
                saveToLocalStorage();
                showTodolist();
            }
        };
        //Pillola gravità
        const pillola_gravità = document.createElement("pillola_gravità");
        if (todo.gravity === "low") {
            pillola_gravità.className = "pillola_verde";
            pillola_gravità.innerText = "low";
        } else if (todo.gravity === "medium") {
            pillola_gravità.className = "pillola_gialla";
            pillola_gravità.innerText = "medium";
        } else if (todo.gravity === "high") {
            pillola_gravità.className = "pillola_arancio";
            pillola_gravità.innerText = "high";
        } else if (todo.gravity === "critical") {
            pillola_gravità.className = "pillola_rossa";
            pillola_gravità.innerText = "critical";
        }
        // Bottone "Elimina"
        const btnElimina = document.createElement("button");
        btnElimina.innerText = "Elimina";
        btnElimina.className = "bottone-rosso-hover";
        btnElimina.onclick = () => {
            const index = todolistData.findIndex((t) => t.id === todo.id);
            if (index !== 1) {
                if (todo.level === "backlog"){
                    console.log("diminuisci di uno")
                    conta_backlog = conta_backlog - 1
                } else if (todo.level === "in_progress") {
            conta_in_progress = conta_in_progress - 1
        } else if (todo.level === "rewiew") {
            conta_rewiew = conta_rewiew - 1
        } else if (todo.level === "done") {
            conta_done = conta_done - 1
    }
    cont1.innerText = conta_backlog
    cont2.innerText = conta_in_progress
    cont3.innerText = conta_rewiew
    cont4.innerText = conta_done
    cont5.innerText = conta_backlog
    cont6.innerText = conta_in_progress
    cont7.innerText = conta_rewiew
    cont8.innerText = conta_done
                todolistData.splice(index, 1);
                saveToLocalStorage();
                showTodolist();
            }
        };

        // Azioni: creatore a sinistra, pulsanti a destra
        actions.appendChild(creatorPill);
        const actionsRight = document.createElement("div");
        actionsRight.className = "todo-actions-right";
        actionsRight.appendChild(btnSposta);
        actionsRight.appendChild(dropdown);
        actionsRight.appendChild(btnElimina);
        actions.appendChild(actionsRight);

        // Inserisci tutto nella scatola
        todoBox.appendChild(li);
        todoBox.appendChild(pillola_gravità)
        todoBox.appendChild(l_content);
        todoBox.appendChild(actions);
        // Aggiunge il todo nella sezione corretta
        if (todo.level === "backlog") {
            conta_backlog = conta_backlog + 1
            backlog.appendChild(todoBox);
        } else if (todo.level === "in_progress") {
            conta_in_progress = conta_in_progress + 1
            inProgress.appendChild(todoBox);
        } else if (todo.level === "rewiew") {
            conta_rewiew = conta_rewiew + 1
            review.appendChild(todoBox);
        } else if (todo.level === "done") {
            conta_done = conta_done + 1
            ullistadone.appendChild(todoBox);
    }
    cont1.innerText = conta_backlog
    cont2.innerText = conta_in_progress
    cont3.innerText = conta_rewiew
    cont4.innerText = conta_done
    cont5.innerText = conta_backlog
    cont6.innerText = conta_in_progress
    cont7.innerText = conta_rewiew
    cont8.innerText = conta_done
        //--------------------------------------------------------------------
        //toggle di gravità
        pillola_gravità.onclick = () => {
            if (todo.gravity === "low") {
                pillola_gravità.className = "pillola_gialla";
                todo.gravity = "medium";
                pillola_gravità.innerText = "medium";
            }
            else if (todo.gravity === "medium") {
                pillola_gravità.className = "pillola_arancio";
                todo.gravity = "high";
                pillola_gravità.innerText = "high";
            }
            else if (todo.gravity === "high") {
                pillola_gravità.className = "pillola_rossa";
                todo.gravity = "critical";
                pillola_gravità.innerText = "critical";
            }
            else if (todo.gravity === "critical") {
                pillola_gravità.className = "pillola_verde";
                pillola_gravità.innerText = "low";
                todo.gravity = "low";

            }
            todo.gravity = pillola_gravità.innerText
            saveToLocalStorage();
        }
    }

};

// Listener che chiude i dropdown se si clicca fuori (aggiunto una sola volta)
if (!clickListenerAdded) {
    document.addEventListener('click', () => {
        document.querySelectorAll('.todo-box select.show').forEach(s => s.classList.remove('show'));
    });

    clickListenerAdded = true;
}

btnadd.onclick = () => {
    const t = createTodo(
        titolo.value,
        contenuto.value,
        creatore.value,
        livello_gravità.value,
        livello_processo.value
    );
    if (t.content !== "" && t.name !== "" && t.creator !== "") {
        todolistData.push(t);
        saveToLocalStorage();
        form.style.display = "none";
        overlay.style.display = "none";
        h1.style.display = "none";
        showTodolist();
    }
    else {
        alert("errore nell inserimento, assicurati di aver inserito le informazioni in ogni campo")

    }


};


// Nasconde il form quando si clicca fuori dal form o dal pulsante
document.addEventListener('click', (e) => {
    const isClickInsideForm = form.contains(e.target);
    const isClickOnButton = btn1.contains(e.target);
    if (!isClickInsideForm && !isClickOnButton) {
        form.style.display = "none";
        overlay.style.display = "none";
    }

});

showTodolist();

// Funzione per schiarire un colore HEX
function lightenColor(hex, percent) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    const num = parseInt(hex, 16);
    let r = (num >> 16) + Math.round(255 * percent);
    let g = ((num >> 8) & 0x00FF) + Math.round(255 * percent);
    let b = (num & 0x0000FF) + Math.round(255 * percent);
    r = r > 255 ? 255 : r;
    g = g > 255 ? 255 : g;
    b = b > 255 ? 255 : b;
    return `rgb(${r},${g},${b})`;
}

const colorPicker = document.getElementById('colorPicker');
if (colorPicker) {
    // Ripristina il colore salvato al caricamento
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        colorPicker.value = savedColor;
        // Applica anche alle scatole scatola_livello
        const lightColor = lightenColor(savedColor, 0.18);
        document.querySelectorAll('.scatola_livello').forEach(box => {
            box.style.backgroundColor = lightColor;
        });
        document.querySelectorAll('.todo-box').forEach(box => {
            box.style.backgroundColor = lightColor;
        });
    }
    colorPicker.addEventListener('input', (e) => {
        document.body.style.backgroundColor = e.target.value;
        localStorage.setItem('themeColor', e.target.value);
        // Applica anche alle scatole scatola_livello e alle todo-box
        const lightColor = lightenColor(e.target.value, 0.18);
        document.querySelectorAll('.scatola_livello').forEach(box => {
            box.style.backgroundColor = lightColor;
        });
        document.querySelectorAll('.todo-box').forEach(box => {
            box.style.backgroundColor = lightColor;
        });
    });
}



