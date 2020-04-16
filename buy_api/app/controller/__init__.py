
from app import dao
import easyapi
from easyapi import EasyApiContext



class KindController(easyapi.BaseController):
    __dao__ = dao.KindDao


class CompanyController(easyapi.BaseController):
    __dao__ = dao.CompanyDao

    @classmethod
    def formatter(cls, ctx: EasyApiContext , data: dict):
        data = super().formatter(ctx, data)
        productions = []
        for production_id in data['productions']:
            productions.append(
                dao.ProductionDao.get(ctx=ctx, query={
                    "id": production_id
                })
            )
        data['productions'] = productions
        return data


class ResultController(easyapi.BaseController):
    __dao__ = dao.ResultDao

    @classmethod
    def formatter(cls, ctx: EasyApiContext , data: dict):
        data = super().formatter(ctx, data)
        data['company'] = dao.CompanyDao.get(ctx=ctx, query={
            "id": data["company_id"]
        })
        return data

class EmploymentController(easyapi.BaseController):
    __dao__ = dao.EmploymentDao

    @classmethod
    def formatter(cls, ctx: EasyApiContext , data: dict):
        data = super().formatter(ctx, data)
        data['expert'] = dao.ExpertDao.get(ctx=ctx, query={
            "id": data["expert_id"]
        })
        return data

class ProductionController(easyapi.BaseController):
    __dao__ = dao.ProductionDao

class ExpertController(easyapi.BaseController):
    __dao__ = dao.ExpertDao

from app.controller.file import *
