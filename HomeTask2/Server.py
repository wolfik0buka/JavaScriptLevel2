import json

from http.server import BaseHTTPRequestHandler,HTTPServer


menu = [{'name': "Личный кабинет", 'href': '#'},
        {'name': "Каталог", 'submenu': [{'name': "Один", 'href': '#'},
                                        {'name': "Два", 'href': '#'},
                                        {'name': "Три", 'href': '#'},
                                        {'name': "А тут много",'submenu': [{'name': "Много Один", 'href': '#'},
                                                                           {'name': "Много Два", 'href': '#'},
                                                                           {'name': "Много Три", 'href': '#'}]
                                         }
                                        ]
         },
        {'name': "Промоакции",  'submenu': [{'name': "ПромоОдин", 'href': '#'},
                                            {'name': "ПромоДва", 'href': '#'},
                                            {'name': "ПромоТри", 'href': '#'}]
         }]
print (json.dumps(menu))

class HttpProcessor(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        if self.path == '/hello':

            self.send_header('content-type','application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(menu), 'utf8'))
            print(self.headers)
            print(self.path)
        else:
            print(self.path)
            print('Unknown API')


serv = HTTPServer(("localhost",8000),HttpProcessor)
serv.serve_forever()