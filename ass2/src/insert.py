import json
import pymysql
f = open('qwq.json','r',encoding='UTF-8')
l = f.read()
j = json.loads(l)
f.close()
# print(list(j[i].keys()))
try:
    db = pymysql.connect("localhost","webass3","zheshimima","webdb" )
    cursor = db.cursor()
    for i in range(len(j)):
        j[i]['_id'] = int(j[i]['_id'])
        j[i]['directors'] = j[i]['directors'][i]['name']
        j[i]['casts'] = '  '.join([i['name'] for i in j[i]['casts']])
        j[i]['countries'] = j[i]['countries'][i]
        j[i]['duration'] = int(j[i]['duration'])
        j[i]['genres'] = ' '.join([i for i in j[i]['genres']])
        j[i]['languages'] = j[i]['languages'][i]
        j[i]['pubdate'] = j[i]['pubdate'][i]
        j[i]['rating'] = float(j[i]['rating']['average'])
        # print(j[i], end = '\n')
        # print(j[i]['title'],j[i]['_id'],j[i]['poster'],j[i]['casts'],j[i]['countries'],j[i]['directors'],j[i]['duration'],\
        #     j[i]['genres'],j[i]['languages'],j[i]['pubdate'],j[i]['rating'],j[i]['summary'],j[i]['year'])
        cursor.execute('insert into filmstable ( movie_name, movie_id, movie_poster, movie_casts, movie_countries, \
                        movie_directors, movie_duration, movie_genres, movie_languages, movie_pubdate, movie_rating, \
                        movie_summary, movie_year )  values ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',\
                        [j[i]['title'],j[i]['_id'],j[i]['poster'],j[i]['casts'],j[i]['countries'],j[i]['directors'],j[i]['duration'],\
                        j[i]['genres'],j[i]['languages'],j[i]['pubdate'],j[i]['rating'],j[i]['summary'],j[i]['year']])
    db.commit()
    db.close()
except Exception as e:
    print(e)