function getData() {
    fetch("http://localhost:8080/courses")
          .then((response) => response.json())
          .then((data) => displayData(data))
          .catch((error) => console.log(error));
}

function displayData(data) {
            const tableBody = document.querySelector("#dataTable tbody");

            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.author}</td>
                `;
                tableBody.appendChild(row);
            });
        }
        
getData()