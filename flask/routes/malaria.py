from flask import Flask, jsonify, Blueprint, request
import pandas as pd 
from sklearn.preprocessing import LabelEncoder
import pickle
import os

malaria_bp = Blueprint("malaria", __name__)

data = pd.read_csv("data/malaria.csv")
# data = pd.read_excel("")
features = ["chills", "vomiting", "high_fever", "sweating", "headache", "nausea", "muscle_pain", "diarrhoea"]
target = "Disease"

# convert the target to a numerical variable
le = LabelEncoder()
data[target] = le.fit(data[target])

# define the model folder 
models_folder = "Model"

# loading Malaria Model
model_filename_malaria_sickness = os.path.join(models_folder, "malaria.pkl")
with open(model_filename_malaria_sickness, "rb") as model_file:
    malaria_model = pickle.load(model_file)

@malaria_bp.route("/", methods=["POST"])
def malaria():
    try:
        # Get the input request from the frontend
        input_data = request.get_json(force=True)
        input_features = input_data["resultArray"]

        # Structuring input data
        input_dataframe = pd.DataFrame([input_features], columns=features)

        # Make predictions with the model
        predictions = malaria_model.predict(input_dataframe)

        # Convert the prediction to the original label using inverse_transform
        prediction_label = le.inverse_transform([int(predictions)])

        # The response
        response = {
            "predictions": prediction_label[0]
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)})