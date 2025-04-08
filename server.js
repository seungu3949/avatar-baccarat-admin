require('dotenv').config();
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 정적 파일 서빙
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// WebSocket 서버 설정
const server = app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('새로운 클라이언트가 연결되었습니다.');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('받은 메시지:', data);
            
            // 모든 클라이언트에게 메시지 브로드캐스트
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error('메시지 처리 중 오류:', error);
        }
    });

    ws.on('close', () => {
        console.log('클라이언트 연결이 종료되었습니다.');
    });
}); 