'use strict';

const dataContainer = document.querySelector('main .content');
let countriesData;
let key = location.search.substring(1);

const sendRequest = () => {

    fetch('all.json').then((response) => response.json()).then((data) => {
        countriesData = data;
        arrangeData(countriesData.find((value) => value.alpha2Code === key || value.alpha3Code === key))
    });
}

const arrangeData = (data) => {

    let currencies = '',
        languages = '',
        borders = '';

    for (const currency of data.currencies) {

        currencies += `<span class="value">${currency.code} ${currency.symbol}</span>`;
    }

    for (const language of data.languages) {

        languages += `<span class="value">${language.name}</span>`;
    }

    if (data?.borders) {
        for (const border of data.borders) {

            borders += `<a href="specified.html?${border}" class="border">${border}</a>`;
        }
    }
    else{
        borders = '<span>None</span>';
    }

    let dataItem = `
    <div class="country-flag">
        <img src="images/${data.alpha2Code}.png" alt="country flag">
    </div>
    <div class="country-detail">
        <div class="country-name">
            <h3>${data.name}</h3>
        </div>
        <div class="country-information">
            <div class="field" id="native-name">
                <span class="name">native name:</span>
                <span class="value">${data.nativeName}</span>
            </div>
            <div class="field" id="top-level-domain">
                <span class="name">top level domain:</span>
                <span class="value">${data.topLevelDomain}</span>
            </div>
            <div class="field" id="population">
                <span class="name">population:</span>
                <span class="value">${data.population}</span>
            </div>
            <div class="field" id="currencies">
                <span class="name">currencies:</span>
                ${currencies}
            </div>
            <div class="field" id="region">
                <span class="name">region:</span>
                <span class="value">${data.region}</span>
            </div>
            <div class="field" id="languages">
                <span class="name">languages:</span>
                ${languages}            
            </div>
            <div class="field" id="sub-region">
                <span class="name">sub region:</span>
                <span class="value">${data.subRegion}</span>
            </div>
            <div class="field" id="capital">
                <span class="name">capital:</span>
                <span class="value">${data.capital}</span>
            </div>
            <div class="borders">
                <span>borders:</span>
                ${borders}
            </div>
        </div>
    </div>`;

    dataContainer.innerHTML += dataItem;
}

sendRequest();
