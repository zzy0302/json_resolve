#fixjson.py
import os
import re
import json
import time
from lxml import etree 
import random
import requests
import threading
# import download_img
heads = { 'Connection': 'Keep-Alive','Accept': 'text/html, application/xhtml+xml, */*','Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3','Accept-Encoding': 'gzip, deflate','User-Agent': 'Mozilla/6.1 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'}
with open('films.json','r',encoding='UTF-8') as f:
    l = f.read()
    j = json.loads(l)
    # print(j[0])
    for i in range(len(j)):
        time.sleep(random.random())
        try:
            r = requests.get(j[i]['poster'])
            r.raise_for_status()
        except Exception as e:
            try:
                r = requests.get('https://movie.douban.com/subject/' + j[i]['_id'],headers=heads)
                # html = etree.HTML(str(r.content))
                html = etree.parse(r.content)
                print("?")
                result = html.xpath('//img')
                # with open ('html.txt','w+') as nf:
                #     nf.write(html)

                # img_url = html.xpath('nbgnbg')
                print(result)
                # img = re.findall('<img(.*?)(src)=\"(?!.*?logo).*',html,re.S|re.M)
                # print(r.content)
            except Exception as e:
                print(e)
    # print(r.raise_for_status()==None)
    # if i['title']=='异形大战银河猎人 Alien vs. Hunter':
    #     url = i['poster']
    #     print(url)
    #     r = requests.get(url)
    #     print(r.raise_for_status()==None)
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

    # failed.append(j[2])
    # failed.append(j[44])
    # print(json.dumps(failed))
    # print(j[0]['poster'])



    # j=[]

    # with open ('new.json','w+') as newf:
    #     newf.writelines(json.dumps(j))
# os.remove('films.json')
# os.rename('new.json', 'films.json')