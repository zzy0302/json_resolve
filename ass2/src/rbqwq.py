import re
with open('html.txt','r') as f:
    raw=f.read()
    st='<img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1270935451.jpg" title="\xe7\x82\xb9\xe5\x87\xbb\xe7\x9c\x8b\xe6\x9b\xb4\xe5\xa4\x9a\xe6\xb5\xb7\xe6\x8a\xa5" '
    # print(re.findall('<img src="(.*?)"\ title="',st,re.S))
    img_url = re.findall('<img src="(.*?)"\ title="\xe7\x82\xb9\xe5\x87\xbb\xe7\x9c\x8b\xe6\x9b\xb4\xe5\xa4\x9a\xe6\xb5\xb7\xe6\x8a\xa5',raw,re.S)
    print(img_url)
    a='点'
    if a in raw:
        print('?')

    print(re.findall('\xe7\x82\xb9\xe5\x87\xbb\xe7\x9c\x8b\xe6\x9b\xb4\xe5\xa4\x9a\xe6\xb5\xb7\xe6\x8a\xa5',raw,re.S))
#<img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2360576246.webp" title="点击看更多海报" alt="Hombre" rel="v:image">
    