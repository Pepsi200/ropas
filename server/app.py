from flask import Flask, request, jsonify
from flask_cors import CORS
from tinydb import TinyDB, Query

app = Flask(__name__)
CORS(app)

db = TinyDB('contactos.json')


@app.route('/contacto', methods=['POST'])
def contacto():
    data = request.get_json()
    nombre = data.get('nombre', '')
    email = data.get('email', '')
    mensaje = data.get('mensaje', '')
    if not nombre or not email or not mensaje:
        return jsonify({'mensaje': 'Faltan datos'}), 400
    db.insert({'nombre': nombre, 'email': email, 'mensaje': mensaje})
    return jsonify({'mensaje': '¡Mensaje recibido!'})


@app.route('/mensajes', methods=['GET'])
def ver_mensajes():
    mensajes = db.all()
    return jsonify(mensajes)


@app.route('/mensajes/<int:idx>', methods=['DELETE'])
def eliminar_mensaje(idx):
    mensajes = db.all()
    if 0 <= idx < len(mensajes):
        db.remove(doc_ids=[mensajes[idx].doc_id])
        return jsonify({'ok': True})
    return jsonify({'ok': False, 'error': 'No encontrado'}), 404


@app.route('/', methods=['GET'])
def home():
    return 'Backend Flask + MongoDB funcionando', 200


if __name__ == '__main__':
    app.run(debug=True)
