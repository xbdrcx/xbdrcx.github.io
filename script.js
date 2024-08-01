var current_panel = "#home"
var current_lang = 0
var projects_data = NaN
var available_technologies = ["All"]
var isPlaying = false
var backgroundOn = true
var project_title = document.getElementById("projectPanel-title")
var project_technologies = document.getElementById("projectPanel-technologies")
var project_description = document.getElementById("projectPanel-description")
var project_version = document.getElementById("projectPanel-version")
var project_platforms = document.getElementById("projectPanel-platforms")

const quotes = [
  "All our dreams can come true, if we have the courage to pursue them. - Walt Disney",
  "The only source of knowledge is experience. - Albert Einstein",
  "Attitude is a little thing that makes a big difference. - Winston Churchill",
  "To know, is to know that you know nothing. - Socrates",
  "The good life is one inspired by love and guided by knowledge. - Bertrand Russell",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Just one small positive thought in the morning can change your whole day. - Dalai Lama",
  "Do the best you can. No one can do more than that. - John Wooden",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "It always seems impossible until it's done. - Nelson Mandela",
]

const quotePlace = document.getElementById("quote")
quotePlace.innerHTML = quotes[Math.floor(Math.random() * quotes.length)]

const audio_files = [
  "assets/Alex Dovo - Mass Ave (Royalty Free Music).mp3",
  
]

var audio = new Audio(audio_files[Math.floor(Math.random() * audio_files.length)]);
audio.id = "audio"
audio.loop = true
audio.volume = 0.4

audio.addEventListener("ended", () => {
  if (isPlaying) {
    isPlaying = false
    document.getElementsByName("play-icon").forEach((button) => {
      button.classList.remove("fa-stop")
      button.classList.add("fa-play")
    })
    audio.src = audio_files[Math.floor(Math.random() * audio_files.length)]
  }
})

fetch("projects.json").then((res) => {
  if (!res.ok) {
    throw new Error(`HTTP Error. Status: ${res.status}`)
  }
  return res.json()
}).then((data) => {

  projects_data = data

  var projects_table = document.getElementById("projectsTable")

  for (var project in data) {
    let project_tr = document.createElement("tr")
    
    let project_id = document.createElement("td")
    project_id.style.display = "none"
    project_id.textContent = project

    let project_title = document.createElement("td")
    project_title.textContent = data[project].title
    
    let project_technologies = document.createElement("td")
    for (var technology in data[project].technologies) {
      project_technologies.textContent += data[project].technologies[technology] + "  "
      if (!available_technologies.includes(data[project].technologies[technology])) {
        available_technologies.push(data[project].technologies[technology])
      }
    }
    
    project_tr.appendChild(project_id)
    project_tr.appendChild(project_title)
    project_tr.appendChild(project_technologies)

    project_tr.addEventListener("click", () => openProjectPanel(project_id.innerHTML))

    projects_table.appendChild(project_tr)

  }

  for (let t = 0; t < available_technologies.length; t++) {
    let option = document.createElement("option")
    option.innerHTML = available_technologies[t]
    document.getElementById("technologiesDropdown").appendChild(option)
  }

}).catch((error) => {
  console.error("Unable to fetch data:", error)
})

$(document).ready(function(){
  startTime()
  document.getElementsByTagName('canvas')[0].addEventListener("click", () => {
    if (projectPanelOpen) {
      closeProjectPanel()
    }
  })
})

window.addEventListener("keyup", (e) => {
  if (projectPanelOpen && e.key === "Escape") {
    closeProjectPanel()
  }
})

/** 
 * Plays/Stops music
*/
function play() {
  if (isPlaying) {
    document.getElementsByName("play-icon").forEach((button) => {
      button.classList.remove("fa-stop")
      button.classList.add("fa-play")
      button.title = "Play Music"
    })
    audio.pause()
    audio.src = audio_files[Math.floor(Math.random() * audio_files.length)]
  } else {
    document.getElementsByName("play-icon").forEach((button) => {
      button.classList.remove("fa-play")
      button.classList.add("fa-stop")
      button.title = "Stop Music"
    })
    audio.play()
  }
  isPlaying = !isPlaying
}

