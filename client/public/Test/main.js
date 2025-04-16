document.getElementById("loginBtn").addEventListener("click", async () => {
  const versaIdAuthUrl = "http://localhost:3000/v1/authenticate";
  const params = new URLSearchParams({
    versa_id: "optional", // could be blank if using email only
    client_id: "demo-client-123",
    redirect_uri: "http://localhost:3000/callback.html",
    scope: "basic profile email"
  });

  try {
    // Send POST request instead of redirecting
    const response = await fetch(versaIdAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        versa_id: "optional",  // Adjust based on your needs
        client_id: "demo-client-123",
        redirect_uri: "http://localhost:3000/callback.html",
        scope: "basic profile email"
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect to the URL provided by the server
      window.location.href = data.redirect;
    } else {
      console.error('Authentication failed:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
