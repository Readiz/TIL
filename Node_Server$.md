# Node Server 설계
- 스스로 만들어가는 Node 서버..
- Notebook 서버의 전체적 구조를 개선, Python 최소화. 유지보수도 어렵고.. 트랜드에 안맞음
- 내 나름대로 규칙을 정해서 구현하는 것이 나중에 확장하기에도 편할 듯
- Serverless?

## Ground rule
- Using Express.js
- 서버는 서비스로 구현
  - 당연히 죽고나면 Restart...
- 각자의 Micro service는 각자의 영역만을 담당.
  - Micro service는 별도의 서비스 혹은 fork 하여 동작시킨다.

## /api
- UI(svelte) 등에서 호출하는 micro api

## /page
- UI(svelte)의 결과물을 볼 수 있는 page. 하위 페이지를 다른 UI Framework를 사용가능하게 할지는 추후 확인 필요.
