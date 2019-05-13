import json
import pymysql
f = open('qwq.json','r',encoding='UTF-8')
l = f.read()
j = json.loads(l)
f.close()
# print(list(j[0].keys()))
db = pymysql.connect("123.206.210.184","webass3","zheshimima","webdb" )
cursor = db.cursor()
cursor.execute('insert into filmstable values( %s)' % ('1'))
print("?")