/** 
 * Turns ThreeJS background ON and OFF
*/
function background() {
  if (backgroundOn) {
    document.getElementsByName("background-icon").forEach((button) => {
      button.classList.remove("fa-regular")
      button.classList.add("fa-solid")
      button.title = "Turn Backgroudn ON"
    })
    $("canvas").fadeOut()
  } else {
    document.getElementsByName("background-icon").forEach((button) => {
      button.classList.remove("fa-solid")
      button.classList.add("fa-regular")
      button.title = "Turn Backgroudn OFF"
    })
    $("canvas").fadeIn()
  }
  backgroundOn = !backgroundOn
}

/** 
 * Filters table according to selected option
*/
function filterTable() {
  let dropdown, table, rows, cells, technology, filter
  dropdown = document.getElementById("technologiesDropdown")
  table = document.getElementById("projectsTable")
  rows = table.getElementsByTagName("tr")
  filter = dropdown.value
  $("#projectsTable").fadeOut(() => {
    for (let row of rows) {
      cells = row.getElementsByTagName("td")
      technology = cells[2] || null
      if (filter === "All" || filter === "Todas" || !technology || technology.textContent.includes(filter)) {
        row.style.display = ""
      } else {
        row.style.display = "none"
      }
    }
    $("#projectsTable").fadeIn()
  })
}

/** 
 * Fades out current panel, fades in selected panel
 * @param {string} id, Panel Id
*/
function fadePanel(id) {
  if (current_panel != id) {
    if (current_panel == "#home") {
      current_panel = id
      $(current_panel).fadeIn()
    } else {
        $(current_panel).fadeOut(() => {
            current_panel = id
            if (current_panel != "#home") {
                $(current_panel).fadeIn()
            }
        })
    }
  }
}

/** 
 * Change Page Language (0 = English, 1 = Portuguese)
 * @param {number} id, Language Id
*/
function changeLanguage(id) {
  if (id != current_lang) {
    current_lang = id
    $(".wrapper").fadeOut(() => {
      if (id == 0) {
        // English
        document.getElementById("menu-about").innerHTML = "about"
        document.getElementById("menu-projects").innerHTML = "projects"
    
        document.getElementById("about-title").innerHTML = "About"
        document.getElementById("projects-title").innerHTML = "Projects"

        document.getElementById("about-description").innerHTML = "A bit of me and my experience"
        document.getElementById("projects-description").innerHTML = "Some of my personal projects"

        document.getElementById("lang-en").title = "English"
        document.getElementById("lang-pt").title = "Portuguese"

        document.getElementById("technologiesDropdown").getElementsByTagName("option")[0].innerHTML = "All"

        document.getElementById("projectsTable").getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML = "Name"
        document.getElementById("projectsTable").getElementsByTagName("tr")[0].getElementsByTagName("th")[1].innerHTML = "Technologies"

        document.getElementById("table-info").innerHTML = "Click table item for details"

        document.getElementById("about-greetings").innerHTML = "Hi 👋 I'm Bruno"
        document.getElementById("about-welcome").innerHTML = "Welcome to my portfolio"

        // document.getElementById("certs").innerHTML = "Certifications"

        // document.getElementById("learning-title").innerHTML = "Currently studying: "

        document.getElementById("course").innerHTML = "Programming Course @ <a href='https://escoladigital.com/' target='_blank'>Escola Profissional de Tecnologia Digital</a"
        document.getElementById("barreiro").innerHTML = "[Intership] Help Desk @ <a href='https://cm-barreiro.pt/' target='_blank'>Barreiro's Town Hall</a>"
        document.getElementById("kcs_intern").innerHTML = "[Intership] Web Developer @ <a href='https://kcsit.pt/' target='_blank'>KCSiT</a>"
        document.getElementById("kcs").innerHTML = "Web Developer (2+ years) @ <a href='https://kcsit.pt/' target='_blank'>KCSiT</a>"
        document.getElementById("pprojects").innerHTML = `Personal Projects @ <a onclick='fadePanel("#projects")'>projects</a>`

        document.getElementById("projectPanel-version-label").innerHTML = "Version "
        document.getElementById("projectPanel-platform-label").innerHTML = "Platform(s) "

        document.getElementById("bugsuggestion").innerHTML = "Any Bug or Improvement Suggestion, consider contacting via "

      } else {
        // Portuguese
        document.getElementById("menu-about").innerHTML = "sobre"
        document.getElementById("menu-projects").innerHTML = "projetos"
    
        document.getElementById("about-title").innerHTML = "Sobre"
        document.getElementById("projects-title").innerHTML = "Projetos"

        document.getElementById("about-description").innerHTML = "Um pouco sobre mim e da minha experiência"
        document.getElementById("projects-description").innerHTML = "Alguns dos meus projetos pessoais"
  
        document.getElementById("lang-en").title = "Inglês"
        document.getElementById("lang-pt").title = "Português"

        document.getElementById("technologiesDropdown").getElementsByTagName("option")[0].innerHTML = "Todas"

        document.getElementById("projectsTable").getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML = "Nome"
        document.getElementById("projectsTable").getElementsByTagName("tr")[0].getElementsByTagName("th")[1].innerHTML = "Tecnologias"

        document.getElementById("table-info").innerHTML = "Clica num item da tabela para detalhes"

        document.getElementById("about-greetings").innerHTML = "Olá 👋 Sou o Bruno"
        document.getElementById("about-welcome").innerHTML = "Bem-vindo ao meu portfolio"

        // document.getElementById("certs").innerHTML = "Certificações"

        // document.getElementById("learning-title").innerHTML = "Atualmente a estudar: "

        document.getElementById("course").innerHTML = "Curso Programação @ <a href='https://escoladigital.com/' target='_blank'>Escola Profissional de Tecnologia Digital</a"
        document.getElementById("barreiro").innerHTML = "[Estágio] Help Desk @ <a href='https://cm-barreiro.pt/' target='_blank'>Câmara Municipal do Barreiro</a>"
        document.getElementById("kcs_intern").innerHTML = "[Estágio] Desenvolvedor Web @ <a href='https://kcsit.pt/' target='_blank'>KCSiT</a>"
        document.getElementById("kcs").innerHTML = "Desenvolvedor Web (+2 anos) @ <a href='https://kcsit.pt/' target='_blank'>KCSiT</a>"
        document.getElementById("pprojects").innerHTML = `Projetos Pessoais @ <a onclick='fadePanel("#projects")'>projetos</a>`

        document.getElementById("projectPanel-version-label").innerHTML = "Versão "
        document.getElementById("projectPanel-platform-label").innerHTML = "Plataforma(s) "

        document.getElementById("bugsuggestion").innerHTML = "Algum Bug or Sugestão de Melhoramento, considere contactar via "

      }
      $(".wrapper").fadeIn()
    })
  }
}

