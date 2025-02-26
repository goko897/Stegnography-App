# Image Steganography Tool

A web application for hiding secret messages in images using steganography, built with **React** frontend and **Flask** backend.

![Demo](https://github.com/user-attachments/assets/635d7397-c704-4f7a-a871-1a50e26781df)
*Add actual screenshot here*

---

## ✨ Features

- 🔒 **Encrypt messages** into images with password protection
- 🔓 **Decrypt messages** from images using the correct password
- 🖼️ Supports **PNG/JPG** image formats
- 🎨 **Responsive two-column UI** for easy navigation

- 🛡️ Basic password authentication for security
- 📥 **Automatic download** of encrypted images
- 💻 Cross-platform compatibility

---

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the Flask server:
   ```bash
   flask run --port=5000
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

---

## 🚀 Usage

1. **Encrypt a Message:**
   - Upload a cover image.
   - Enter your secret message.
   - Set a password.
   - Click **"Encrypt & Download"** to get the encrypted image.

2. **Decrypt a Message:**
   - Upload the encrypted image.
   - Enter the password used during encryption.
   - Click **"Decrypt"** to reveal the hidden message.

---

## 🖥️ Technical Specifications

| Component       | Technology          |
|-----------------|---------------------|
| Frontend        | React 17            |
| Backend         | Flask 2.0           |
| Image Processing| OpenCV 4.5          |
| Styling         | Inline CSS          |
| HTTP Client     | Axios               |

---

## 📦 Requirements

### Backend
- `flask`
- `flask-cors`
- `opencv-python-headless`
- `numpy`

### Frontend
- `react`
- `axios`

---

## ⚠️ Limitations

- ✋ Works best with **PNG images** (JPEG may lose data due to compression).
- 📏 Message size is limited by the image dimensions.
- 🔐 Uses **basic password storage** (not suitable for highly sensitive data).
- 🖼️ Large images may take longer to process.

---
