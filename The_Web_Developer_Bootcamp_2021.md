# 웹 개발자 Bootcamp 정리 (with VS Code)

- https://samsungu.udemy.com/ 으로 드가면 들을 수 있음.

- https://samsungu.udemy.com/course/the-web-developer-bootcamp/learn/lecture/22553936?start=93#overview

- 고수들도 HTML Boilerplate 쓴다.. 나한테 맞는거 하나 만들어 두는게 좋을 것 같다.

- CSS: 형용사(Adjectives) / JS: 동사(Verbs) / HTML: 명사(Nouns)

- MDN: 개발자들이 만든 비공식 스펙 사이트.

- lorem*10 하고 탭 누르면 더미 문장을 넣을 수 있다.

- ! 치고 탭 누르면 VS Code에서 제공하는 기본 boilerplate를 제공해준다.

- Ctrl + Shift + P 누르고 Formatter 누르면 자동 포멧팅 도구 사용 가능. (설정 바꿔서 저장할 때 적용되게 할 수도 있음)

- ol / ul (Ordered List / Unordered List)

- Alt + Shift + Down -> 그 줄 복사해서 아래로 내림
  - Alt + Down -> 그 줄을 내림

- HTML Entity: &lt; 같은 것을 이야기 함.

- Emmet : div > ul > li 같이 써놓고 emmet 쓰면 자동으로 그 구조를 만들어 준다.

- CSS: Cascading Style Sheets
  - MDN도 잘 되어 있다.
  - Cascading은 ID / class / specifity 등의 순서대로 속성이 중첩되어 적용된다는 의미
  - ID (백의 자리), class(십의 자리), 특정성(일의 자리)의 순서로 강력한 컨셉이라고 생각하면 됨.
    - ID로 선택한 경우 이 항목에 color와 같은 것을 먹이면 :active 와 같은 pseudo class 역시 무시되어 버린다. (더 강한 속성이기 때문)
    - 따라서 이 경우 #ID의 #ID:active 까지 설정 해야 정상적으로 속성을 적용할 수 있다.

- Selector { property: value; }

- Inherit 기능이 내제되어 있지만, 모든 속성이 Inherit인 것은 아니다.
  - 강제로 Inherit 적용하고 싶으면 color: inherit 등으로 적용해서 사용

- pseudo
  - pseudo class
    - :active, :checked, :first, :first-child, :hover, :not(), :nth-child(), :nth-of-type()
    - 실제 class는 아닌데 마치 존재하는 class인 것처럼 행동함
  - pseudo element
    - ::after, ::before, ::first-letter, ::first-line, ::selection
    - 콜론(:)이 하나여도 크롬에서 인식이 되긴 하지만 원래는 두개짜리임. 두개짜리는 실제 값이 있는 것처럼 행동하므로 element임

- padding
  - top, right, down, left 의 순서임.