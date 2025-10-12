from flask import Flask, jsonify
from .extensions import db, migrate, login_manager, cors
from .config import Config
from .models import User, Review
from flask_login import login_required
from flask_cors import CORS

def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)
  db.init_app(app)
  migrate.init_app(app, db)
  cors.init_app(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
  login_manager.init_app(app)

  from .blueprints.user import bp as user_bp
  from .blueprints.review import bp as review_bp
  from .blueprints.api import bp as api_bp

  app.register_blueprint(user_bp, url_prefix='/user')
  app.register_blueprint(review_bp, url_prefix='/review')
  app.register_blueprint(api_bp, url_prefix='/api')

  @login_manager.user_loader
  def load_user(user_id):
    return User.query.get(int(user_id))
  
  @login_manager.unauthorized_handler
  def unauthorized():
    return jsonify({ 'ok' : False, 'message': '인증되지 않은 사용자'}),401


  return app