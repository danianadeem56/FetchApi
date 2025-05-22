// document.getElementById("userForm").addEventListener("submit", function (e) {
//   e.preventDefault(); // prevent page reload

//   const userId = document.getElementById("userid").value;
//   const resultDiv = document.getElementById("result");

//   // Clear previous results
//   resultDiv.innerHTML = "Loading...";

//   // Validate user ID
//   if (userId < 1 || userId > 10) {
//     resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid User ID (1-10).</p>";
//     return;
//   }

//   // Fetch user data from JSONPlaceholder
//   fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("User not found");
//       }
//       return response.json();
//     })
//     .then(user => {
//       resultDiv.innerHTML = `
//         <div id="userinfo">
//           <h2>${user.name}</h2>
//           <p><strong>Username:</strong> ${user.username}</p>
//           <p><strong>Email:</strong> ${user.email}</p>
//           <p><strong>Phone:</strong> ${user.phone}</p>
//           <p><strong>Website:</strong> ${user.website}</p>
//        <button id="getPostsBtn">Get Post</button>
//         </div>
//       `;
//     })
//     .catch(error => {
//       resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
//     });
// });


document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const userId = parseInt(document.getElementById("userid").value); // convert to number
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Loading...";

  // Validate user ID
  if (userId < 1 || userId > 10 || isNaN(userId)) {
    resultDiv.innerHTML = "<p style='color: black;'>Please enter a valid User ID (1-10).</p>";
    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then(user => {
      resultDiv.innerHTML = `
        <div id="userinfo">
          <h2>${user.name}</h2>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Website:</strong> ${user.website}</p>
          
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
          <button id="getPostsBtn">Get Posts</button>
        </div>
      `;

      // Add event listener for posts button (optional enhancement)
      document.getElementById("getPostsBtn").addEventListener("click", () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
          .then(res => res.json())
          .then(posts => {
            const postsHtml = posts.map(post => `
              <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
              </div>
            `).join("");
            resultDiv.innerHTML += `<div id="posts">${postsHtml}</div>`;
          });
      });
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color: black;">Error: ${error.message}</p>`;
    });
});
