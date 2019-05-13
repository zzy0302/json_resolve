import os
import cv2
import time
import numpy
import hashlib
import requests

def CheckIdenticalImages(img1, img2):
    image1=cv2.imread(img1)
    image2=cv2.imread(img2)
    if os.path.splitext(img1)[1]!=os.path.splitext(img2)[1]:
        return 0
    elif image1.shape!=image2.shape:
        return 0
    else:
        check=cv2.subtract(image1, image2)
        out=numpy.any(check)
        return out
def download(url):
    root = "./image/"
    path = root + url.split("/")[-1]
    try:
        if not os.path.exists(root):
            os.mkdir(root)
        if not os.path.exists(path):
            r = requests.get(url)
            r.raise_for_status()
            with open(path,"wb") as f: 
                f.write(r.content)
            # print(url.split("/")[-1]+"爬取完成")
            # os.popen('open '+path)  
        else:
            r = requests.get(url)
            r.raise_for_status()
            with open(path+'temp',"wb") as f: 
                f.write(r.content)
            if not CheckIdenticalImages(path+'temp',path):
                # print(url.split("/")[-1]+'文件已存在')
                os.remove(path+'temp')
            else:
                temp=''
                with open(path+'temp','rb') as f:
                    m = hashlib.md5()
                    tstr = f.read()
                    m.update(tstr)               
                    temp=m.hexdigest()
                os.rename(path+'temp', '.'.join(path.split('.')[:-1])+temp+'.'+path.split('.')[-1])
                # print('.'.join(path.split('.')[:-1])+temp+'.'+path.split('.')[-1]+"爬取完成")  
                # os.popen('open '+'.'.join(path.split('.')[:-1])+temp+'.'+path.split('.')[-1]) 
    except Exception as e:
        pass
