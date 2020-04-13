import os
import shutil 

class Config:

    # MYSQL_USER = 'root'  # 数据库用户名
    # MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD') or 'fnnzald'  # 数据库密码
    # MYSQL_HOST = 'localhost'  # ip or host
    # MYSQL_PORT = 3306  # 数据库端口
    # MYSQL_DATABASE = 'AiTx'  # 数据库名称
    LITE_APP_DATA =  os.getenv('LITE_APP_DATA')  if  os.getenv('LITE_BUY_DB_PATH') else os.path.join(os.getenv('APPDATA'), 'lite_buy_data')
    STD_SQLITE_FILE = os.path.abspath('./buy.sqlite')
    SQLITE_FILE = os.path.join(LITE_APP_DATA,'buy.sqlite')
    STATIC_PATH = os.path.join(LITE_APP_DATA, 'static')
    UPLOAD_PATH = os.path.join(STATIC_PATH, 'upload')

print(Config.SQLITE_FILE)

if not os.path.exists(Config.LITE_APP_DATA):
    os.mkdir(Config.LITE_APP_DATA)

if not os.path.exists(Config.SQLITE_FILE):
    shutil.copy(Config.STD_SQLITE_FILE, Config.SQLITE_FILE)

if not os.path.exists(Config.STATIC_PATH):
    os.mkdir(Config.STATIC_PATH)

if not os.path.exists(Config.UPLOAD_PATH):
    os.mkdir(Config.UPLOAD_PATH)