//Control de errores 
function showError(msg) {
  const alert = document.getElementById("error-alert");
  alert.textContent = msg;
  alert.style.display = "block";
}
//Limpiar Control de errores 
function clearError() {
  const alert = document.getElementById("error-alert");
  alert.style.display = "none";
  alert.textContent = "";
}
// Cargar tareas
async function loadTasks() {
  try {
    clearError();
    const response = await fetch("http://localhost:3500/tasks");
    const tasks = await response.json();

    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach(task => {

      const li = document.createElement("li");
      li.className = "task-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.iscomplete;
      checkbox.addEventListener("change", () => toggleTask(task.id, checkbox.checked));

      const text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.name;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Eliminar";
      deleteBtn.addEventListener("click", () => deleteTask(task.id));

      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(deleteBtn);
      list.appendChild(li);

    });
  } catch (err) {
    showError("Error al cargar las tareas: " + err.message);
  }
}

//Agregar tarea
async function addTask(e) {
  e.preventDefault();

  const input = document.getElementById("task-input");

  if (!input.value.trim()) return;

  try {
    clearError();
    const res = await fetch("http://localhost:3500/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: input.value.trim()
      })
    });

    const data = await res.json();
    if (!res.ok) {
      showError(data.error || "Error al agregar la tarea");
      return;
    }

    input.value = "";
    loadTasks();
  } catch (err) {
    showError("Error al agregar la tarea: " + err.message);
  }
}

//Actializar o refrescar la pagina para mostrar los cambios realizados en la base de datos
async function toggleTask(id, isComplete) {
  try {
    clearError();
    await fetch("http://localhost:3500/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, isComplete })
    });
  } catch (err) {
    showError("Error al actualizar la tarea: " + err.message);
  }
}
//Eliminar tarea
async function deleteTask(id) {
  try {
    clearError();
    await fetch("http://localhost:3500/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    loadTasks();
  } catch (err) {
    showError("Error al eliminar la tarea: " + err.message);
  }
}

document.getElementById("task-form").addEventListener("submit", addTask);

loadTasks();