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
with open('qwq.json','r',encoding='UTF-8') as f:
    l = f.read()
    j = json.loads(l)
    for i in range(201,len(j)):
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
                for img in html.find_all('img'):
                    if 'rel="v:image"' in str(img):
                        temp=str(img)
                        img_url = re.findall('src=\"(.*?)\"',temp,re.S|re.M)[0]
                        j[i]['poster']=img_url
            except Exception as e:
                print(e)
        if i % 100 == 0:
            print('Saving...',i)
            with open ('new.json','w+') as newf:
                newf.writelines(json.dumps(j))
            os.remove('qwq.json')
            os.rename('new.json', 'qwq.json')

# print(j[0]['title'])
# print(requests.get())
# failed=[]
# thread_number=500
# def foo(q):
#     global failed,j
#     for i in list(range(len(j)))[q::thread_number]:
#         try:
#             download_img.download(j[i]['poster'])
#             print(i,'successed')
        # except Exception as e:
        #     failed.append(j[i])
# thread_list=[]
# for i in list(range(thread_number)):
#     try:
#         # print(i)
#         t = threading.Thread(target=foo,args=(i,))
#         thread_list.append(t)
#         t.start()
#     except Exception as e:
#         pass
# for t in thread_list:
#     t.join()
# with open ('failed.json','w+') as nf:
#     nf.writelines(json.dumps(j))

