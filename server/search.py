from elasticsearch import Elasticsearch
from elasticsearch_dsl import Document, Integer ,Text, Boolean, Keyword, Search, Index
from elasticsearch_dsl.connections import connections

client = Elasticsearch(hosts='localhost:9200')



def search(filters):

    s = Search(using=client, index='balls')

    if filters['wicket']:
        s = s.filter('term', wicket=True)
    if filters['runs']:
        s = s.filter('term', score=int(filters['runs']))
    if filters['batsman']:
        s = s.query('match', batsmen=filters['batsman'])
    if filters['bowler']:
        s = s.query('match', bowler=filters['bowler'])
    if filters['shot']:
        s = s.query('match', comment=filters['shot'])
    if filters['ball_type']:
        s = s.query('match', comment=filters['ball_type'])

    total = s.count()
    response = s[:total].execute()
    print(len(response.hits))
    fnames = []
    for hit in response:
        try:
            if (hit.fname):
                fnames.append(f'/mnt/disks/ipl_2019/output/match_{hit.match}/clips/{hit.fname}')
                print(f'{hit.over}.{hit.ball} {hit.bowler} to {hit.batsmen} {hit.score}, {hit.fname}')
        except:
            print(f'{hit.over}.{hit.ball} {hit.bowler} to {hit.batsmen} {hit.score}, {hit.comment}')
            pass

    return fnames
