# Lucky Draw

이 프로젝트는 행사에 쓰기 위해 하루만에 간단 구현한 행운권 추첨 템플릿입니다.

## 시작하기

이 프로젝트를 시작하려면 아래의 단계를 따르세요.

### 필수 조건

- [Node.js](https://nodejs.org/) (최소 버전 14.x)
- [npm](https://www.npmjs.com/) (Node.js 설치 시 기본적으로 포함됨)

### 프로젝트 설정

1. 저장소를 클론합니다:

   ```sh
   git clone https://github.com/yourusername/lotto.git
   cd lotto
   ```

2. 의존성을 설치합니다:

   ```sh
   npm install
   ```

### 개발 모드에서 실행

개발 모드에서 애플리케이션을 실행하려면 다음 명령어를 입력하세요:

```sh
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하여 애플리케이션을 확인할 수 있습니다.

### 프로덕션 빌드

프로덕션 모드로 애플리케이션을 빌드하려면 다음 명령어를 입력하세요:

```sh
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 기능

- 사용자 지정 번호 범위 설정 (1부터 250까지)
- 추첨 기능
- 당첨자 확인 기능
- 직관적인 UI

## 기술 스택

- Vue 3
- Vite
- Tailwind CSS (스타일링)
