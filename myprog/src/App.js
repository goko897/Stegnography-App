import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [encryptFile, setEncryptFile] = useState(null);
  const [encryptMessage, setEncryptMessage] = useState('');
  const [encryptPassword, setEncryptPassword] = useState('');
  const [decryptFile, setDecryptFile] = useState(null);
  const [decryptPassword, setDecryptPassword] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState('');

  const handleEncrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', encryptFile);
    formData.append('message', encryptMessage);
    formData.append('password', encryptPassword);

    try {
      const res = await axios.post('/api/encrypt', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'encrypted.png');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Encryption failed');
    }
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', decryptFile);
    formData.append('password', decryptPassword);

    try {
      const res = await axios.post('/api/decrypt', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDecryptedMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Decryption failed');
      setDecryptedMessage('');
    }
  };

  return (
    <div className="App" style={styles.appContainer}>
      <h1 style={styles.title}>Image Steganography Tool</h1>
      {error && <p style={styles.error}>{error}</p>}
      
      <div style={styles.columnsContainer}>
        {/* Encryption Column */}
        <div style={styles.column}>
          <div style={styles.formContainer}>
            <h2 style={styles.subtitle}>Encrypt Message</h2>
            <form onSubmit={handleEncrypt} style={styles.form}>
              <input
                type="file"
                onChange={(e) => setEncryptFile(e.target.files[0])}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Secret Message"
                value={encryptMessage}
                onChange={(e) => setEncryptMessage(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Encryption Password"
                value={encryptPassword}
                onChange={(e) => setEncryptPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Encrypt & Download
              </button>
            </form>
          </div>
        </div>

        {/* Decryption Column */}
        <div style={styles.column}>
          <div style={styles.formContainer}>
            <h2 style={styles.subtitle}>Decrypt Message</h2>
            <form onSubmit={handleDecrypt} style={styles.form}>
              <input
                type="file"
                onChange={(e) => setDecryptFile(e.target.files[0])}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Decryption Password"
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Decrypt Message
              </button>
            </form>
            {decryptedMessage && (
              <div style={styles.resultContainer}>
                <h3 style={styles.resultTitle}>Decrypted Message:</h3>
                <p style={styles.resultText}>{decryptedMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add the style tag here */}
      <style>
        {`
          body {
            margin: 0;
            padding: 20px;
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #f0f2f5;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#1a73e8',
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  columnsContainer: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '25px',
  },
  subtitle: {
    color: '#202124',
    fontSize: '1.8rem',
    marginBottom: '25px',
    borderBottom: '2px solid #1a73e8',
    paddingBottom: '10px',
  },
  formContainer: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #dadce0',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  error: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: '25px',
    padding: '20px',
    backgroundColor: '#e3f2fd',
    borderRadius: '8px',
  },
  resultTitle: {
    color: '#1a73e8',
    marginBottom: '15px',
    fontSize: '1.2rem',
  },
  resultText: {
    color: '#202124',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
};

export default App;