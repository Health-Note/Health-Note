﻿# Health-Note
## 헬스노트란?
헬스노트는 피트니스 센터에서 종사하는 트레이너들을 위해 PT계획, 회원관리, 회원분석을 제공하는 사이트입니다. 

## 개발동기
많은 피트니스센터에서 트레이너 선생님들은 PT 관리를 직접 손으로 종이에 적으며 관리합니다. 하지만 직장인들이 주로 받는 PT의 특성상 스케줄 변동이 잦으며, 그럴때 마다 **손으로 스케줄링을 다시 짜기에는 많은 어려움**이 있습니다. 

헬스노트는 시각화된 캘린더를 통해 스케줄을 **드래그 앤 드롭**으로 관리할 수 있기에 손쉽게 스케줄 변동에 대응이 가능합니다. 드래그 앤 드롭이 가능한 캘린더 툴 같은 경우에 구글 캘린더와 같은 툴이 이미 있지만 회원별 스케줄 관리라던지, 날짜별 운동루틴을 작성하기에는 기능이 부족합니다. 헬스노트는 PT횟수, 요일, 시작일을 입력함과 동시에 **날짜를 자동으로 계산**하여 실제 달력에 자동으로 반영해줍니다. 또한 날짜별 운동루틴, 회원별 운동 분석을 통해 기존 스케줄링 프로그램보다 트레이너들에게 특화된 서비스를 제공합니다.

## 주요기능
1. 회원 PT 스케줄 관리 기능
2. PT 세부 계획 작성 기능
3. 회원 운동 기록 분석 기능

## 동작화면
![Alt Text](./server/doc/Health-Note1.gif)<br/>
![Alt Text](./server/doc/Health-Note2.gif)<br/>

### Frontend
- JS Framework: React, Redux
- Middleware: Redux-saga
- UI Design: Ant Design
- Calendar Library: Full calendar

### Backend 
 - Language: Node.js
 - Framework: Express.js 
 - DB: Mysql
 - ORM: Sequelize.js
 ### API-docs
 - localhost:8080/api-docs