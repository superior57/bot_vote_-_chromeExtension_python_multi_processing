import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from multiprocessing import Pool
# import requests

URL = 'https://party.pl/newsy/oto-nowe-pokolenie-gwiazd-wybierz-debiut-roku-2020-w-naszym-plebiscycie-881-r28/'
driver = ""
cnt_num = 5
deadline = 1000 * 60 * 60 * 24 * 4

  

def selenium_work():
  driver = webdriver.Chrome('driver_85/chromedriver')  
  driver.get(URL)  
  time.sleep(deadline)


def work_log(work):
  # soup_work()
  selenium_work()

def getList():
  res = []
  for i in range(cnt_num):
    res.append("1")
  return res

def main() :
  # print(getList())
  with Pool(cnt_num) as p:
    p.map(work_log, getList())
  

if __name__ == "__main__":
    main()

