#fixjson.py
import os
import json
import time
import requests
import threading
import download_img
f = open('films.json','r')
l = f.read()
j = json.loads(l)
# headers={"Host":"www.douban.com",\
#         "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0",\
#         "Accept-Language":"zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3",\
#         "Accept-Encoding":"gzip, deflate",\
#         "Connection":"keep-alive"}
for i in range(len(j)):
    time.sleep(3)
    # url = i['poster']
    # print(url)
    try:
        r = requests.get(j[i]['poster'])
        r.raise_for_status()
    except Exception as e:
        print(i,j[i]['poster'])
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