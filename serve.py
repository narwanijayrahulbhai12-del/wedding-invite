# Run:  python3 serve.py   then open http://localhost:8000
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-cache'); super().end_headers()
socketserver.TCPServer.allow_reuse_address=True
print('Open http://localhost:8000')
socketserver.TCPServer(('',8000),H).serve_forever()
