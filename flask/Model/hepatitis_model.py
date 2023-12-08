from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import accuracy_score
import pandas as pd
import pickle

# loading the datasets 
data = pd.read_csv("data/hepatitis.csv")

features = ["itching", "joint_pain", "vomiting", "fatigue", "lethargy", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes", "malaise", "muscle_pain", "family_history", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding"]
target = "prognosis"

X = data[features]
y = data[target]

# converting categorical target variable to numerical using LabelEncoder
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) 

kn_model = KNeighborsRegressor()
kn_model.fit(X_train, y_train)

# saving the model to a file using pickle
model_filename = "hepatitis.pkl"
with open (model_filename, "wb") as model_file:
    pickle.dump(kn_model, model_file)

print(f" KNeighborsRegressor has been saved to {model_filename}")

# load the model from the file
with open(model_filename, "rb") as model_file:
    loaded_kn_model = pickle.load(model_file)

# make predictions using the loaded model
y_pred_loaded = loaded_kn_model.predict(X_test)

# models accuracy
accuracy_loaded = accuracy_score(y_test, y_pred_loaded)
print(f"loaded KNeighbors accuracy model: {accuracy_loaded}")