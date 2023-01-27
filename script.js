'user strict';

const body = document.querySelector('body');
const main = document.querySelector('main');
const header = document.querySelector('header');
const continentListButton = document.querySelector('.select-continent-area');
const continentListIcon = continentListButton.querySelector('i');
const continentList = document.querySelector('.continent-list');
const selectedContinent = document.getElementById('selected-continent');
const dataContainer = document.querySelector('.data .content');
const searchButton = document.querySelector('.search-field-area button');
const searchField = document.querySelector('.search-field-area input');
const changeTheme = document.querySelector('.change-theme button');
let countriesData = null;

const openContinentList = () => {
    continentList.classList.add('open');
    continentListIcon.style.transform = 'rotateZ(180deg)';
}

const closeContinentList = () => {
    continentList.classList.remove('open');
    continentListIcon.style.transform = 'rotateZ(0deg)';
}

const sendRequest = () => {

    fetch('all.json').then((response) => response.json()).then((data) => {
        countriesData = data;
        arrangeData(countriesData);
    });
}

const arrangeData = (data) => {

    dataContainer.innerHTML = '';

    let alpha2Code = null;

    data.forEach((value, index) => {

        alpha2Code = value.alpha2Code.toLowerCase();

        if (alpha2Code === 'ata' || alpha2Code === 'unk' || alpha2Code === 'esh') {
            data.splice(index, 1);
            return;
        }

        let dataItem = `
    <a class="item" href="specified.html?${value.alpha2Code}">
        <div class="flag">
            <img src="images/${alpha2Code}.png" alt="${value.name} flag">
        </div>
        <div class="name">
            <h3>${value.name}</h3>
        </div>
        <div class="details">
            <div class="detail-field">
                <span class="name">population :</span>
                <span class="value">${value.population}</span>
            </div>
            <div class="detail-field">
                <span class="name">region :</span>
                <span class="value">${value.region}</span>
            </div>
            <div class="detail-field">
                <span class="name">capital :</span>
                <span class="value">${value.capital}</span>
            </div>
        </div>
    </a>`;

        dataContainer.innerHTML += dataItem;
    });
}

const filter = () => {

    let filteredData = countriesData.filter((value) => value.name.toLowerCase().startsWith(searchField.value.toLowerCase()) || value.capital?.toLowerCase().startsWith(searchField.value.toLowerCase()));

    if (selectedContinent.textContent !== 'Filter by Region' && selectedContinent.textContent !== 'All') {
        filteredData = filteredData.filter((value) => value.region === selectedContinent.textContent);
    }

    arrangeData(filteredData);
}

sendRequest();

continentListButton.addEventListener('click', (e) => {

    e.stopPropagation();

    if (continentList.classList.contains('open')) {

        if (e.target.classList.contains('continent-option')) {
            selectedContinent.innerHTML = e.target.innerText;
            filter();
        }

        closeContinentList();
    }
    else {
        openContinentList();
    }
});

document.addEventListener('click', (e) => {

    if (continentList.classList.contains('open')) {
        closeContinentList();
    }
});

searchButton.addEventListener('click', (e) => {
    filter();
});

changeTheme.addEventListener('click', (e) => {
    if(body.classList.contains('light'))
    {
        body.classList.remove('light');
        main.classList.remove('light');
        header.classList.remove('light');

        changeTheme.querySelector('span').innerHTML = 'light mode';
        changeTheme.querySelector('i').classList.remove('fa-moon');
        changeTheme.querySelector('i').classList.add('fa-sun');
    }
    else{
        body.classList.add('light');
        main.classList.add('light');
        header.classList.add('light');

        changeTheme.querySelector('span').innerHTML = 'dark mode';
        changeTheme.querySelector('i').classList.remove('fa-sun');
        changeTheme.querySelector('i').classList.add('fa-moon');
    }
});
