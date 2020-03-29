<!--
 * @Author: your name
 * @Date: 2020-03-26 16:40:29
 * @LastEditTime: 2020-03-26 23:22:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 
 * @FilePath: /buy_company/readme.md
 -->


新增公司

```
POST /companys HTTP/1.1
Host: 0.0.0.0:5000
Content-Type: application/json

{
	"name": "A 公司",
	"owner": "测试",
	"tele": "15311070339",
	"detail": "详情",
	"type": "采购",
	"production_kind": ["灯光", "舞台"]
}
```

# 仓库

github-me
|         | 
local-me   github-you
           |
           local-you


# a.txt b.txt

a.txt

```
3
```

b.txt
```
3
```

master : v1 -> v2 -> v3
dev   :         -> v3
	

在 master git pull dev

pr

master : v1 -> v2 -> v3 -> v4
dev   :         -> v3 -> v4 

dev: git pull master 




master : v1 -> v2 -> v3 -> v4 -> v6
dev   :         -> v3 -> v5  -> v6


dev : git pull master 

confict


github-me-master

github-me-dev

local-me-master

github -you -dev 


delteCompany(id).then((resp)=>{
	if (resp.data.code === 200) {
		this.fetchData()
	}
})