var projectPanelOpen = false

/** 
 * Opens Project Panel
 * @param {string} id, Project id
*/
function openProjectPanel(id) {
  project_title.innerHTML = projects_data[id].title
  for (var technology in projects_data[id].technologies) {
    project_technologies.innerHTML += projects_data[id].technologies[technology] + " "
  }
  if (current_lang == 0) {
    project_description.innerHTML = projects_data[id].abouten
  } else {
    project_description.innerHTML = projects_data[id].aboutpt 
  }
  if (projects_data[id].version != "") {
    document.getElementById("project-version-container").style.visibility = "visible"
    project_version.innerHTML = projects_data[id].version
  } else {
    document.getElementById("project-version-container").style.visibility = "hidden"
  }
  if (projects_data[id].platforms != []) {
    document.getElementById("project-platform-container").style.visibility = "visible"
    project_platforms.innerHTML = projects_data[id].platforms
  } else {
    document.getElementById("project-platform-container").style.visibility = "hidden"
  }
  let img_elem = document.createElement("img")
  img_elem.alt = projects_data[id].title
  img_elem.onerror = () => { img_elem.src = 'assets/img_placeholder.webp' }
  img_elem.src = projects_data[id].image
  document.getElementById("project-right").appendChild(img_elem)
  for (var link in projects_data[id].links) {
    let link_elem = document.createElement("a")
    link_elem.innerHTML = projects_data[id].links[link].title
    link_elem.href = projects_data[id].links[link].url
    link_elem.target = "_blank"
    document.getElementById("project-bottom").appendChild(link_elem)
  }
  $(".wrapper").fadeOut()
  $("#projectpanel").fadeIn(() => {
    projectPanelOpen = true
  })
}

/** 
 * Cleans and Closes Project Panel
*/
function closeProjectPanel() {
  $(".wrapper").fadeIn()
  $("#projectpanel").fadeOut(() => {
    project_title.innerHTML = ""
    project_technologies.innerHTML = ""
    project_description.innerHTML = ""
    document.getElementById("project-right").innerHTML = ""
    document.getElementById("project-bottom").innerHTML = ""
    projectPanelOpen = false
  })
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
