from datetime import datetime
from ..extensions import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, nullable=False) 
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    author = db.relationship('User', backref=db.backref('reviews', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'place_id': self.place_id,
            'content': self.content,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            'author': {
                'id': self.author.id,
                'nickname': self.author.nickname
            },
        }
