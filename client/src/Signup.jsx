import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setMessageType('');

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.');
      setMessageType('error');
      return;
    }
    if (password.length < 8) {
      setMessage('Your password must be at least 8 characters.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not create your account.');

      setMessage(`Account created successfully for ${data.user.email}. You can now log in.`);
      setMessageType('success');
      setEmail('');
      setPassword('');
      // For a real app, prefer a secure HttpOnly cookie for the session token.
      // This starter deliberately does not persist the JWT in localStorage.
    } catch (error) {
      setMessage(error.message || 'Could not connect to the server. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="signup-card" aria-labelledby="signup-title">
        <header className="signup-header">
          <h1 id="signup-title">Sign Up</h1>
          <p>Already a member? <a href="#login" onClick={(event) => {
            event.preventDefault();
            setMessage('Login is not included in this sign-up starter yet.');
            setMessageType('info');
          }}>Log In</a></p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={254}
            />
          </div>
          <div className="field-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              maxLength={72}
            />
          </div>
          {message && <p className={`feedback ${messageType}`} role="status">{message}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>
        <p className="password-hint">Use at least 8 characters for your password.</p>
      </section>
    </main>
  );
}
