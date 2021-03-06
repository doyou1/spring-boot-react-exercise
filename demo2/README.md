# Spring-boot & React demo2

## idea
  - https://colormytree.me/ (please check screenshots_ideasite folder)
  - 개발 프레임워크 : React(frontend, clientside) & Spring-boot(backend, severside)
  - ^^ 포폴용, React는 프론트단에서 렌더링 성능이 뛰어나고, Spring은 비즈니스로직 처리성능이 우수해 둘을 활용해 보고자 함.

## plan
  1. [figma를 통한 레이아웃 디자인 v1](https://www.figma.com/file/YpQykmEWJo9uDRYCzjhSub/tree_app_v1?node-id=17%3A104)
  2. Layout design 구현(with React) repo: frontend
  3. SQL DB 구조 디자인 (maybe MySQl, MariaDB)
  4. DB connect & query 작성 (with Spring-boot) repo: backend
  5. React & Spring-boot connect
  6. bug fix
  7. deploy

  - 중간중간 디자인 수정 및 계획 수정은 github에 기록을 남길 수 있도록 하자.


## progress
  - 211228 : 1차 레이아웃 디자인 완성(with figma)
  - 211229 ~ 220101 : React&Spring-boot tutorial study (please check `demo` project)
  - 220102 : 레이아웃 디자인 구현 작업 착수 (please chekc `frontend/screenshots`)
  - 220103 : mainpage, sidebar, message_detail_page 디자인 및 데이터 전송, 페이지 on,off 추가
  - 220104 : join&login page, send message page 디자인, 각각의 component 모듈화 및 라우팅 
  - 220104_pm : mysql connect (with jpa), 샘플데이터를 이용한 login, session 기능 구현
  - 220105 : join, login, logout 기능 구현 & DB 구조 구성 시작
  - 220106 : Create MessageRepo & Connect to front 
  - 220107_새벽 : send page, tree container(treeitem, pageindicator), 전체 코드 refactoring(Promise 및 useEffect 의존성 배열)
  - 220107_새벽_2 : Component file 분리, 1차적인 작업 완료 (주변 지인들에게 피드백 받은 후 레이아웃 디자인, 이미지 추가, 공개 날짜 제어 기능 추가 등 예정)


## reference
  - https://joshua-dev-story.blogspot.com/2020/01/react-spring.html

## see also
  - [stateful vs stateless](https://picayune-judge-296.notion.site/Stateful-vs-Stateless-45c1247b564641548cc27e5ea6fc3c27)
  - useEffect 의존성 배열
