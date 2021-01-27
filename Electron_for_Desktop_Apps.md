# Electron 강좌 (Udemy)

- https://samsungu.udemy.com/ 으로 드가면 들을 수 있음.

- https://samsungu.udemy.com/course/electron-react-tutorial/learn/lecture/6986540?start=0#content

## Basic of Electron

- 플랫폼. 데스크톱 앱을 만들기 위함.
- 웹 앱은 최근들어 굉장하게 복잡해졌다. Electron은 이러한 특성을 데스크톱 앱에서 사용하기 위해 등장한 플랫폼이라고 보면 됨.
- 기본적으로 생각해야할 부분은 웹 브라우저는 유저의 하드디스크에 접근이 불가능하다는 것. 이러한 제약을 풀어주는 것이 Electron 이라는 플랫폼이라고 생각하면 된다.
  - 사용자의 컴퓨터 리소스에 접근 가능하게 된다는 점이 핵심!!
- Electron === Google Chrome (Mostly..)
  - Task Manager를 보면 Google Chrome Helper라는 놈이 여러개가 같이 존재함. 이것을 이해하면 Electron을 이해하는 데에 도움이 된다.
  - 왜 다른 프로세스가 같이 도는가?
    - 같이 죽지 않게 하기 위해. 랜더링 이슈를 막기 위해. Isolate 시키기 위해.
    - RendererProcess가 핵심임. 이 프로세스가 웹페이지를 그린다.
    - IPC(Inter Process Communication)을 통해 MainWindow, RendererProcess들이 통신한다.
    - 웹브라우저와 다른 점은, 웹브라우저의 주소표시줄과 같은 완전 브라우저 자체의 내용까지도 접근이 가능하다는 점.
- Electron의 역사(?)
  - GitHub -> Electron -> Atom (지금은 VS Code가 먹었지만..)
  - GitHub는 처음에 Atom을 위해 Electron을 만들었고(Atom은 JS 유저가 많아 JS로 만들었다 함), 이것이 쓸만하다고 판단해서 Open Source로 만들었음
  - 이것을 Slack, Discord, VS Code 등에서 사용하기 시작했다.

## Handling Electron Project

- Electron (Run at terminal, Overall Chrome Process로 생각) -> Create MainWindow(BrowserWindow) -> index.html을 로딩.
  - BrowserWindow를 생성하는 로직 또한 js로 작성한다는 점! (타 언어 사용 0%)
- Step by Step Guide
  - npm init
  - package.json 생성
  - npm install --save electron
  - 2 파일 생성 필요. init을 위한 js 과 보여줄 index.html
  - init을 위한 js는 터미널에서 실행된다. node를 통해.. 여기서는 require만 사용 가능
    - const electron = require('electron');
    - import는 node에서 기본적으로 지원되진 않음.
  - 