// Write a JavaScript Program to get the user registration data and push to
// array/local storage with AJAX POST method and data list in new page
// and display the output on the vagrant machine (ubuntu 22.04)

document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get the user registration data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const userData = {
    name: name,
    email: email,
  };

  // Simulate AJAX POST using fetch (sending data to a mock API)
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

      // Push to array/local storage
      let usersArray = JSON.parse(localStorage.getItem("users")) || [];
      usersArray.push(userData);
      localStorage.setItem("users", JSON.stringify(usersArray));

      // Data list in new page (Redirect to the display page)
      window.location.href = "display.html";
    })
    .catch((error) => {
      console.error("Error with AJAX request:", error);
      alert("An error occurred during registration.");
    });
});
