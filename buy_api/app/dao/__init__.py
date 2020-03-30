import easyapi
from app.db import sqlite_db
from easyapi import EasyApiContext
import copy


class CompanyDao(easyapi.BusinessBaseDao):
    __tablename__ = 'companys'
    __db__ = sqlite_db
    
    @classmethod
    def formatter(cls, ctx: EasyApiContext , data: dict):
        data = super().formatter(ctx, data)
        new_data = {k:v for k, v in data.items()}
        new_data['production_kind'] = [k[1:-1] for k in  new_data.get('production_kind', '').split(',')]
        new_data['type'] = [k[1:-1] for k in  new_data.get('type', '').split(',')]
        new_data['imgs'] = [k[1:-1] for k in  new_data.get('imgs', '').split(',')]
        return new_data

    @classmethod
    def reformatter(cls, ctx: EasyApiContext , data: dict):
        data = super().reformatter(ctx, data)
        new_data = {k:v for k, v in data.items()}
        if 'production_kind' in new_data:
            new_data['production_kind'] = ','.join('|{}|'.format(k) for k in   new_data['production_kind'])
        if 'type' in new_data:
            new_data['type'] = ','.join('|{}|'.format(k) for k in   new_data['type'])
        if 'imgs' in new_data:
            new_data['imgs'] = ','.join('|{}|'.format(k) for k in   new_data['imgs'])
        return new_data

    

class KindDao(easyapi.BusinessBaseDao):
    __tablename__ = 'kinds'
    __db__ = sqlite_db

class ResultDao(easyapi.BusinessBaseDao):
    __tablename__ = 'results'
    __db__ = sqlite_db

