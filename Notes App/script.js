const addbtn = document.getElementById("add");
const saveAll = document.getElementById("saveALL");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((i) => {
    addnewnote(i);
  });
}

addbtn.addEventListener("click", () => {
  addnewnote();
});

saveAll.addEventListener("click", () => {
  Updating_LS();
});

function addnewnote(text = "") {
  const note = document.createElement("div");

  note.classList.add("container");

  note.innerHTML = `      
  <div id="notes">
      <div class="header">
        <i class="fa-solid fa-file-pen edit"></i
        ><i class="fa-solid fa-trash delete"></i>
      </div>
      <div class="notes-body">
        <div class="main hidden"></div>
        <textarea name="textarea" id="text"></textarea>
      </div>
      <div class="footer"><button class="save">save</button></div>
  </div>
  `;

  const textArea = note.querySelector("textarea");
  const editbtn = note.querySelector(".edit");
  const deletebtn = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const save_note = note.querySelector(".save");

  textArea.value = text;
  mainDiv.innerHTML = text;

  save_note.addEventListener("click", () => {
    Updating_LS();
  });

  deletebtn.addEventListener("click", () => {
    note.remove();

    Updating_LS();
  });

  editbtn.addEventListener("click", () => {
    textArea.classList.toggle("hidden");
    mainDiv.classList.toggle("hidden");
    if (!textArea.classList.contains("hidden")) {
      textArea.focus();
    }
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainDiv.innerHTML = value;
  });

  document.body.appendChild(note);
}

function Updating_LS() {
  const note = document.querySelectorAll("textarea");

  const notes = [];
  note.forEach((i) => {
    notes.push(i.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
