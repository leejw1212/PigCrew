const itemsPerPage = 15; // 페이지당 표시할 항목 수
let currentPage = 1;     // 현재 페이지 번호

function getData() {
    fetch("http://localhost:8080/courses")
        .then((response) => response.json())
        .then((data) => {
            const sortedData = data.sort((a, b) => b.count - a.count);
            assignEmojis(sortedData);
            displayData(sortedData);
            setupPagination(sortedData);
        })
        .catch((error) => console.log(error));
}

function displayData(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const item = data[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.emoji}</td>
        `;
        tableBody.appendChild(row);
    }
}

function setupPagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    // 처음으로 가는 페이지로 이동하는 버튼 추가
    addPaginationButton(paginationDiv, "<<", () => {
        currentPage = 1;
        displayData(data);
        updatePaginationButtons(totalPages);
    });

    // 이전 페이지로 이동하는 화살표 추가
    if (currentPage > 1) {
        addPaginationButton(paginationDiv, "<", () => {
            currentPage--;
            displayData(data);
            updatePaginationButtons(totalPages);
        });
    }

    // 페이징 번호 버튼 추가
    const maxVisibleButtons = 3; // 표시할 최대 페이징 번호 개수
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
        addPaginationButton(paginationDiv, i, () => {
            currentPage = i;
            displayData(data);
            updatePaginationButtons(totalPages);
        });
    }

    // 다음 페이지로 이동하는 화살표 추가
    if (currentPage < totalPages) {
        addPaginationButton(paginationDiv, ">", () => {
            currentPage++;
            displayData(data);
            updatePaginationButtons(totalPages);
        });
    }

    // 마지막으로 가는 페이지로 이동하는 버튼 추가
    addPaginationButton(paginationDiv, ">>", () => {
        currentPage = totalPages;
        displayData(data);
        updatePaginationButtons(totalPages);
    });

    // 현재 페이지 숫자 강조
    paginationDiv.querySelector(`button[data-page="${currentPage}"]`).classList.add("current-page");
}

function addPaginationButton(container, text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    container.appendChild(button);
}

function updatePaginationButtons(totalPages) {
    const paginationDiv = document.getElementById("pagination");
    const buttons = paginationDiv.querySelectorAll("button");
    buttons.forEach(button => button.classList.remove("current-page"));
    paginationDiv.querySelector(`button[data-page="${currentPage}"]`).classList.add("current-page");
}

function addPaginationButton(paginationDiv, content, clickHandler) {
    const button = document.createElement("button");
    button.textContent = content;
    
    if (content === currentPage) {
        button.classList.add("current-page"); // 현재 페이지인 경우 클래스 추가
    }
    
    button.addEventListener("click", clickHandler);
    paginationDiv.appendChild(button);
}

function updatePaginationButtons(totalPages) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.querySelectorAll("button").forEach(button => {
        paginationDiv.removeChild(button);
    });

    getData();
}
        
function assignEmojis(data) {
    data.forEach((item) => {
        let emojis = "";
        
        if (item.count >= 64) {
            const catCount = Math.floor(item.count / 64);
            emojis += "😺".repeat(catCount);
            item.count %= 64;
        }
        if (item.count >= 16) {
            const dogCount = Math.floor(item.count / 16);
            emojis += "🐶".repeat(dogCount);
            item.count %= 16;
        }
        if (item.count >= 4) {
            const bunnyCount = Math.floor(item.count / 4);
            emojis += "🐰".repeat(bunnyCount);
            item.count %= 4;
        }
        if (item.count >= 1) {
            emojis += "🐷".repeat(item.count);
        }
        
        item.emoji = emojis || "❓";
    });
}

getData();