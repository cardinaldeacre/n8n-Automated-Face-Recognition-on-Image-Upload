from flask import Flask, request, jsonify
import cv2
import numpy as np
import mtcnn
from keras.models import load_model
from utils import get_face, normalize, l2_normalizer

app = Flask(__name__)
print("Loading models...")
MODEL_PATH = "facenet_keras.h5"
REQUIRED_SIZE = (160, 160)

try:
    face_detector = mtcnn.MTCNN()
    face_encoder = load_model(MODEL_PATH)
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    
@app.route('/generate-embedding', methods=['POST'])
def generate_embedding():
    if 'files' not in request.files:
        return jsonify({"error": "No files part in the request"}), 400
    
    files = request.files.getlist('files')
    if not files:
        return jsonify({"error": "No files uploaded"}), 400
    
    vectors = []
    
    for file in files:
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        
        if img is None:
            continue
        
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        results = face_detector.detect_faces(img_rgb)
        if not results:
            continue
    
        # closest image
        res = max(results, lkey=lambda b: b['box'][2] * b['box'][3])
        face, _, _ = get_face(img_rgb, res['box'])
        
        # preprocess face
        face = normalize(face)
        face = cv2.resize(face, REQUIRED_SIZE)
        
        # predict embedding
        vector = face_encoder.predict(
            np.expand_dims(face, axis=0),
            verbose=0
        )[0]
        
        vectors.append(vector)
    
    if len(vectors) == 0:
        return jsonify({"success": False, "error": "No valid faces found in the uploaded images"}), 400
    
    avg_vector = np.mean(vectors, axis=0)
    final_embedding = l2_normalizer.transform(
        np.expand_dims(avg_vector, axis=0)
    )[0]
    
    # convert to list for JSON serialization
    return jsonify({
        "success": True,
        "embedding": final_embedding.tolist()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)