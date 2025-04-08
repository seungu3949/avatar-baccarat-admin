/**
 * 아바타 바카라 관리자 페이지 JavaScript
 * 게임 결과 제어 및 베팅 한도 설정 기능 구현
 */

// 상태 변수 초기화
let gameState = {
    result: null, // 'banker', 'player', 'tie'
    bankerPair: false,
    playerPair: false,
    gameInProgress: false,
    countdown: 15,
    gameHistory: []
};

// DOM 요소 참조
const resultButtons = document.querySelectorAll('.result-btn');
const pairButtons = document.querySelectorAll('.pair-btn');
const selectedResultDisplay = document.getElementById('selected-result');
const bankerPairIndicator = document.getElementById('banker-pair-indicator');
const playerPairIndicator = document.getElementById('player-pair-indicator');
const winnerDisplay = document.getElementById('winner-display');
const updateLimitsButton = document.getElementById('update-limits');
const limitsConfirmation = document.getElementById('limits-confirmation');
const countdownDisplay = document.getElementById('countdown');
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');
const themeToggle = document.getElementById('theme-toggle');
const resultConfirmModal = document.getElementById('result-confirm-modal');
const modalResult = document.getElementById('modal-result');
const confirmResultBtn = document.getElementById('confirm-result');
const cancelResultBtn = document.getElementById('cancel-result');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const cancelLoginBtn = document.getElementById('cancel-login');
const submitLoginBtn = document.getElementById('submit-login');
const userDisplay = document.getElementById('user-display');

// 로그인 상태
let isLoggedIn = false;
let currentUser = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 결과 버튼 이벤트 핸들러 설정
    setupResultButtons();
    
    // 페어 버튼 이벤트 핸들러 설정
    setupPairButtons();
    
    // 베팅 한도 업데이트 버튼 이벤트 핸들러 설정
    setupUpdateLimitsButton();
    
    // 언어 선택 드롭다운 설정
    setupLanguageToggle();
    
    // 테마 토글 설정
    setupThemeToggle();
    
    // 결과 확인 모달 설정
    setupResultConfirmModal();
    
    // 로그인 모달 설정
    setupLoginModal();
    
    // 카드 시뮬레이션 설정
    setupCardSimulation();
    
    // 시뮬레이션 통계 데이터 업데이트 (예시로 매 5초마다 업데이트)
    setInterval(updateSimulationStats, 5000);
});

/**
 * 결과 버튼 이벤트 핸들러 설정
 */
function setupResultButtons() {
    resultButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 기존 활성화된 버튼 비활성화
            resultButtons.forEach(btn => btn.classList.remove('active-button'));
            
            // 클릭한 버튼 활성화
            button.classList.add('active-button');
            
            // 게임 상태 업데이트
            if (button.id === 'banker-win') {
                gameState.result = 'banker';
            } else if (button.id === 'player-win') {
                gameState.result = 'player';
            } else if (button.id === 'tie-win') {
                gameState.result = 'tie';
            }
            
            // UI 업데이트
            updateGameStateDisplay();
            updateSelectedResultDisplay();
            
            // 결과 확인 모달 표시
            showResultConfirmModal();
        });
    });
}

/**
 * 페어 버튼 이벤트 핸들러 설정
 */
function setupPairButtons() {
    pairButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 토글 기능 구현
            button.classList.toggle('pair-active');
            
            // 게임 상태 업데이트
            if (button.id === 'banker-pair') {
                gameState.bankerPair = button.classList.contains('pair-active');
            } else if (button.id === 'player-pair') {
                gameState.playerPair = button.classList.contains('pair-active');
            }
            
            // UI 업데이트
            updateGameStateDisplay();
            updateSelectedResultDisplay();
        });
    });
}

/**
 * 베팅 한도 업데이트 버튼 이벤트 핸들러 설정
 */
function setupUpdateLimitsButton() {
    updateLimitsButton.addEventListener('click', () => {
        const minBetInput = document.getElementById('min-bet');
        const maxBetInput = document.getElementById('max-bet');
        const minBetError = document.getElementById('min-bet-error');
        const maxBetError = document.getElementById('max-bet-error');
        
        // 입력값 검증
        let isValid = validateBetInputs(minBetInput, maxBetInput, minBetError, maxBetError);
        
        // 유효성 검사 통과 시 확인 메시지 표시
        if (isValid) {
            showConfirmationMessage(minBetInput.value, maxBetInput.value);
        }
    });
}

