
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

