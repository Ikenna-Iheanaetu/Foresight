from flask import Flask, jsonify, Blueprint, request
import pandas as pd 
from sklearn.preprocessing import LabelEncoder
import pickle
import os

hepatitis_bp = Blueprint("hepatitis", __name__)
data = pd.read_csv("data/hepatitis.csv")
# data = pd.read_excel("")
features = ["itching", "joint_pain", "vomiting", "fatigue", "lethargy", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes", "malaise", "muscle_pain", "family_history", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding"]
target = "prognosis"

# convert the target to a numerical variable
le = LabelEncoder()
data[target] = le.fit(data[target])

# define the model folder 
models_folder = "Model"

# loading the Malaria Model
model_filename_malaria_sickness = os.path.join(models_folder, "General Sickness.pkl")
with open(model_filename_malaria_sickness, "rb") as model_file:
    malaria_model = pickle.load(model_file)

@hepatitis_bp.route("/", methods=["POST"])
def hepatitis():
    try:
        # Get the input request from the frontend
        input_data = request.get_json(force=True)
        input_features = input_data["resultArray"]

        # Structuring input data
        input_dataframe = pd.DataFrame([input_features], columns=features)

        # Make predictions with the model
        predictions = model.predict(input_dataframe)

        # Convert the prediction to the original label using inverse_transform
        prediction_label = le.inverse_transform([int(predictions)])

        # The response
        response = {
            "predictions": prediction_label[0]
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)})