/**
 * 언어 선택 드롭다운 설정
 */
function setupLanguageToggle() {
    languageToggle.addEventListener('click', () => {
        languageDropdown.classList.toggle('hidden');
    });
    
    // 언어 옵션 클릭 이벤트
    document.querySelectorAll('[data-lang]').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            languageToggle.querySelector('span').textContent = lang.toUpperCase();
            languageDropdown.classList.add('hidden');
            
            // TODO: 실제 언어 변경 로직 구현
            console.log(`언어 변경: ${lang}`);
        });
    });
    
    // 다른 곳 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!languageToggle.contains(e.target)) {
            languageDropdown.classList.add('hidden');
        }
    });
}

/**
 * 테마 토글 설정
 */
function setupThemeToggle() {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // 아이콘 변경
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    });
}

/**
 * 결과 확인 모달 설정
 */
function setupResultConfirmModal() {
    // 모달 열기 함수는 showResultConfirmModal 함수에서 처리
    
    // 확인 버튼 클릭
    confirmResultBtn.addEventListener('click', () => {
        resultConfirmModal.classList.add('hidden');
        
        // 게임 진행 상태로 변경
        gameState.gameInProgress = true;
        
        // 카드 플립 애니메이션 시작
        flipCards();
        
        // 카운트다운 시작
        startCountdown();
        
        // 게임 기록에 추가
        addToGameHistory();
    });
    
    // 취소 버튼 클릭
    cancelResultBtn.addEventListener('click', () => {
        resultConfirmModal.classList.add('hidden');
    });
    
    // 모달 영역 외 클릭 시 닫기
    resultConfirmModal.addEventListener('click', (e) => {
        if (e.target === resultConfirmModal) {
            resultConfirmModal.classList.add('hidden');
        }
    });
}

/**
 * 카드 시뮬레이션 설정
 */
function setupCardSimulation() {
    // 초기 카드 상태 설정
    const bankerCard = document.querySelector('.banker-card');
    const playerCard = document.querySelector('.player-card');
    
    if (bankerCard && playerCard) {
        // 초기 카드 상태는 뒷면이 보이는 상태
        bankerCard.classList.remove('flipped');
        playerCard.classList.remove('flipped');
    }
}

/**
 * 카드 플립 애니메이션
 */
function flipCards() {
    const bankerCard = document.querySelector('.banker-card');
    const playerCard = document.querySelector('.player-card');
    
    if (bankerCard && playerCard) {
        // 카드 앞면에 값 설정 (실제 구현에서는 서버에서 받은 값으로 설정)
        const bankerCardFront = bankerCard.querySelector('.card-front');
        const playerCardFront = playerCard.querySelector('.card-front');
        
        // 예시 값
        if (gameState.result === 'banker') {
            bankerCardFront.textContent = '9';
            playerCardFront.textContent = '8';
        } else if (gameState.result === 'player') {
            bankerCardFront.textContent = '7';
            playerCardFront.textContent = '9';
        } else {
            bankerCardFront.textContent = '9';
            playerCardFront.textContent = '9';
        }
        
        // 약간의 딜레이 후 카드 뒤집기
        setTimeout(() => {
            bankerCard.classList.add('flipped');
        }, 500);
        
        setTimeout(() => {
            playerCard.classList.add('flipped');
        }, 1000);
    }
}

/**
 * 카운트다운 시작
 */
function startCountdown() {
    gameState.countdown = 15;
    updateCountdownDisplay();
    
    const interval = setInterval(() => {
        gameState.countdown -= 1;
        updateCountdownDisplay();
        
        if (gameState.countdown <= 0) {
            clearInterval(interval);
            resetGameState();
        }
    }, 1000);
}

/**
 * 카운트다운 표시 업데이트
 */
