import db


class Article:
    ''' reference container for article in db '''

    def __init__(self, id):
        self.id = id

    def create_db_article(self, url, source, text):
        ''' json for creating article entry in database '''
        articleinfo = {
            'id': self.id,
            'url': url,
            'source': source,
            'text': text
        }
        db.article_db.insert_one(articleinfo)

    def query_db_article(self):
        ''' return article as json '''
        return db.MongoJSONEncoder().encode(
            db.article_db.find_one(
                {'id': self.id}
            )
        )