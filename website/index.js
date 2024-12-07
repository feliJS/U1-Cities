function createBox(cityName) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("cityBox");
    newDiv.textContent = cityName;
    document.getElementById("cities").append(newDiv);
}

function userInputObject(userInput) {
    for (let city of cities) {
        if (userInput == city.name) {
            return city;
        }
    }
    return null;
}

function getCityDistance(userInputObj) {
    let shortestDistance = null;
    let nearestCity = null;
    let longestDistance = null;
    let furthestCity = null;
    for (let distanceObj of distances) {
        if (distanceObj.city1 == userInputObj.id || distanceObj.city2 == userInputObj.id) {

            let otherCity;
            if (distanceObj.city1 == userInputObj.id) {
                otherCity = distanceObj.city2;
            } else {
                otherCity = distanceObj.city1;
            }

            if (shortestDistance == null || distanceObj.distance < shortestDistance) {
                shortestDistance = distanceObj.distance;
                nearestCity = otherCity;
            }
            if (longestDistance == null || distanceObj.distance > longestDistance) {
                longestDistance = distanceObj.distance;
                furthestCity = otherCity;
            }
        }
    }
    return {
        nearestObj: {
            nearestCity: nearestCity,
            shortestDistance: shortestDistance,
        },
        furthestObj: {
            furthestCity: furthestCity,
            longestDistance: longestDistance
        }
    };
}

function markCityBox(cityObject, kindOfCity) {
    let cityBoxes = document.getElementsByClassName("cityBox")
    for (let i = 0; i < cityBoxes.length; i++) {
        const cityBox = cityBoxes[i]
        if (cityObject.nearestCity == cities[i].id) {
            cityBox.classList.add(kindOfCity);
            cityBox.textContent = `${cities[i].name} ligger ${cityObject.shortestDistance / 10} mil bort`
        }
        else if (cityObject.furthestCity == cities[i].id) {
            cityBox.classList.add(kindOfCity);
            cityBox.textContent = `${cities[i].name} ligger ${cityObject.longestDistance / 10} mil bort`
        }
        else if (cityObject == cities[i].id) {
            cityBox.classList.add(kindOfCity);
        }
    }
}

function updateText(userInput, distanceObjects) {
    h2Element.textContent = `${userInput.name} (${userInput.country})`
    titleHeadElement.textContent = `${userInput.name}`
    for (let i = 0; i < cities.length; i++) {
        if (distanceObjects.furthestObj.furthestCity == cities[i].id) {
            document.getElementById("furthest").innerText = cities[i].name;
        }
        else if (distanceObjects.nearestObj.nearestCity == cities[i].id) {
            document.getElementById("closest").innerText = cities[i].name;
        }
    }
}

function createDistanceTable() {
    const table = document.getElementById("table");
    for (let row = 0; row <= cities.length; row++) {
        for (let col = 0; col <= cities.length; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            if (col % 2 == 1 && col > 0 && row > 0) {
                cell.classList.add("even_col");
            }
            if (row % 2 == 1) {
                cell.classList.add("even_row");
            }
            if (row === 0 && col > 0) {
                cell.textContent = cities[col - 1].id;
                cell.classList.add("head_row");
            }
            else if (col === 0 && row > 0) {
                cell.textContent = `${cities[row - 1].id}-${cities[row - 1].name}`;
                cell.classList.add("head_column");
            }
            else if (col != row) {
                for (let distanceObj of distances) {
                    if (distanceObj.city1 == cities[col - 1].id && distanceObj.city2 == cities[row - 1].id || distanceObj.city1 == cities[row - 1].id && distanceObj.city2 == cities[col - 1].id) {
                        cell.textContent = distanceObj.distance / 10;
                    }
                }
            }
            table.appendChild(cell);
        }
    }
}

const h2Element = document.querySelector("h2");
const h3Element = document.querySelector("h3");
const titleHeadElement = document.querySelector("title");
const spanElement = document.querySelector("span");

for (let i = 0; i < cities.length; i++) {
    createBox(cities[i].name)
}

createDistanceTable();

const userInput = prompt("Vilken stad?")

let inputObj = userInputObject(userInput);
if (inputObj === null) {
    h2Element.textContent = `${userInput} finns inte i databasen `
    titleHeadElement.textContent = "Not Found"
    h3Element.style.display = "none"
} else {
    let distanceObjects = getCityDistance(inputObj);
    let targetCityId = inputObj.id

    markCityBox(distanceObjects.furthestObj, "furthest");
    markCityBox(targetCityId, "target");
    markCityBox(distanceObjects.nearestObj, "closest");
    updateText(inputObj, distanceObjects);
}