function updateCountdownDisplay() {
    if (countdownDisplay) {
        const minutes = Math.floor(gameState.countdown / 60);
        const seconds = gameState.countdown % 60;
        countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

/**
 * 게임 상태 초기화
 */
function resetGameState() {
    gameState.gameInProgress = false;
    
    // 카드 초기화
    const bankerCard = document.querySelector('.banker-card');
    const playerCard = document.querySelector('.player-card');
    
    if (bankerCard && playerCard) {
        bankerCard.classList.remove('flipped');
        playerCard.classList.remove('flipped');
    }
    
    // 카운트다운 초기화
    gameState.countdown = 15;
    updateCountdownDisplay();
}

/**
 * 게임 기록에 추가
 */
function addToGameHistory() {
    // 현재 시간
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // 임의의 베팅 액수 (실제 구현에서는 서버에서 받은 값으로 설정)
    const betAmount = Math.floor(Math.random() * 2000000) + 500000;
    
    // 게임 ID (실제 구현에서는 서버에서 받은 값으로 설정)
    const gameId = '#' + (12345 + gameState.gameHistory.length + 1);
    
    // 게임 기록 객체
    const gameRecord = {
        id: gameId,
        result: gameState.result,
        bankerPair: gameState.bankerPair,
        playerPair: gameState.playerPair,
        time: timeString,
        betAmount: betAmount
    };
    
    // 기록 배열에 추가
    gameState.gameHistory.unshift(gameRecord);
    
    // UI 업데이트 (실제 구현에서는 이 부분을 더 상세하게 구현)
    // 이 예제에서는 생략
}

/**
 * 시뮬레이션 통계 데이터 업데이트
 */
function updateSimulationStats() {
    // 임의의 데이터 생성 (실제 구현에서는 서버에서 받은 값으로 설정)
    const playerCount = Math.floor(Math.random() * 20) + 20;
    document.getElementById('current-players').textContent = playerCount;
    
    const totalBets = Math.floor(Math.random() * 10000000) + 5000000;
    document.getElementById('total-bets').textContent = '₩' + totalBets.toLocaleString('ko-KR');
    
    const bankerRatio = Math.floor(Math.random() * 30) + 40;
    const playerRatio = 100 - bankerRatio;
    document.getElementById('betting-ratio').textContent = `${bankerRatio}% / ${playerRatio}%`;
    
    // 비율 바 업데이트
    const ratioBar = document.querySelector('.bg-gradient-to-r');
    if (ratioBar) {
        ratioBar.style.width = `${bankerRatio}%`;
    }
}

/**
 * 결과 확인 모달 표시
 */
function showResultConfirmModal() {
    if (gameState.result) {
        // 모달에 선택된 결과 표시
        modalResult.textContent = selectedResultDisplay.textContent;
        
        // 모달 표시
        resultConfirmModal.classList.remove('hidden');
        resultConfirmModal.classList.add('flex');
    }
}

/**
 * 베팅 입력값 검증
 * @param {HTMLElement} minBetInput - 최소 베팅 입력 요소
 * @param {HTMLElement} maxBetInput - 최대 베팅 입력 요소
 * @param {HTMLElement} minBetError - 최소 베팅 오류 메시지 요소
 * @param {HTMLElement} maxBetError - 최대 베팅 오류 메시지 요소
 * @returns {boolean} - 검증 결과
 */
function validateBetInputs(minBetInput, maxBetInput, minBetError, maxBetError) {
    let isValid = true;
    
    // 최소 베팅 검증
    if (minBetInput.value === '' || isNaN(minBetInput.value) || Number(minBetInput.value) < 0) {
        minBetError.classList.remove('hidden');
        isValid = false;
    } else {
        minBetError.classList.add('hidden');
    }
    
    // 최대 베팅 검증
    if (maxBetInput.value === '' || isNaN(maxBetInput.value) || Number(maxBetInput.value) < 0) {
        maxBetError.classList.remove('hidden');
        isValid = false;
    } else {
        maxBetError.classList.add('hidden');
    }
    
    // 최소 베팅이 최대 베팅보다 큰 경우
    if (isValid && Number(minBetInput.value) > Number(maxBetInput.value)) {
        maxBetError.classList.remove('hidden');
        maxBetError.textContent = '최대 베팅은 최소 베팅보다 커야 합니다';
        isValid = false;
    }
    
    return isValid;
}

/**
 * 확인 메시지 표시
 * @param {string} minBet - 최소 베팅 값
 * @param {string} maxBet - 최대 베팅 값
 */
function showConfirmationMessage(minBet, maxBet) {
    const formattedMinBet = Number(minBet).toLocaleString('ko-KR');
    const formattedMaxBet = Number(maxBet).toLocaleString('ko-KR');
    
    limitsConfirmation.innerHTML = `<div class="flex items-center">
        <i data-lucide="check-circle" class="w-4 h-4 mr-2"></i>
        베팅 한도가 업데이트되었습니다: 최소 ${formattedMinBet}원, 최대 ${formattedMaxBet}원
    </div>`;
    
    lucide.createIcons({
        icons: {
            'check-circle': limitsConfirmation.querySelector('[data-lucide="check-circle"]')
        }
    });
    
    limitsConfirmation.classList.remove('hidden');
    limitsConfirmation.classList.add('fade-in');
    
    // 3초 후 확인 메시지 숨기기
    setTimeout(() => {
        limitsConfirmation.classList.remove('fade-in');
        limitsConfirmation.classList.add('hidden');
    }, 3000);
}

/**
 * 선택된 결과 표시 업데이트
 */
function updateSelectedResultDisplay() {
    let resultText = '선택된 결과가 없습니다';
    
    if (gameState.result) {
        if (gameState.result === 'banker') {
            resultText = '뱅커 승 (Banker Win)';
        } else if (gameState.result === 'player') {
            resultText = '플레이어 승 (Player Win)';
        } else if (gameState.result === 'tie') {
            resultText = '타이 (Tie)';
        }
        
        // 페어 정보 추가
        const pairTexts = [];
        if (gameState.bankerPair) {
            pairTexts.push('뱅커 페어 (Banker Pair)');
        }
        if (gameState.playerPair) {
            pairTexts.push('플레이어 페어 (Player Pair)');
        }
        
        if (pairTexts.length > 0) {
            resultText += ' + ' + pairTexts.join(' + ');
        }
    }
    
    selectedResultDisplay.textContent = resultText;
}

/**
 * 게임 상태 표시 업데이트
 */
function updateGameStateDisplay() {
    // 페어 표시 업데이트
    bankerPairIndicator.classList.toggle('hidden', !gameState.bankerPair);
    playerPairIndicator.classList.toggle('hidden', !gameState.playerPair);
    
    // 승자 표시 업데이트
    if (gameState.result) {
        // 기존 클래스 제거
        winnerDisplay.classList.remove('banker-win', 'player-win', 'tie-win');
        
        if (gameState.result === 'banker') {
            winnerDisplay.textContent = '뱅커 승! (Banker Win)';
            winnerDisplay.classList.add('banker-win');
        } else if (gameState.result === 'player') {
            winnerDisplay.textContent = '플레이어 승! (Player Win)';
            winnerDisplay.classList.add('player-win');
        } else if (gameState.result === 'tie') {
            winnerDisplay.textContent = '타이! (Tie)';
            winnerDisplay.classList.add('tie-win');
        }
    } else {
        winnerDisplay.textContent = '결과를 선택해 주세요';
        winnerDisplay.classList.remove('banker-win', 'player-win', 'tie-win');
    }
}

/**
 * 로그인 모달 설정
 */
function setupLoginModal() {
    // 로그인 버튼 클릭
    loginBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
        loginModal.classList.add('flex');
    });
    
    // 취소 버튼 클릭
    cancelLoginBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
    });
    
    // 로그인 제출 버튼 클릭
    submitLoginBtn.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 간단한 검증 (실제 구현에서는 서버 인증 필요)
        if (username && password) {
            // 로그인 성공 처리
            isLoggedIn = true;
            currentUser = username;
            userDisplay.textContent = username;
            
            // 모달 닫기
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            
            // 입력 필드 초기화
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            
            // 로그인 성공 메시지 표시
            showNotification('로그인 성공', 'success');
        } else {
            // 로그인 실패 처리
            showNotification('사용자 이름과 비밀번호를 입력해주세요', 'error');
        }
    });
    
    // 모달 영역 외 클릭 시 닫기
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
        }
    });
}

/**
 * 알림 메시지 표시
 * @param {string} message - 표시할 메시지
 * @param {string} type - 메시지 타입 ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 fade-in`;
    
    // 타입에 따른 스타일 설정
    if (type === 'success') {
        notification.classList.add('bg-green-900', 'text-green-300', 'border', 'border-green-700');
    } else if (type === 'error') {
        notification.classList.add('bg-red-900', 'text-red-300', 'border', 'border-red-700');
    } else {
        notification.classList.add('bg-blue-900', 'text-blue-300', 'border', 'border-blue-700');
    }
    
    // 메시지 설정
    notification.innerHTML = `
        <div class="flex items-center">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" class="w-5 h-5 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 아이콘 초기화
    lucide.createIcons({
        icons: {
            [type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info']: notification.querySelector('[data-lucide]')
        }
    });
    
    // 알림 추가
    document.body.appendChild(notification);
    
    // 3초 후 알림 제거
    setTimeout(() => {
        notification.classList.remove('fade-in');
        notification.classList.add('fade-out');
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
} 