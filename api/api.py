from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    message = request.form.get('message', '')
    password = request.form.get('password', '')

    # Read image
    file_bytes = image_file.read()
    np_img = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    if img is None:
        return jsonify({'error': 'Invalid image file'}), 400

    # Prepare data
    password_part = f"{len(password):04d}" + password
    full_msg = password_part + message
    total_length = len(full_msg)
    prefix = f"{total_length:08d}"
    full_data = prefix + full_msg

    # Check image size
    height, width, _ = img.shape
    if len(full_data) > height * width * 3:
        return jsonify({'error': 'Image too small'}), 400

    # Encrypt data
    d = {chr(i): i for i in range(255)}
    m = n = z = 0
    try:
        for char in full_data:
            img[n, m, z] = d[char]
            n += 1
            m += 1
            z = (z + 1) % 3
    except IndexError:
        return jsonify({'error': 'Image too small'}), 400

    # Return encrypted image
    _, buffer = cv2.imencode('.png', img)
    byte_io = BytesIO(buffer)
    return send_file(byte_io, mimetype='image/png', as_attachment=True, download_name='encrypted.png')

@app.route('/api/decrypt', methods=['POST'])
def decrypt():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    password = request.form.get('password', '')

    # Read image
    file_bytes = image_file.read()
    np_img = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    if img is None:
        return jsonify({'error': 'Invalid image file'}), 400

    # Extract prefix
    c = {i: chr(i) for i in range(255)}
    m = n = z = 0
    prefix = []
    try:
        for _ in range(8):
            prefix.append(c[img[n, m, z]])
            n += 1
            m += 1
            z = (z + 1) % 3
        total_length = int(''.join(prefix))
    except:
        return jsonify({'error': 'Invalid format'}), 400

    # Extract message
    full_msg = []
    try:
        for _ in range(total_length):
            full_msg.append(c[img[n, m, z]])
            n += 1
            m += 1
            z = (z + 1) % 3
    except IndexError:
        return jsonify({'error': 'Data corrupted'}), 400
    
    full_msg = ''.join(full_msg)
    if len(full_msg) < 4:
        return jsonify({'error': 'Invalid data'}), 400

    password_length = int(full_msg[:4])
    stored_password = full_msg[4:4+password_length]
    message = full_msg[4+password_length:]

    if password == stored_password:
        return jsonify({'message': message})
    else:
        return jsonify({'error': 'Incorrect password'}), 401

if __name__ == '__main__':
    app.run(debug=True)