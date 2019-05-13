import json
import pymysql
f = open('qwq.json','r',encoding='UTF-8')
l = f.read()
j = json.loads(l)
f.close()
f = open('insert.sql','w+',encoding='UTF-8')
# print(list(j[i].keys()))
# try:
    # db = pymysql.connect("localhost","webass3","zheshimima","webdb" )
    # cursor = db.cursor()
for i in range(len(j)):
    # print(j[i])
    j[i]['title'] = j[i]['title'].replace('"','\\"').replace("'","\\'")
    j[i]['_id'] = int(j[i]['_id'])
    if j[i]['directors']:
        # print('?')
        j[i]['directors'] = j[i]['directors'][0]['name'].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['directors'] = ''
    if j[i]['casts']:
        j[i]['casts'] = '  '.join([x['name'] for x in j[i]['casts']]).replace('"','\\"').replace("'","\\'")
    else:
        j[i]['casts'] = ''
    if j[i]['countries']:
        j[i]['countries'] = j[i]['countries'][0].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['countries'] = ''
    if j[i]['duration']:
        j[i]['duration'] = (j[i]['duration']).replace('"','\\"').replace("'","\\'")
    else:
        j[i]['duration'] = ''
    if j[i]['genres']:
        j[i]['genres'] = ' '.join([x for x in j[i]['genres']]).replace('"','\\"').replace("'","\\'")
    else:
        j[i]['genres'] = ''
    if j[i]['languages']:
        j[i]['languages'] = j[i]['languages'][0].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['languages'] = ''
    if j[i]['pubdate']:
        j[i]['pubdate'] = j[i]['pubdate'][0].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['pubdate'] = ''
    if j[i]['rating']['average']:
        j[i]['rating'] = j[i]['rating']['average'].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['rating'] = ''
    if j[i]['summary']:
        j[i]['summary'] = j[i]['summary'].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['summary'] = ''
    if j[i]['year']:
        j[i]['year'] = j[i]['year'].replace('"','\\"').replace("'","\\'")
    else:
        j[i]['year'] = ''
    print(i)
    # print(j[0])
    # print(j[i], end = '\n')
    # print(j[i]['title'],j[i]['_id'],j[i]['poster'],j[i]['casts'],j[i]['countries'],j[i]['directors'],j[i]['duration'],\
    #     j[i]['genres'],j[i]['languages'],j[i]['pubdate'],j[i]['rating'],j[i]['summary'],j[i]['year'])
    print('insert into filmstable ( movie_name, movie_id, movie_poster, movie_casts, movie_countries, movie_directors, movie_duration, movie_genres, movie_languages, movie_pubdate, movie_rating, movie_summary, movie_year )  values ( "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s");'%(\
                    j[i]['title'],j[i]['_id'],j[i]['poster'],j[i]['casts'],j[i]['countries'],j[i]['directors'],j[i]['duration'],\
                    j[i]['genres'],j[i]['languages'],j[i]['pubdate'],j[i]['rating'],j[i]['summary'],j[i]['year']),file=f,end='\n')

#     cursor.execute('insert into filmstable ( movie_name, movie_id, movie_poster, movie_casts, movie_countries, \
#                     movie_directors, movie_duration, movie_genres, movie_languages, movie_pubdate, movie_rating, \
#                     movie_summary, movie_year )  values ( "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s")'%(\
#                     j[i]['title'],j[i]['_id'],j[i]['poster'],j[i]['casts'],j[i]['countries'],j[i]['directors'],j[i]['duration'],\
#                     j[i]['genres'],j[i]['languages'],j[i]['pubdate'],j[i]['rating'],j[i]['summary'],j[i]['year']))
# db.commit()
# db.close()
f.close()
# except Exception as e:
#     f.close()
#     print(e)