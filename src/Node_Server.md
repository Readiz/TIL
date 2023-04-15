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

## nginx 서버
- micro API들을 reverse proxy를 통해 하부 api 단위로 접근 가능하도록 한다.
- ex) http://t.readiz.com:6080/test?a=b
   -> http://t.readiz.com/api/test?a=b

## /
- Index이자 진입점
- 각 하부 micro API들을 fork 하여 여러 프로세스로 동작 시킨다.

## /api
- UI(svelte) 등에서 호출하는 micro api

## /static
- UI(svelte)의 결과물을 포함하여 static으로 serve 되는 page. reverse proxy에 80번 포트로 할당됨. 하위 페이지를 다른 UI Framework를 사용가능하게 할지는 추후 확인 필요.

### 고민해야 할 점
- 추후 react의 server side rendering 같은 방식이 필요할 지?
- 이를 지원하려면 서버단에서 어떻게 구현이 되어야 할지? (아직 모름)
