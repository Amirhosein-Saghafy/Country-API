'user strict';

const continentListButton = document.querySelector('.select-continent-area button');
const continentListIcon = continentListButton.querySelector('i');
const continentList = document.querySelector('.continent-list');
const selectedContinent = document.getElementById('selected-continent');

const openContinentList = () => {
    continentList.classList.add('open');
    continentListIcon.style.transform = 'rotateZ(180deg)';
}

const closeContinentList = () => {
    continentList.classList.remove('open');
    continentListIcon.style.transform = 'rotateZ(0deg)';
}

continentListButton.addEventListener('click', openContinentList);

document.addEventListener('click', (e) => {

    if (continentList.classList.contains('open')) {

        if (e.target.closest('.continent-list')) {

            selectedContinent.innerHTML = e.target.innerText;
        }
        else if (e.target.closest('.select-continent-area')) {
            return;
        }
        closeContinentList();
    }
});
