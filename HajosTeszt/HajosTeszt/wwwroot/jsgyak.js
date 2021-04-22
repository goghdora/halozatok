function factorial(n) {
    let result = 1;
    for (var i = 1; i <= n; i++) {
        result = result * i;
    }
    return result;
}

function pascal(n, k) {
    let result = factorial(n) / (factorial(k) * factorial(n - k))
    return result;
}

window.onload = function () {
    let containerElement = document.getElementById("container");
    for (var i = 0; i < 10; i++) {
        let elementToInsert = document.createElement("div");
        elementToInsert.style.backgroundColor = `rgba(0, 0, 0, 0.${i})`;
        elementToInsert.innerHTML = `${i + 1}`;
        containerElement.appendChild(elementToInsert);
    }

    let pascalElement = document.getElementById("pascal");
    for (var i = 0; i < 10; i++) {
        let elementToInsert = document.createElement("div");
        elementToInsert.setAttribute("id", `row_${i + 1}`);
        pascalElement.appendChild(elementToInsert);
        let rowElement = document.getElementById(`row_${i + 1}`);

        for (var j = 0; j < i + 1; j++) {
            let elementToInsert = document.createElement("div");
            elementToInsert.setAttribute("id", `child_${j + 1}`);
            elementToInsert.innerHTML = `${pascal(i, j)}`;
            rowElement.appendChild(elementToInsert);
        }

    }

}