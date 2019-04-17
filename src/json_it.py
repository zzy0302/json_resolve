import os
import json
with open('films.json','r') as f:
    l = f.readlines()
    j=[]
    for i in range(len(l)):
        try:
            j.append(json.loads(l[i][:-1]))
        except Exception:
            print('Not a standard json format')
    with open ('new.json','w+') as newf:
        newf.writelines(json.dumps(j))
os.remove('films.json')
os.rename('new.json', 'films.json')