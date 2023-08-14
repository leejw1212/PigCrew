document.addEventListener("DOMContentLoaded", function () {
  const addRowButton = document.getElementById("addRowButton");
  const submitButton = document.getElementById("submitButton");
  const resultDiv = document.getElementById("result");
  const rowsContainer = document.getElementById("rows");

  addRowButton.addEventListener("click", function () {
    const newRow = document.createElement("div");
    newRow.className = "row";

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "name";
    nameInput.required = true;

    newRow.appendChild(nameLabel);
    newRow.appendChild(nameInput);

    rowsContainer.appendChild(newRow);
  });

  submitButton.addEventListener("click", function () {
    const rows = document.querySelectorAll(".row");

    const dataArray = [];

    rows.forEach(row => {
      const name = row.querySelector(".name").value;
      
      dataArray.push({ name });  // Change to "count"
    });

    const apiUrl = "http://localhost:8080/courses"; // Spring API 엔드포인트

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataArray)
    })
      .then(response => response.text())
      .then(message => {
        resultDiv.innerHTML = message;
        
        setTimeout(function() {
          window.location.href = "index.html";
        }); // 2초 후에 index.html로 이동
      })
      .catch(error => {
        resultDiv.innerHTML = "API 호출 중 오류가 발생했습니다.";
        console.error(error);
      });
  });
});
