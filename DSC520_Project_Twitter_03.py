import tweepy
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
import time
import json
import os
# import os.path
# import fnmatch
# from subprocess import Popen
# import csv
import re
import matplotlib.pyplot as plt
import multiprocessing
from multiprocessing import Pool
from multiprocessing import Process, Manager
import pandas as pd
import math
from functools import partial
from wordcloud import WordCloud


#Variables that contains the user credentials to access Twitter API
access_token = "454702756-ub9UgTwTkhckeaiXpJUivelHdG1Rb7VqhtnNkMLv"
access_token_secret = "l1UVcbnQfoKWDuTaRfHpnqAUtUQyzXRrwpddiTybKNYbm"
consumer_key = "gJSb6sH5fOzCMuBbPXsJ6psdI"
consumer_secret = "WzWd8PtA7Am1FAGBm2rYpEKYHQPcy2iCR5pQAph3SBUd8qpe56"

tf_setup = '/Users/ekinezgi/Documents/UmassD/DSC520/Project/TwitterSetup.txt'
fsetup = open(tf_setup)
line = json.loads( fsetup.readline() )
tf_word = line["f_word"]
tf_stopword = line["f_stopword"]


Sf_save_sec = line["f_save_sec"]
Sf_max = line["t_max"]
Sf_save_num = line["f_save_num"]

tfscr_name = line['tscr_name']
tf_filter = line["t_filter"].split(',')
# StdOutListener.tf_filter = line["t_filter"].split(',')

tf_text = line["f_text"]
tf_datapath = line['f_datapath']

tf_stopword = line["f_stopword"]
tf_maxfontsize = line["maxfontsize"]

fsetup.close()
with open(tf_setup, 'r+') as fsetup:
    fsetup_line = json.load(fsetup)
    fsetup_line["t_number"] = 0

    fsetup.seek(0)
    fsetup.write(json.dumps(fsetup_line))
    fsetup.truncate()

ft_save = open(tf_text,'w')       ## Get new tweets



class StdOutListener(StreamListener):
    def __init__(self, api=None):
        super(StdOutListener, self).__init__()
        self.num_alltweets = 0
        self.num_print = 2
        self.count = 0
        self.tstart = time.time()
        print( tf_filter, Sf_max, Sf_save_num, Sf_save_sec, tf_text)
        
    def on_status(self, status):
        self.num_alltweets += 1
        self.count += 1
        
        if self.num_alltweets <= Sf_max :
            ft_save.write(status.text+'\n')
            
            time_past = (time.time() - self.tstart)
            
            if self.count >= Sf_save_num or time_past > Sf_save_sec :
                print('self.count',self.count,'Sf_save_num',Sf_save_num,
                      'time_past',time_past,'Sf_save_sec',Sf_save_sec)
                self.count = 0
                self.tstart = time.time()
                
                tf_filter_str = '_'.join(map(str, tf_filter))
                createWordFile(self.num_alltweets, 'F_'+ tf_filter_str )
            return True
        else:
            print("Time limit or Max Tweet Recieved")
            return False

    def on_error(self, status):
        print('on_error(self, status):', status,self )
        return True





#start replaceTwoOrMore
def replaceTwoOrMore(s):
    #look for 2 or more repetitions of character and replace with the character itself
    pattern = re.compile(r"(.)\1{1,}", re.DOTALL)
    return pattern.sub(r"\1\1", s)
#end

#start getStopWordList
def getStopWordList(stopWordListFileName):
    #read the stopwords file and build a list
    stopWords = []
    stopWords.append('AT_USER')
    stopWords.append('URL')
    stopWords.append('RT')

    fp = open(stopWordListFileName, 'r')
    line = fp.readline()
    while line:
        word = line.strip()
        stopWords.append(word)
        line = fp.readline()
    fp.close()
    return stopWords
#end

#start process_tweet
def processTweet(stopWords,line ):
    try:
        tweet = line.strip()
    except:
        return
    
    WordList=''
    
    #Convert to lower case
    tweet = tweet.lower()
    #Convert www.* or https?://* to URL
    tweet = re.sub('((www\.[^\s]+)|(https?://[^\s]+))','URL',tweet)
    #Convert @username to AT_USER
    tweet = re.sub('@[^\s]+','AT_USER',tweet)
    #Remove additional white spaces
    tweet = re.sub('[\s]+', ' ', tweet)
    #Replace #word with word
    tweet = re.sub(r'#([^\s]+)', r'\1', tweet)
    #trim
    tweet = tweet.strip('\'"')
    #split tweet into words
    words = tweet.split()
    
    for w in words:
        #replace two or more with two occurrences
        w = replaceTwoOrMore(w)
        #strip punctuation
        w = w.strip('\'"?,.')
        #check if the word stats with an alphabet
        val = re.search(r"^[a-zA-Z][a-zA-Z0-9]*$", w)
        #ignore if it is a stop word
        
        if(w in stopWords or val is None):
            continue
        else:
            WordList = WordList +  w.lower() + ','

        if WordList == None:
            WordList =''

        if WordList[:-1].endswith(','):
            WordList = WordList[:-1]
        
    return WordList


