document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const userData = {
    name: name,
    email: email,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("AJAX POST Success:", data);

      let usersArray = JSON.parse(localStorage.getItem("users")) || [];
      usersArray.push(userData);
      localStorage.setItem("users", JSON.stringify(usersArray));

      window.location.href = "display.html";
    })
    .catch((error) => {
      console.error("Error with AJAX request:", error);
      alert("An error occurred during registration.");
    });
});
