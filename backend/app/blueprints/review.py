from flask import Blueprint,request, jsonify
from ..extensions import db
from ..models import Review
from flask_login import login_required, current_user

bp = Blueprint('review', __name__)

@bp.get('/<int:place_id>')
def get_rei(place_id):
  rei = Review.query.filter_by(place_id = place_id).order_by(Review.created_at.desc()).all()
  return jsonify([re.to_dict() for re in rei])

@bp.post('/<int:place_id>')
@login_required
def post_rei(place_id):
  data = request.get_json()
  content = data.get('content')

  if not content:
    return jsonify({'ok' : False, 'message' : '리뷰 내용을 입력하세요.'}), 400
  
  rei = Review(
    place_id=place_id,
    content=content,
    author_id=current_user.id
  )

  db.session.add(rei)
  db.session.commit()
  return jsonify({'ok': True, 'message': '리뷰 등록 완료', 'review': rei.to_dict()}), 200

@bp.delete('/<int:review_id>')
@login_required
def delete_rei(review_id):
    rei = Review.query.get(review_id)

    if not rei:
        return jsonify({'ok': False, 'message': '리뷰를 찾을 수 없습니다.'}), 400
    if rei.author_id != current_user.id:
        return jsonify({'ok': False, 'message': '삭제 권한이 없습니다.'}), 400

    db.session.delete(rei)
    db.session.commit()
    return jsonify({'ok': True, 'message': '리뷰가 삭제되었습니다.'}), 200