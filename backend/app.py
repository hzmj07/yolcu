from flask import Flask, jsonify, request

app = Flask(__name__)

# Basit bir GET isteği için örnek endpoint
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello from Flask!",
        "status": "success"
    }
    return jsonify(data)

# Basit bir POST isteği için örnek endpoint
@app.route('/api/data', methods=['POST'])
def post_data():
    received_data = request.json
    response = {
        "message": f"Data received: {received_data}",
        "status": "success"
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
