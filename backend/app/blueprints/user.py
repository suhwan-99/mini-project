from flask import Blueprint,request, jsonify
from email_validator import validate_email, EmailNotValidError
from ..extensions import db
from ..models import User
from flask_login import login_user, login_required, current_user, logout_user

bp = Blueprint('user', __name__)

@bp.post('/signup')
def signup():
  data = request.get_json()
  username = data.get('username')
  password = data.get('password')
  email = data.get('email')
  nickname = data.get('nickname')

  if not username or not password or not email or not nickname:
    return jsonify({'ok' : False, 'message' : '아이디, 비번, 이메일, 닉네임은 필수 입력' }), 400

  try:
    validate_email(email)
  except EmailNotValidError as e:
    return jsonify({'ok' : False, 'message' : str(e) }), 400
  except Exception:
    return jsonify({'ok' : False, 'message' : '알 수 없는 오류 발생!' }), 400
  
  user = User(username = username, email = email , nickname = nickname)
  user.set_password(password)

  db.session.add(user)
  db.session.commit()
  
  return jsonify({ 'ok' : True, 'message' : '회원 가입 완료', 'user' : user.to_dict() }), 200

@bp.post('/check_id')
def check_id():
  data = request.get_json()
  username = data.get('id')
  user = db.session.query(User).filter(User.username == username).first()
  if(user):
    return jsonify({'ok': False, 'message' : '중복된 아이디입니다'}), 400
  return jsonify({'ok': True, 'message' : '사용 가능한 아이디입니다'}), 200

@bp.post('/check_nickname')
def check_nickname():
  data = request.get_json()
  nickname = data.get('nickname')
  user = db.session.query(User).filter(User.nickname == nickname).first()
  if(user):
    return jsonify({'ok': False, 'message' : '중복된 닉네임입니다'}), 400
  return jsonify({'ok': True, 'message' : '사용 가능한 닉네임입니다'}), 200


@bp.post('/login')
def login():
  data = request.get_json()
  username = data.get('username')
  password = data.get('password')
  if not username or not password:
    return jsonify({'ok' : False, 'message' : '아이디와 비번을 입력하세요.'}), 400
  
  user = db.session.query(User).filter(User.username == username).first()

  if not user or not user.check_password(password):
    return jsonify({'ok' : False , 'message' : '아이디 또는 비밀번호가 틀렸습니다'}), 400

  login_user(user)
  return jsonify({'ok' : True , 'message' : '로그인 성공', 'user': user.to_dict() }), 200

@bp.post('/logout')
@login_required
def logout():
  logout_user()
  return jsonify({'ok': True, 'message' : '로그아웃 성공'}), 200

@bp.put('/<user_id>')
@login_required
def edit_user(user_id):
  data = request.get_json()
  user = db.session.query(User).get(user_id)

  if not user:
    return jsonify({'ok': False, 'message': '사용자를 찾을 수 없습니다.'}), 404

  username = data.get('username')
  password = data.get('password')
  nickname = data.get('nickname')
  email = data.get('email')

  if not username or not email or not nickname:
    return jsonify({'ok' : False, 'message' : '빈 칸이 있으면 안됩니다.'}), 400
  
  user.username = username
  user.nickname = nickname
  user.email = email

  if password: 
    user.set_password(password)  

  db.session.commit()
  return jsonify({'ok' : True , 'message' : '수정 완료!', 'user': { 'id': user.id, 
                                                               'username': user.username, 
                                                               'nickname': user.nickname, 
                                                               'email': user.email}}), 200

@bp.delete('/<user_id>')
def delete_user(user_id):
  user = db.session.query(User).get(user_id)
  db.session.delete(user)
  db.session.commit()
  logout_user()
  return jsonify({'ok' : True, 'message' : '탈퇴 완료!'}), 200