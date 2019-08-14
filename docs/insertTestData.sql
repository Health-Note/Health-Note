
-- trainer
insert into trainer values('surhommekim@gmail.com','JKT');

-- members (0 : 여자, 1 : 남자)
insert into members values('01023549785','김성희',0,'20190701','20191001',30,14,'surhommekim@gmail.com',167);
insert into members values('01064649785','이성규',1,'20190530','20191030',60,24,'surhommekim@gmail.com',180);
insert into members values('01025229156','강민정',0,'20190215','20200715',30,28,'surhommekim@gmail.com',161);
insert into members values('01044561275','오수림',0,'20190713','20191013',30,29,'surhommekim@gmail.com',159);
insert into members values('01036961411','손석희',1,'20190510','20191010',40,25,'surhommekim@gmail.com',177);
insert into members values('01098994512','박승지',0,'20190701','20191001',30,17,'surhommekim@gmail.com',164);
insert into members values('01010312574','최수오',1,'20190601','20191030',50,34,'surhommekim@gmail.com',175);
insert into members values('01051764414','강형구',1,'20190401','20191030',60,47,'surhommekim@gmail.com',187); 
insert into members values('01051769999','김시험',1,'20190808','20191231',60,59,'surhommekim@gmail.com',180); 
;


-- fixedschedule (0 ~ 6 : 월 ~ 일)  0월 1화 2수 3목 4금 5토 6일 
insert into fixedschedule values(0, '01023549785', '1830', '1930');
insert into fixedschedule values(2, '01023549785', '1830', '1930');
insert into fixedschedule values(4, '01023549785', '1830', '1930');

insert into fixedschedule values(2, '01064649785', '1930', '2100');
insert into fixedschedule values(4, '01064649785', '1930', '2100');

insert into fixedschedule values(0, '01025229156', '1530', '1630');
insert into fixedschedule values(2, '01025229156', '1530', '1630');
insert into fixedschedule values(4, '01025229156', '1530', '1630');

insert into fixedschedule values(2, '01044561275', '1630', '1730');
insert into fixedschedule values(4, '01044561275', '1630', '1730');

insert into fixedschedule values(1, '01036961411', '1630', '1730');
insert into fixedschedule values(3, '01036961411', '1630', '1730');
insert into fixedschedule values(5, '01036961411', '1630', '1730');

insert into fixedschedule values(0, '01098994512', '1730', '1830');
insert into fixedschedule values(1, '01098994512', '1730', '1830');
insert into fixedschedule values(2, '01098994512', '1730', '1830');
insert into fixedschedule values(3, '01098994512', '1730', '1830');
insert into fixedschedule values(4, '01098994512', '1730', '1830');
insert into fixedschedule values(5, '01098994512', '1730', '1830');

insert into fixedschedule values(1, '01010312574', '1930', '2100');
insert into fixedschedule values(3, '01010312574', '1930', '2100');
insert into fixedschedule values(5, '01010312574', '1930', '2100');

insert into fixedschedule values(0, '01051764414', '2200', '2300');
insert into fixedschedule values(1, '01051764414', '2200', '2300');
insert into fixedschedule values(3, '01051764414', '2200', '2300');
insert into fixedschedule values(4, '01051764414', '2200', '2300');

-- schedule
insert into schedule values('20190805', '01023549785', '1830', '1930', 1);
insert into schedule values('20190807', '01023549785', '1830', '1930', 0);
insert into schedule values('20190809', '01023549785', '1830', '1930', 0);
insert into schedule values('20190812', '01023549785', '1830', '1930', 1);
insert into schedule values('20190814', '01023549785', '1830', '1930', 0);
insert into schedule values('20190816', '01023549785', '1830', '1930', 0);
insert into schedule values('20190702', '01010312574', '1800', '1900', 0);
insert into schedule values('20190704', '01010312574', '1800', '1900', 0);
insert into schedule values('20190706', '01010312574', '1800', '1900', 0);
insert into schedule values('20190709', '01010312574', '1800', '1900', 0);
insert into schedule values('20190711', '01010312574', '1800', '1900', 0);
insert into schedule values('20190713', '01010312574', '1800', '1900', 0);
insert into schedule values('20190716', '01010312574', '1800', '1900', 0);
insert into schedule values('20190718', '01010312574', '1800', '1900', 0);
insert into schedule values('20190720', '01010312574', '1800', '1900', 0);
insert into schedule values('20190723', '01010312574', '1800', '1900', 0);
insert into schedule values('20190725', '01010312574', '1800', '1900', 0);
insert into schedule values('20190727', '01010312574', '1800', '1900', 0);



