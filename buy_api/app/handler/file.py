import os
import easyapi
from flask import Blueprint, request, jsonify, send_file
# from flask_jwt import jwt_required, current_identity
import app.controller as controller
from app.config import Config


file_bp = Blueprint(name='files', import_name='files', url_prefix='/files')

# 上传文件
@file_bp.route('/upload', methods=['POST'])  # 不写,methods=['GET','POST'] 默认是get
def file_upload():
    try:
        file = request.files['file']
        file_name = controller.FileController.upload(file=file, file_path=Config.UPLOAD_PATH)
    except easyapi.BusinessError as e:
        return jsonify(**{
            'msg': e.err_info,
            'code': e.code,
        }), e.http_code
    return jsonify(**{
        'msg': '上传成功',
        'code': 200,
        'file_name  ': file_name
    })

#下载文件
@file_bp.route('/download/<string:file_name>', methods=['GET'])
def file_download(file_name):
    """
    :param file_name: 文件名称 "**********.jpg"
    :return:
    """
    try:
        origin_file_path = os.path.join(Config.UPLOAD_PATH, file_name)
        return send_file(origin_file_path)  #向api返回文件
    except easyapi.BusinessError as e:
        return jsonify(**{
            'msg': e.err_info,
            'code': e.code,
        }), e.http_code

