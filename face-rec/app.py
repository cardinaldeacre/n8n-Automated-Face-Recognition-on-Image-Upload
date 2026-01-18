from flask import Flask, request, jsonify
import cv2
import numpy as np
import mtcnn
from tensorflow.keras.models import load_model
from utils import get_face, normalize, l2_normalizer
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "facenet_keras.h5")
REQUIRED_SIZE = (160, 160)

print(f"📂 Direktori Model: {MODEL_PATH}")

face_detector = None
face_encoder = None

try:
    print("⏳ loading MTCNN...")
    face_detector = mtcnn.MTCNN()
    print("⏳ loading FaceNet...")
    face_encoder = load_model(MODEL_PATH, compile=False)
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Error:")
    print(str(e))

@app.route('/generate-embedding', methods=['POST'])
def generate_embedding():

    if face_encoder is None or face_detector is None:
        return jsonify({"error": "Model failed to load"}), 500

    vectors = []

    for file in request.files.values():
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        if img is None:
            continue

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = face_detector.detect_faces(img_rgb)
        if not results:
            continue

        res = max(results, key=lambda b: b['box'][2] * b['box'][3])
        face, _, _ = get_face(img_rgb, res['box'])
        face = normalize(face)
        face = cv2.resize(face, REQUIRED_SIZE)

        vector = face_encoder.predict(np.expand_dims(face, axis=0), verbose=0)[0]
        vectors.append(vector)

    
    if len(vectors) == 0:
        return jsonify({"success": False, "error": "Wajah tidak ditemukan"}), 400
    
    avg_vector = np.mean(vectors, axis=0)
    final_embedding = l2_normalizer.transform(
        np.expand_dims(avg_vector, axis=0)
    )[0]
    
    return jsonify({
        "success": True,
        "embedding": final_embedding.tolist()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=False)