-- exercise 0/가슴 1/등 2/하체 3/어깨 4/이두 5/삼두 6/복근/ 7/유산소 
insert into exercise values('인클라인 바벨 벤치 프레스', 0);
insert into exercise values('인클라인 덤벨 벤치 프레스', 0);
insert into exercise values('플렛 바벨 벤치 프레스', 0);
insert into exercise values('플렛 덤벨 벤치 프레스', 0);
insert into exercise values('플렛 머신 벤치 프레스', 0);
insert into exercise values('디클라인 바벨 벤치 프레스', 0);
insert into exercise values('디클라인 덤벨 벤치 프레스', 0);
insert into exercise values('디클라인 머신 벤치 프레스', 0);
insert into exercise values('머신 펙 덱 플라이', 0);
insert into exercise values('덤벨 플라이', 0);
insert into exercise values('인클라인 덤벨 플라이', 0);
insert into exercise values('케이블 크로스 오버', 0);
insert into exercise values('풀 오버', 0);

insert into exercise values('풀 업', 1);
insert into exercise values('바벨로우', 1);
insert into exercise values('덤벨로우', 1);
insert into exercise values('T-bar 로우', 1);
insert into exercise values('원암 덤벨로우', 1);
insert into exercise values('랫 풀 다운', 1);
insert into exercise values('백 익스텐션', 1);
insert into exercise values('데드리프트', 1);
insert into exercise values('시티드로우', 1);

insert into exercise values('스쿼트', 2);
insert into exercise values('레그프레스', 2);
insert into exercise values('레그 익스텐션', 2);
insert into exercise values('런지', 2);
insert into exercise values('레그 컬', 2);
insert into exercise values('원 레그컬', 2);

-- routine
insert into routine values('20190805','01023549785','인클라인 바벨 벤치 프레스', 8, 3);
insert into routine values('20190805','01023549785','플렛 덤벨 벤치 프레스', 8, 3);
insert into routine values('20190805','01023549785','디클라인 머신 벤치 프레스', 5, 5);
insert into routine values('20190805','01023549785','머신 펙 덱 플라이', 5, 5);

insert into routine values('20190807','01023549785','바벨로우', 8, 5);
insert into routine values('20190807','01023549785','덤벨로우', 8, 5);
insert into routine values('20190807','01023549785','T-bar 로우', 5, 5);
insert into routine values('20190807','01023549785','원암 덤벨로우', 5, 5);
insert into routine values('20190807','01023549785','랫 풀 다운', 5, 3);

insert into routine values('20190809','01023549785','인클라인 바벨 벤치 프레스', 8, 5);
insert into routine values('20190809','01023549785','스쿼트', 8, 5);
insert into routine values('20190809','01023549785','레그프레스', 8, 5);
insert into routine values('20190809','01023549785','레그 익스텐션', 5, 5);
insert into routine values('20190809','01023549785','런지', 5, 5);
insert into routine values('20190809','01023549785','레그 컬', 5, 5);
insert into routine values('20190809','01023549785','원 레그컬', 5, 3);

-- memo
insert into memo values(no,'현재 감기 몸살 걸려서 운동 당분간 쉬기로 함', 1, '01023549785');
insert into memo values(no,'초콜릿을 너무 좋아하는 회원임', 1, '01023549785');
insert into memo values(no,'다음번 PT도 계속 등록할지 고민중', 1, '01023549785');

-- weighthistory
insert into weighthistory values('20190601','01023549785','80');
insert into weighthistory values('20190701','01023549785','65');
insert into weighthistory values('20190705','01023549785','61');
insert into weighthistory values('20190711','01023549785','60');
insert into weighthistory values('20190717','01023549785','60');
insert into weighthistory values('20190725','01023549785','57');
insert into weighthistory values('20190727','01023549785','58');
insert into weighthistory values('20190804','01023549785','55');
insert into weighthistory values('20190807','01023549785','54');


commit;
