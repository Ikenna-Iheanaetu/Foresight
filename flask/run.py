from flask import Flask 
from routes.general import general_bp
from routes.hepatitis import hepatitis_bp
from routes.malaria import malaria_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(general_bp, url_prefix = "/api/v1/predict/general")
app.register_blueprint(hepatitis_bp, url_prefix = "/api/v1/predict/hepatitis")
app.register_blueprint(malaria_bp, url_prefix = "/api/v1/predict/malaria")

if __name__ =="__main__":
    app.run(debug = True)
