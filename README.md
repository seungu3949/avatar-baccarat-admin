# 아바타 바카라 관리자 시스템

바카라 게임 관리를 위한 관리자 대시보드 시스템입니다.

## 주요 기능

- 실시간 게임 결과 제어
- 베팅 한도 설정
- 게임 기록 관리
- 통계 분석
- 사용자 관리
- 백업 및 복구
- 다크/라이트 모드 지원
- 다국어 지원 (한국어, 영어, 중국어)

## 기술 스택

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Chart.js
- WebSocket
- Lucide Icons

## 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/yourusername/avatar-baccarat-admin.git
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

## 환경 설정

1. `.env` 파일 생성
2. 필요한 환경 변수 설정:
   - `API_URL`
   - `WS_URL`
   - `AUTH_SECRET`

## 배포

```bash
npm run build
```

## 라이선스

MIT License 