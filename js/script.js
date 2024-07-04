var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var siteList = []
var localKey = "addSite"
submit.disabled = true

if (localStorage.getItem(localKey)) {
    siteList = JSON.parse(localStorage.getItem(localKey))
    displaySite();
}

function addSite() {
    var site = {
        name: siteName.value,
        url: siteUrl.value,
        id: siteList.length,
    };
    siteList.push(site)
}

function clear() {
    siteName.value = null
    siteUrl.value = null
}

function displaySite() {
    var cartoona = ``;
    for (let i = 0; i < siteList.length; i++) {
        cartoona += `<tr>
                            <td>${siteList[i].id + 1}</td>
                            <td>${siteList[i].name}</td>
                            <td>
                                <a href="https://${siteList[i].url}/"
                                class="btn btn-success px-3" target="_blank">
                                    <i class="fa-regular fa-eye me-md-2"></i>
                                    Visit
                                </a>
                            </td>
                            <td>
                                <button onClick="deleteSite(${i})" class="btn btn-danger px-3">
                                    <i class="fa-regular fa-trash-can me-md-2"></i>
                                    Delete
                                </button>
                                </td>
                        </tr>
           `
    }
    document.getElementById("displayProduct").innerHTML = cartoona
}
function deleteSite(deletIndex) {
    siteList.splice(deletIndex, 1)
    updateLocal()
    displaySite()
}

submit.addEventListener("click", function () {
    addSite();
    displaySite();
    updateLocal();
    clear();
    validation(siteName);
    validation(siteUrl);
})
updateSiteValue.addEventListener("click", function () {
    clear();
    updateLocal();
    displaySite();
    validation(siteName);
    validation(siteUrl);
})


function validation(elemnt) {
    var validation = {
        siteName: /^[A-Z](\w| ){3,}$/,
        siteUrl: /^(www\.)?\w{3,}\.(com|io)$/,
    }
    if (validation[elemnt.id].test(elemnt.value)) {
        elemnt.nextElementSibling.classList.add("d-none")
        elemnt.classList.add("is-valid")
        elemnt.classList.remove("is-invalid")
        if (siteName.classList.contains("is-valid") && siteUrl.classList.contains("is-valid")) {
            submit.disabled = false
        }
    }
    else {
        elemnt.nextElementSibling.classList.remove("d-none")
        elemnt.classList.remove("is-valid")
        elemnt.classList.add("is-invalid")
        submit.disabled = true
    }
}

function updateLocal() {
    localStorage.setItem(localKey, JSON.stringify(siteList))
}