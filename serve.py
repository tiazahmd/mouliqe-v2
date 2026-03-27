import http.server, os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if '.' not in os.path.basename(self.path) and self.path != '/':
            test = self.path.rstrip('/') + '.html'
            if os.path.isfile(self.translate_path(test)):
                self.path = test
        super().do_GET()

http.server.HTTPServer(('', 8000), CleanURLHandler).serve_forever()
