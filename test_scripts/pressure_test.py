import requests
from time import strftime, gmtime
import time
import datetime
from random import randint

url = "http://127.0.0.1:8080/post_pressure"

while (True):
    payload = {
        "time":strftime("%H:%M:%S", gmtime()),
        "date":strftime("%Y/%b/%d", gmtime()),
        "pressure":randint(100, 1000)
    }

    r = requests.post(url, data=payload)
    print(r.status_code, r.reason)
    time.sleep(1)
