import json
from http.server import BaseHTTPRequestHandler,HTTPServer

#
# menu = [{'name': "Личный кабинет", 'href': '#'},
#         {'name': "Каталог", 'submenu': [{'name': "Один", 'href': '#'},
#                                         {'name': "Два", 'href': '#'},
#                                         {'name': "Три", 'href': '#'},
#                                         {'name': "А тут много",'submenu': [{'name': "Много Один", 'href': '#'},
#                                                                            {'name': "Много Два", 'href': '#'},
#                                                                            {'name': "Много Три", 'href': '#'}]
#                                          }
#                                         ]
#          },
#         {'name': "Промоакции",  'submenu': [{'name': "ПромоОдин", 'href': '#'},
#                                             {'name': "ПромоДва", 'href': '#'},
#                                             {'name': "ПромоТри", 'href': '#'}]
#          }]


#galery = [{'preview' :'путь миниатюра', 'href': 'Ссылка на полноразмерную картинку'}, ]
galery = [{'preview': 'img/macro1preview.jpg', 'href': 'img/fullsize/macro1.jpg'},
          {'preview': 'img/macro2preview.jpg', 'href': 'img/fullsize/macro2.jpg'},
          {'preview': 'img/macro3preview.jpg', 'href': 'img/fullsize/macro3.jpg'},
          {'preview': 'img/macro4preview.jpg', 'href': 'img/fullsize/macro4.jpg'},
          {'preview': 'img/macro5preview.jpg', 'href': 'img/fullsize/macro5.jpg'},
          {'preview': 'img/macro6preview.jpg', 'href': 'img/fullsize/macro6.jpg'},
          {'preview': 'img/macro7preview.jpg', 'href': 'img/fullsize/macro7.jpg'},
          {'preview': 'img/macro8preview.jpg', 'href': 'img/fullsize/macro8.jpg'},
          {'preview': 'img/macro9preview.jpg', 'href': 'img/fullsize/macro9.jpg'}]




def getMenu():
    #***Генерация меню***
    menu = [{'name': "Личный кабинет", 'href': '#'},
            {'name': "Каталог", 'submenu': [{'name': "Один", 'href': '#'},
                                            {'name': "Два", 'href': '#'},
                                            {'name': "Три", 'href': '#'},
                                            {'name': "А тут много", 'submenu': [{'name': "Много Один", 'href': '#'},
                                                                                {'name': "Много Два", 'href': '#'},
                                                                                {'name': "Много Три", 'href': '#'}]
                                             }
                                            ]
             },
            {'name': "Промоакции", 'submenu': [{'name': "ПромоОдин", 'href': '#'},
                                               {'name': "ПромоДва", 'href': '#'},
                                               {'name': "ПромоТри", 'href': '#'}]
             }]

    return json.dumps(menu)

def getGalery():
    galery = [{'preview': 'img/macro1preview.jpg', 'href': 'img/fullsize/macro1.jpg'},
              {'preview': 'img/macro2preview.jpg', 'href': 'img/fullsize/macro2.jpg'},
              {'preview': 'img/macro3preview.jpg', 'href': 'img/fullsize/macro3.jpg'},
              {'preview': 'img/macro4preview.jpg', 'href': 'img/fullsize/macro4.jpg'},
              {'preview': 'img/macro5preview.jpg', 'href': 'img/fullsize/macro5.jpg'},
              {'preview': 'img/macro6preview.jpg', 'href': 'img/fullsize/macro6.jpg'},
              {'preview': 'img/macro7preview.jpg', 'href': 'img/fullsize/macro7.jpg'},
              {'preview': 'img/macro8preview.jpg', 'href': 'img/fullsize/macro8.jpg'},
              {'preview': 'img/macro9preview.jpg', 'href': 'img/fullsize/macro9.jpg'}]
    return json.dumps(galery)


class HttpProcessor(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        if self.path == '/getMenu':
            data = getMenu()
        elif self.path == '/getGalery':
            data = getGalery()
        else:
            print(self.path)
            print('Unknown API')
            return 0
        self.send_header('content-type','application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(bytes(data, 'utf8'))



serv = HTTPServer(("localhost",8000),HttpProcessor)
serv.serve_forever()