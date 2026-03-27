import http.server, os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        clean = self.path.split('?')[0].split('#')[0].rstrip('/')
        if clean == '/blog':
            self.path = '/blog/index.html'
        elif '.' not in os.path.basename(clean) and clean != '/':
            test = clean + '.html'
            if os.path.isfile(self.translate_path(test)):
                self.path = test
        super().do_GET()

http.server.HTTPServer(('', 8000), CleanURLHandler).serve_forever()
