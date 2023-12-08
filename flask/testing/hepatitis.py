from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import Lasso
from sklearn.linear_model import Ridge
import pandas as pd

data = pd.read_csv("data/hepatitis.csv")
# data = pd.read_excel("")
features = ["itching", "joint_pain", "vomiting", "fatigue", "lethargy", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine", "yellowing_of_eyes", "malaise", "muscle_pain", "family_history", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding"]
target = "prognosis"

X = data[features]
y = data[target]

# converting categorical target variable to numerical using LabelEncoder
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

# splitting the data into training and testing sets 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# using RandomForestClassifier 
rf_classifier = RandomForestClassifier()
rf_classifier.fit(X_train, y_train)
rf_score = rf_classifier.score(X_test, y_test)

# using LinearRegression
linear_model = LinearRegression()
linear_model.fit(X_train, y_train)
linear_score = linear_model.score(X_test, y_test)

# using Decision Tree Regressor
dt_model = DecisionTreeRegressor()
dt_model.fit(X_train, y_train)
dt_score = dt_model.score(X_test, y_test)

# using KNeighborsRegressor
kn_model = KNeighborsRegressor()
kn_model.fit(X_train, y_train)
kn_score = kn_model.score(X_test, y_test)

# using GradientBoostingRegressor
gb_model = GradientBoostingRegressor()
gb_model.fit(X_train, y_train)
gb_score = gb_model.score(X_test, y_test)

# using Lasso
lasso = Lasso()
lasso.fit(X_train, y_train)
lasso_score = lasso.score(X_test, y_test)

# using Ridge
ridge_model = Ridge()
ridge_model.fit(X_train, y_train)
ridge_score = ridge_model.score(X_test, y_test)

# printing accuracy 
print("Random Forest Classifier:", rf_score)
print("Linear Regressor:", linear_score)
print("Decision Tree Regressor: ", dt_score)
print("KNeighborsRegressor: ", kn_score)
print("GradientBoostingRegressor: ", gb_score)
print("Lasso: ", lasso_score)
print("Ridge: ", ridge_score)