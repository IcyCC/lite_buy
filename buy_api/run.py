from app import app
from flask_script import Manager


manager = Manager(app=app)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=10085, threaded=False, processes=1)
