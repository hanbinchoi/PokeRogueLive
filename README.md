# 🌟 PokeRogueLive

포켓로그 라이브는 포켓몬의 능력치 계산과 대미지 상성 분석, 포켓몬 팀 구성 최적화 등 다양한 기능을 제공하는 웹 애플리케이션입니다. 포켓몬을 기반으로 한 전략과 시뮬레이션을 돕기 위해 설계된 포켓로그 라이브는 포켓몬 팬들과 트레이너들에게 필수적인 도구를 제공합니다.



<br>

## 🚩 프로젝트 개요

- **프로젝트 명** : PokeRogue Live
- **진행 기간** : 24.07.12 ~ 24.01.15
- **서비스 URL** : [PokeRogue Live 바로가기](https://grow-story.vercel.app/)
- **notion** : [프로젝트 노션 바로가기](https://careful-salad-60e.notion.site/PokeRogueLive-63371f0670c04bfab93df686ff5da016)
- **figma** : [figma 바로가기](https://www.figma.com/proto/kCWsDTO1WctUZlCiyfMGed/PokeRogueLive?node-id=0-1&t=F2efG7hoaKdp9k0b-1)




<br>

## 📜 주요 기능

1. 포켓몬 도감
   모든 포켓몬 정보를 확인할 수 있는 페이지입니다. 사용자는 검색창에 포켓몬 이름을 입력하거나 드롭다운 메뉴를 통해 원하는 포켓몬을 검색할 수 있습니다. 상세 페이지를 통해 포켓몬의 기본 능력치, 타입, 기술 목록, 도구 등을 확인할 수 있습니다.

2. 타입 계산기
   타입 상성에 기반하여 공격 혹은 방어 측 포켓몬의 피해 배율을 구할 수 있습니다. 타입 뿐만 아니라 타입 상성에 영향을 끼치는 특성, 기술 등을 체크할 수 있습니다.

3. 위력 계산기
   공격 측 포켓몬과 방어 측 포켓몬 사이의 스탯을 기반으로 기술의 위력을 시뮬레이션 할 수 있습니다. 데미지 결과에 영향을 끼치는 다양한 요소들을 선택하며 눈으로 확인해볼 수 있습니다.




<br>

## 🛠️ 기술 스택

- 프론트엔드: React, Next.js, TypeScript

- 스타일링: Tailwind CSS

- 상태 관리: zustand

- 데이터 요청: Axios, Tanstack Query

- 테스트: Cypress




<br>

## 🖥 구현 이미지

| 페이지 (기능)         | 이미지                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 홈                  | ![홈](https://github.com/user-attachments/assets/407ff976-9273-48bb-b9f6-0ef5f4e5abee)                  |
| 포켓몬 도감 (목록)              | ![pokemon-desktop-1](https://github.com/user-attachments/assets/fd8c619b-3e20-42d1-b24c-0f75f3684443)              |
| 포켓몬 도감 (상세)          | ![pokemon-desktop-3](https://github.com/user-attachments/assets/ab92b184-04cb-45e1-ab34-757bdb49e5a9)            |
| 타입 계산기 (방어)    | ![type-desktop-1](https://github.com/user-attachments/assets/695472fd-73c3-4e3f-a60f-016e927beee2)           |
| 타입 계산기 (공격) | ![type-desktop-2](https://github.com/user-attachments/assets/5c7825fe-9fd3-4e53-bbd0-b7025672c4ac) |
| 위력 계산기        | ![power-desktop-2](https://github.com/user-attachments/assets/ef01b0bb-2e44-4e09-9cce-8c5928a49f6e)      |






<br>

## 🤙 컨벤션

<details>
  <summary><h4>📌 Issue</h4></summary>
  
  1. 제목
    
  - 작업 내용에 따라 컨벤션에 맞추어 적절한 커밋 접두사(prefix) 사용
  - 자신이 작업한 내용을 한 눈에 파악하기 쉽도록 명사형으로 작성
    
```
Feat: OOO 컴포넌트 구현
```

2. 내용

   ## Abstracts

   - 간략하게 할 일에 대한 설명을 작성해주세요.

   ## To Do

   - [ ] 구현할 기능 1
   - [ ] 구현할 기능 2

   ## ETC

   - 추가적인 안내 사항이 있다면 작성해주세요.

</details>

<details>
  <summary><h4>📌 Commit</h4></summary>

1. 작업 내용에 따라 컨벤션에 맞추어 적절한 커밋 접두사(prefix) 사용
2. 커밋 메시지 내용 작성
```
  Conf: 초기 환경 설정 
```
| 접두사        | 설명                           |
| ------------- | ------------------------------ |
| Feat :     | 새로운 기능 구현               |
| Add :      | 에셋 파일 추가                 |
| Fix :      | 버그 수정                      |
| Docs :     | 문서 추가 및 수정              |
| Style :    | 스타일링 작업                  |
| Refactor : | 코드 리팩토링 (동작 변경 없음) |
| Test :     | 테스트                         |
| Deploy :   | 배포                           |
| Conf :     | 빌드, 환경 설정                |
| Chore :    | 기타 작업                      |

</details>

<details>
  <summary><h4>📌 Pull Request</h4></summary>

1. 제목

- 작업 내용에 따라 컨벤션에 맞추어 적절한 커밋 접두사(prefix) 사용
- 자신이 작업한 내용을 한 눈에 파악하기 쉽도록 명사형으로 작성

```
 Feat: OOO 컴포넌트 구현
```

2. 내용

   ## Title

   - 제목은 'Feat: OOO 컴포넌트 구현'과 같이 작성합니다.

   ## PR Type

   - [ ] FEAT: 새로운 기능 구현
   - [ ] ADD : 에셋 파일 추가
   - [ ] FIX: 버그 수정
   - [ ] DOCS: 문서 추가 및 수정
   - [ ] STYLE: 포맷팅 변경
   - [ ] REFACTOR: 코드 리팩토링
   - [ ] TEST: 테스트 관련
   - [ ] DEPLOY: 배포 관련
   - [ ] CONF: 빌드, 환경 설정
   - [ ] CHORE: 기타 작업

   ## Abstracts

   - 작업 내용에 대해 간략하게 설명을 작성해주세요.

   ## Description

   - 구체적인 작업 내용을 작성해주세요.
   - 이미지를 별도로 첨부하면 더 좋습니다 👍

   ## Discussion

   - 추후 논의할 점에 대해 작성해주세요.

   ***

   Close #1
   (작성한 Issue를 연결해주세요.)

</details>
