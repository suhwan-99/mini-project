from flask import Blueprint, request, jsonify
from ..extensions import trav

import pandas as pd

bp = Blueprint('api', __name__)

@bp.post('/recommend')
def recommend_trip():
  data = request.get_json()
  X = pd.DataFrame([data])
  proba = trav.predict_proba(X)[0]
  classes = trav.named_steps['knn'].classes_
  order = proba.argsort()[::-1][:3]
  top3 = [ { 'label' : classes[i] } for i in order ]
  return jsonify({'ok': True, 'top3' : top3})