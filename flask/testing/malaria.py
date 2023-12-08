from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import Lasso
from sklearn.linear_model import Ridge
from sklearn.linear_model import LogisticRegression
import pandas as pd

data = pd.read_csv("data/malaria.csv")
# data = pd.read_excel("")
features = ["chills", "vomiting", "high_fever", "sweating", "headache", "nausea", "muscle_pain", "diarrhoea"]
target = "Disease"

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

# logistic regressor
logisticRegression= LogisticRegression()
logisticRegression.fit(X_train, y_train)
logisticRegression_score = logisticRegression.score(X_test, y_test)

# using Ridge
ridge_model = Ridge()
ridge_model.fit(X_train, y_train)
ridge_score = ridge_model.score(X_test, y_test)

from sklearn.metrics import mean_absolute_error

# make predictions
lasso_predictions = lasso.predict(X_test)

# calculate Mean Absolute Error
lasso_mae = mean_absolute_error(y_test, lasso_predictions)

# printing MAE
print("Lasso Mean Absolute Error:", lasso_mae)


# printing accuracy 
print("Random Forest Classifier:", rf_score)
print("Linear Regressor:", linear_score)
print("Decision Tree Regressor: ", dt_score)
print("KNeighborsRegressor: ", kn_score)
print("GradientBoostingRegressor: ", gb_score)
print("Lasso: ", lasso_score)
print("Logistic Regressor: ", logisticRegression_score)
print("Ridge: ", ridge_score)