def getTweetsByScreenName(api):
    ft_save = open(tf_text,'w') 
    
    u_newtweets =  api.user_timeline(screen_name = tfscr_name, count = 200)
    u_lasttw_id = u_newtweets[-1].id - 1
    
    tw_tot = 0
    for tw in u_newtweets:
        tw_tot +=1
        ft_save.write(tw.text+'\n')
    createWordFile(tw_tot, 'U_'+tfscr_name )
    
    while  len(u_newtweets) > 0:
        u_newtweets =  api.user_timeline(
                screen_name = tfscr_name, count = 200, max_id=u_lasttw_id)

        if (len(u_newtweets) > 0) :
            for tw in u_newtweets:
                tw_tot +=1
                ft_save.write(tw.text+'\n')

            createWordFile(tw_tot, 'U_'+tfscr_name )
            
            u_lasttw_id = u_newtweets[-1].id - 1
            print("Downloaded Tweet Number :", tw_tot )
    
    ft_save.close() 
    return(tw_tot)


def createWordFile(tw_tot, filterORscrname):
#   Print tw_tot total tweet number to setup file
    with open(tf_setup, 'r+') as fsetup:
        fsetup_line = json.load(fsetup)
        fsetup_line["t_number"] = tw_tot

        fsetup.seek(0)
        fsetup.write(json.dumps(fsetup_line))
        fsetup.truncate()
        
    stopWords = getStopWordList(tf_stopword)
    
    pool = multiprocessing.Pool(4)
    part_func = partial(processTweet, stopWords)
    with open(tf_text) as source_file:
        result = pool.map(part_func, source_file,4)

    pool.close()
    pool.join()

    
    
    WordListAll ={}
    for text in result:
        if text is not None:
            for word in text.split(","):
                if word != "":
                    if word in WordListAll:
                        WordListAll[word] +=1
                    else:
                        WordListAll[word] = 1
                        

    df = pd.DataFrame(list(WordListAll.items()), columns=['word', 'size'])
    df.sort_values(['size'], ascending=[False], inplace = True)
    
    df_top = df.head(30)

    f_min = 25
    f_max = 35
    w_min = df_top['size'].min().astype(int)
    w_max = df_top['size'].max().astype(int)

    df_top['weight'] = ( ( ( f_min + ( (df_top['size'] - w_min)  / 
                        (w_max - w_min) ) * (f_max -f_min) ) / 8 ) ** 3 ).apply(math.ceil) 
    
    dlist = df_top.to_json(orient='records')   
    open(tf_word,"w").writelines(dlist)   

    timestr = time.strftime("%Y%m%d_%H%M%S")
    os.system('cp '+ tf_word + ' ' + tf_datapath + 
              'tw_'+filterORscrname+ '_' + timestr + '_words.txt')

    os.system('cp '+ tf_text + ' ' + tf_datapath + 
              'tw_'+filterORscrname+ '_' + timestr + '_tweets.txt')

    
    # Generate a word cloud image  the matplotlib way:
    WordListAll_text = " ".join(str(x) for x in result)

#     wordcloud = WordCloud(max_font_size=40).generate( WordListAll_text )
    wordcloud = WordCloud().generate( WordListAll_text )

    plt.imshow(wordcloud)
    plt.axis("off")
    plt.title('Number of tweets : ' + str(tw_tot) ,  fontsize=20)


    plt.savefig( tf_datapath + 'tw_'+filterORscrname+ '_' + 
                timestr + '.png', bbox_inches='tight' )

    plt.close('all')
    print('WordCloud done' ,tw_tot)
        


def getTweetsByTrack():
    #This handles Twitter authetification and the connection to Twitter Streaming API
    try:
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        if tfscr_name != '' :
            api = tweepy.API(auth)                  ## Get all tweeets for give tfscr_name on the setup file 
            tw_tot = getTweetsByScreenName(api)
#             createWordFile(tw_tot, 'U_'+tfscr_name )
        else:
#             ft_save = open(tf_text,'a')       
            l = StdOutListener()                 ## Get new tweets
            stream = Stream(auth, l)
            if tf_filter == ['']:
                stream.sample()        
            else:
                stream.filter(track = tf_filter )
            ft_save.close()
    except KeyboardInterrupt:
        print("Keyboard interrupt")


if __name__ == '__main__':
    start = time.time()

    
    getTweetsByTrack()

    end = time.time()
    print(end - start) 

