
from app.handler.file import *
from app import controller

kind_bp = Blueprint(name='kinds', import_name='kinds', url_prefix='')


class KindHandler(easyapi.FlaskBaseHandler):
    __controller__ = controller.KindController


easyapi.register_api(app=kind_bp, view=KindHandler, endpoint='kind_api', url='/kinds')



company_bp = Blueprint(name='companys', import_name='companys', url_prefix='')


class CompanyHandler(easyapi.FlaskBaseHandler):
    __controller__ = controller.CompanyController


easyapi.register_api(app=company_bp, view=CompanyHandler, endpoint='company_api', url='/companys')




results_bp = Blueprint(name='retuls', import_name='retuls', url_prefix='')


class ResultHandler(easyapi.FlaskBaseHandler):
    __controller__ = controller.ResultController


easyapi.register_api(app=results_bp, view=ResultHandler, endpoint='result_api', url='/results')




experts_bp = Blueprint(name='experts', import_name='experts', url_prefix='')


class ExpertHandler(easyapi.FlaskBaseHandler):
    __controller__ = controller.ExpertController


easyapi.register_api(app=experts_bp, view=ExpertHandler, endpoint='expert_api', url='/experts')




productions_bp = Blueprint(name='productions', import_name='productions', url_prefix='')


class ProductionHandler(easyapi.FlaskBaseHandler):
    __controller__ = controller.ProductionController


easyapi.register_api(app=productions_bp, view=ProductionHandler, endpoint='production_api', url='/productions')




employments_bp = Blueprint(name='employments', import_name='employments', url_prefix='')


class EmploymentHandler(easyapi.FlaskBaseHandler):
    __controller__ = controller.EmploymentController


easyapi.register_api(app=employments_bp, view=EmploymentHandler, endpoint='employment_api', url='/employments')