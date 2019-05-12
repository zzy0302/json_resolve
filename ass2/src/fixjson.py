#fixjson.py
import os
import re
import json
import lxml
import time
import random
import requests
import threading
from bs4 import BeautifulSoup
heads = { 'Connection': 'Keep-Alive','Accept': 'text/html, application/xhtml+xml, */*','Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3','Accept-Encoding': 'gzip, deflate','User-Agent': 'Mozilla/6.1 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'}
f = open('qwq.json','r',encoding='UTF-8')
l = f.read()
j = json.loads(l)
f.close()
start_heap=2000
max_heap=4000
thread_number=10
thread_list=[]
def foo(q):
    global j
    for i in list(range(start_heap,max_heap))[q::thread_number]:
        print('Now on',i)
        try:
            r = requests.get(j[i]['poster'])
            r.raise_for_status()
        except Exception as e:
            try:
                print('Doing on',i)
                time.sleep(random.random())
                r = requests.get('https://movie.douban.com/subject/' + j[i]['_id'],headers=heads)
                html = BeautifulSoup(r.content,'lxml')
                j[i]['poster'] = html.find('img', {'rel':'v:image'})['src']
                print('Done',i)
            except Exception as e:
                print(e)
for i in list(range(thread_number)):
    try:
        t = threading.Thread(target=foo,args=(i,))
        thread_list.append(t)
        t.start()
    except Exception as e:
        pass
for t in thread_list:
    t.join()

# j = json.loads(l)
# for i in range(300,len(j)):
#     print('Now on',i)
#     try:
#         r = requests.get(j[i]['poster'])
#         r.raise_for_status()
#     except Exception as e:
#         try:
#             print('Doing on',i)
#             time.sleep(random.random())
#             r = requests.get('https://movie.douban.com/subject/' + j[i]['_id'],headers=heads)
#             html = BeautifulSoup(r.content,'lxml')
#             j[i]['poster'] = html.find('img', {'rel':'v:image'})['src']
#         except Exception as e:
#             print(e)
#     if (i + 1) % 100 == 0:
#         print('Saving...',i)

print('Saving...',max_heap)
with open ('new.json','w+') as newf:
    newf.writelines(json.dumps(j))
os.remove('qwq.json')
os.rename('new.json', 'qwq.json')
print('Saved')
