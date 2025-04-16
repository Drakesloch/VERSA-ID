const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Allow requests from the front-end
app.use(cors());
app.use(express.json());

// Serve static files from the client/public folder
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// Simulated database of tokens
let fakeTokens = {};

// Authentication endpoint
app.post('/v1/authenticate', (req, res) => {
  const { versa_id, client_id, redirect_uri, scope } = req.body;

  const token = `fake-token-${Date.now()}`;
  fakeTokens[token] = { versa_id, client_id, scope };

  const redirectUrl = `${redirect_uri}?token=${token}`;
  return res.json({ redirect: redirectUrl });
});

// Userinfo endpoint (example of secured data)
app.get('/v1/userinfo', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const data = fakeTokens[token];

  if (data) {
    return res.json({
      id: data.versa_id,
      client_id: data.client_id,
      scope: data.scope,
      name: "Test User",
      email: "user@versa-id.local"
    });
  } else {
    return res.status(401).json({ error: "Invalid token" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Versa-ID mock API running at http://localhost:${PORT}`);
});
