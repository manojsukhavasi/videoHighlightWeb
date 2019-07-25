import argparse, os, requests
from collections import defaultdict

from search import search

#OUTPUT_FOLDER='./static/stream/'
OUTPUT_FOLDER='./stream/'
def create_text_file(clip_names, fname):
    out_file = f'{OUTPUT_FOLDER}{fname}.txt'
    # Allowing only 10 clips
    clip_names = clip_names[:10]
    with open(out_file, 'w') as f:
        f.write('\n'.join([f'file {fn}' for fn in clip_names]))
    
    return out_file


def get_highlights(batsman, bowler, shot, ball_type, runs, wicket):
    """
    Summary: Returns the path of the compiled highlights video

    Parameters:
    batsman(str): Name of the batsman
    bowler(str) : Name of the bowler
    shot(str): Type of shot played
    ball_type(str): Ball type
    runs(str): Runs
    wicket(bool): true or false, None for no value

    Returns:
    'out_video_path': Path to the combined highlight video clip
    """

    filters = defaultdict()
    fname = ''

    if batsman:
        filters['batsman'] = batsman
        fname += batsman
    else:
        filters['batsman'] = ''

    if bowler:
        filters['bowler'] = bowler
        fname += bowler
    else:
        filters['bowler'] = ''

    if shot:
        filters['shot'] = shot
        fname += shot
    else:
        filters['shot'] = ''

    if ball_type:
        filters['ball_type'] = ball_type
        fname += ball_type
    else:
        filters['ball_type'] = ''

    if runs:
        filters['runs'] = runs
        fname += runs
    else:
        filters['runs'] = ''

    if wicket:
        filters['wicket']=True
        fname += 'wicket'
    else:
        filters['wicket']=None

    print(filters)
    fname = fname.strip()
    out_video_path = f'{OUTPUT_FOLDER}{fname}.mp4'

    if (os.path.isfile(out_video_path)):
        print('File already exists')
    else:
        clip_names = search(filters)
        txt_file = create_text_file(clip_names, fname)
        os.system(f'ffmpeg -f concat -safe 0 -i {txt_file} -c copy {out_video_path}')
        print(f'File created at {out_video_path}')

    return f'stream/{fname}.mp4'

def badmintonHighlightsFunction(inputUrl, email):
    URL = 'http://35.199.152.210:5000'
    PARAMS={'url': inputUrl,
            'start_time': '00:05:00',
            'duration': '00:04:00' ,
            'email': email
            } 
    r = requests.get(url = URL, params = PARAMS)
    return 'Done'

def tennisHighlightsFunction(inputUrl, startTime, endTime):
    return "http://www.youtube.com/watch?v=JdTBIHX-r0M"


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Generates highlights for cricket videos')
    parser.add_argument('-b', '--batsman', help='Cricinfo link for the commentary')
    parser.add_argument('-l', '--bowler', help='Cricinfo link for the commentary')
    parser.add_argument('-s', '--shot', help='CSV file to write the data')
    parser.add_argument('-t', '--ball_type', help='Corodinates for the over position')
    parser.add_argument('-r', '--runs', help='First innings commentary for last over.')
    parser.add_argument('-w', '--wicket', help='Wickets included or not, 0 for no 1 for yes')

    args = parser.parse_args()

    get_highlights(args.batsman, args.bowler, args.shot, args.ball_type, args.runs, args.wicket)
