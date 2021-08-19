# BiDi

> BiDi - 제안서 기반의 헤어 디자이너 매칭 서비스

<p align="center"><img width="700" src="https://user-images.githubusercontent.com/60457112/130026204-0dbc24f4-93db-4a76-ab22-28f2da361e76.png" title="bidi"/></p>

#### 🐱‍🏍 [BiDi-AI Repository]()

#### 📩 [AppStore Download URL]()

#### 📚 [BiDi 학습 정리](https://hypnotic-manager-bb3.notion.site/d3e68407b4264df596a40faf6ac4bdb3)

## 📺 [BiDi 데모 영상](https://www.youtube.com/watch?v=v7ierZX2fzQ&feature=youtu.be)

> 사진을 클릭하면 유튜브 페이지로 이동합니다

<div align="center"><a align="center" href="https://youtu.be/4CYwmMTDZgc" target="_blank"><img src="https://user-images.githubusercontent.com/60457112/130026012-32376864-a8a8-42e2-860b-4943b70429e6.png"/></a>
</div>

## ⚙️ 주요 기능

### 1. 제안서 기반 스타일링 매칭

#### (1) 제안서 작성

- 유저는 받고 싶은 스타일링의 예상 사진과 함께 금액 범위, 원하는 거리, 중요한 키워드 등을 포함하여 제안서 작성
  <img width="350" src="https://user-images.githubusercontent.com/60457112/130026606-bb81899d-d323-4717-af96-4dc706518136.png"/>

#### (2) 제안서에 대한 bid 작성

- 디자이너는 본인에게 해당되는 제안서들을 스와이프 UI/UX를 통해 확인 가능
- 본인이 자신있는 스타일에 대해 bid를 작성

<img width="350" src="https://user-images.githubusercontent.com/60457112/130027485-b43bb07a-d9a0-4ffb-96c8-9b5647a97b72.png"/>

#### (3) 디자이너와 유저 매칭 성사

- 유저는 여러 디자이너로부터 받은 비드를 확인 후, 가장 만족스러운 조건을 가진 비드를 수락
- 매칭 후에는 채팅방 생성을 통해 예약에 대한 세부내용 조율

<img width="350" src="https://user-images.githubusercontent.com/60457112/130027843-79a6081d-da9f-469d-9d4e-c0ae0a9c4915.png"/>

---

### 2. 디자이너 브랜딩 페이지

#### (1) 브랜딩 페이지 작성

- 본인을 브랜딩하기 위한 포트폴리오를 작성 및 관리 가능
- 브랜딩 페이지 기능을 통해 디자이너 개인의 브랜딩에 집중할 수 있음

<img width="350" src="https://user-images.githubusercontent.com/60457112/130028096-fad70333-2b2b-438e-b284-3f7e0ce1377d.png"/>

#### (2) 디자이너 탐색

- 유저는 스와이프 UI 형태로 디자이너들이 작성한 포트폴리오를 확인할 수 있음
- 디자이너가 등록한 스타일과 그 동안의 매칭 기록을 확인할 수 있음

<img width="350" src="https://user-images.githubusercontent.com/60457112/130028396-4cdeac2a-2e69-419b-b4bc-7c787327efd5.png"/>

## ⚒️ 기술 스택

### (1) Project Overview - Service App

<img width="350" src="https://user-images.githubusercontent.com/60457112/130028529-fb992121-dc8f-4fac-8b3a-e137e2124243.png"/>
- React Native를 기반으로 UI/UX 제작 및 IOS 앱 서비스 개발
- 서버는 API Server와 AI Server로 분리하여 개발
- AWS, Docker 등을 이용하여 프로젝트 아키텍쳐 구성  
  
### (2) Project Overview - AI Model

<img width="350" src="https://user-images.githubusercontent.com/60457112/130028634-352104f3-de15-4032-aca6-b262b544cb23.png"/>
- 여러 모델의 inference를 실험 후 StarGAN-v2를 Baseline model로 선정
- StyleGAN2(이미지 생성) -> Auto Labeling(Hard voting) flow를 통한 dataset 구축
- seepretty-face, celebA-HQ 및 자체 dataset을 이용해 새롭게 baseline 학습 
- 자체 학습한 checkpoint 적용 후, inference에 적합하도록 Model pipeline 설계
- Flask를 통해 AI Model Serving API 개발
- AWS S3 & EC2 등을 이용하여 프로젝트 아키텍쳐 구성
## 🗂 Directory

<details>
<summary>server</summary>
  <div markdown="1">

```
🗃 Project Folder
📁server
├── app.js
├── 📁lib
├── 📁config
├── 📁middleware
├── 📁models
├── 📁routes
│   ├── index.js
│   └── controller.js
├── 📁service
├── 📁socket
│
└── 📁__tests__
```

  </div>
</details>

<details>
<summary>client</summary>
  <div markdown="1">

```
📁client
├── 📁public
│   └── 📁image
│
└── 📁src
    ├── 📁Components
    │
    ├── 📁Lib
    │   ├── 📁socket
    │   ├── constant.js
    │   ├── utils.js
    │   └── storage.js
    │
    ├── 📁Navigator
    │   ├── 📁Auth
    │   ├── 📁DM
    │   └── 📁MainTab
    │
    ├── 📁Screen
    │   ├── 📁01_FirstTab
    │   ├── 📁02_SecondTab
    │   ├── 📁03_ThirdTab
    │   ├── 📁04_FourthTab
    │   ├── 📁05_MyPageTab
    │   ├── 📁Auth
    │   └── 📁DM
    └── app.js
```

  </div>
</details>

## 👩🏻‍💻 Members

| <img src="https://avatars.githubusercontent.com/u/60457112?v=4" width=300/> | <img src="https://avatars.githubusercontent.com/u/70363646?v=4" width=300/> | <img src="https://avatars.githubusercontent.com/u/37537248?v=4" width=300/> |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|                                   김동현                                    |                                   김장영                                    |                                   성인규                                    |
|                   [@dooking](https://github.com/dooking)                    |                [@longshiine](https://github.com/longshiine)                 |                 [@cakenbake](https://github.com/cakenbake)                  |

## ⭐ Show your support

Please ⭐️ this repository if this project helped you!
