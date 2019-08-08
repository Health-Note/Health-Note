-- 트레이너
CREATE TABLE `TRAINER` (
   `email`    VARCHAR(50) NOT NULL, -- 이메일
   `nickname` VARCHAR(50) NOT NULL  -- 닉네임
);

-- 트레이너
ALTER TABLE `TRAINER`
   ADD CONSTRAINT `PK_TRAINER` -- 트레이너 기본키
      PRIMARY KEY (
         `email` -- 이메일
      );

-- 회원
CREATE TABLE `MEMBERS` (
   `phonenum`   CHAR(11)    NOT NULL, -- 휴대폰번호
   `name`       VARCHAR(10) NOT NULL, -- 이름
   `gender`     INT         NOT NULL, -- 성별
   `start_date` DATE        NOT NULL, -- 맴버십시작일
   `end_date`   DATE        NOT NULL, -- 맴버십종료일
   `unusedpt`   INT         NOT NULL, -- 충전PT수
   `usedpt`     INT         NOT NULL, -- 사용PT수
   `email`      VARCHAR(50) NOT NULL, -- 이메일
   `height`     INT         NOT NULL  -- 키
);

-- 회원
ALTER TABLE `MEMBERS`
   ADD CONSTRAINT `PK_MEMBERS` -- 회원 기본키
      PRIMARY KEY (
         `phonenum` -- 휴대폰번호
      );

-- 정기시간관리
CREATE TABLE `FIXEDSCHEDULE` (
   `day`        INT      NOT NULL, -- 요일
   `phonenum`   CHAR(11) NOT NULL, -- 휴대폰번호
   `start_time` CHAR(4)  NOT NULL, -- 시작시각
   `end_time`   CHAR(4)  NOT NULL  -- 종료시각
);

-- 정기시간관리
ALTER TABLE `FIXEDSCHEDULE`
   ADD CONSTRAINT `PK_FIXEDSCHEDULE` -- 정기시간관리 기본키
      PRIMARY KEY (
         `day`,      -- 요일
         `phonenum`  -- 휴대폰번호
      );

-- 수업시간관리
CREATE TABLE `SCHEDULE` (
   `date`        DATE     NOT NULL, -- 날짜
   `phonenum`    CHAR(11) NOT NULL, -- 휴대폰번호
   `start_time`  CHAR(4)  NOT NULL, -- 시작시간
   `end_time`    CHAR(4)  NOT NULL, -- 종료시간
   `finish_dncd` INT      NOT NULL  -- 수업완료여부
);

-- 수업시간관리
ALTER TABLE `SCHEDULE`
   ADD CONSTRAINT `PK_SCHEDULE` -- 수업시간관리 기본키
      PRIMARY KEY (
         `date`,     -- 날짜
         `phonenum`  -- 휴대폰번호
      );

-- 운동종류
CREATE TABLE `EXERCISE` (
   `exercisename` VARCHAR(50) NOT NULL, -- 운동이름
   `target`       INT         NOT NULL  -- 부위
);

-- 운동종류
ALTER TABLE `EXERCISE`
   ADD CONSTRAINT `PK_EXERCISE` -- 운동종류 기본키
      PRIMARY KEY (
         `exercisename` -- 운동이름
      );

-- 회원별운동루틴
CREATE TABLE `ROUTINE` (
   `date`         DATE        NOT NULL, -- 날짜
   `phonenum`     CHAR(11)    NOT NULL, -- 휴대폰번호
   `exercisename` VARCHAR(50) NOT NULL, -- 운동이름
   `sets`         INT         NOT NULL, -- 세트수
   `reps`         INT         NOT NULL  -- 랩수
);

-- 회원별운동루틴
ALTER TABLE `ROUTINE`
   ADD CONSTRAINT `PK_ROUTINE` -- 회원별운동루틴 기본키
      PRIMARY KEY (
         `date`,         -- 날짜
         `phonenum`,     -- 휴대폰번호
         `exercisename`  -- 운동이름
      );

-- 회원체중변화기록
CREATE TABLE `WEIGHTHISTORY` (
   `date`     DATE     NOT NULL, -- 날짜
   `phonenum` CHAR(11) NOT NULL, -- 휴대폰번호
   `weight`   INT      NOT NULL  -- 체중
);

-- 회원체중변화기록
ALTER TABLE `WEIGHTHISTORY`
   ADD CONSTRAINT `PK_WEIGHTHISTORY` -- 회원체중변화기록 기본키
      PRIMARY KEY (
         `date`,     -- 날짜
         `phonenum`  -- 휴대폰번호
      );

-- 메모
CREATE TABLE `MEMO` (
   `no`          INT          NOT NULL, -- 글번호
   `text`        VARCHAR(500) NOT NULL, -- 메모내용
   `finish_dncd` INT          NOT NULL, -- 완료여부
   `phonenum`    CHAR(11)     NOT NULL  -- 휴대폰번호
);

-- 메모
ALTER TABLE `MEMO`
   ADD CONSTRAINT `PK_MEMO` -- 메모 기본키
      PRIMARY KEY (
         `no` -- 글번호
      );

ALTER TABLE `MEMO`
   MODIFY COLUMN `no` INT NOT NULL AUTO_INCREMENT;

-- 웨이트목표
CREATE TABLE `WORKOUTGOAL` (
   `phonenum`       CHAR(11)    NOT NULL, -- 휴대폰번호
   `exercisename`   VARCHAR(50) NOT NULL, -- 운동이름
   `target_weight`  INT         NOT NULL, -- 목표중량
   `current_weight` INT         NOT NULL  -- 현재중량
);

-- 웨이트목표
ALTER TABLE `WORKOUTGOAL`
   ADD CONSTRAINT `PK_WORKOUTGOAL` -- 웨이트목표 기본키
      PRIMARY KEY (
         `phonenum`,     -- 휴대폰번호
         `exercisename`  -- 운동이름
      );

-- 회원
ALTER TABLE `MEMBERS`
   ADD CONSTRAINT `FK_TRAINER_TO_MEMBERS` -- 트레이너 -> 회원
      FOREIGN KEY (
         `email` -- 이메일
      )
      REFERENCES `TRAINER` ( -- 트레이너
         `email` -- 이메일
      );

-- 정기시간관리
ALTER TABLE `FIXEDSCHEDULE`
   ADD CONSTRAINT `FK_MEMBERS_TO_FIXEDSCHEDULE` -- 회원 -> 정기시간관리
      FOREIGN KEY (
         `phonenum` -- 휴대폰번호
      )
      REFERENCES `MEMBERS` ( -- 회원
         `phonenum` -- 휴대폰번호
      )
      ON DELETE CASCADE;

-- 수업시간관리
ALTER TABLE `SCHEDULE`
   ADD CONSTRAINT `FK_MEMBERS_TO_SCHEDULE` -- 회원 -> 수업시간관리
      FOREIGN KEY (
         `phonenum` -- 휴대폰번호
      )
      REFERENCES `MEMBERS` ( -- 회원
         `phonenum` -- 휴대폰번호
      )
      ON DELETE CASCADE;

-- 회원별운동루틴
ALTER TABLE `ROUTINE`
   ADD CONSTRAINT `FK_SCHEDULE_TO_ROUTINE` -- 수업시간관리 -> 회원별운동루틴
      FOREIGN KEY (
         `date`,     -- 날짜
         `phonenum`  -- 휴대폰번호
      )
      REFERENCES `SCHEDULE` ( -- 수업시간관리
         `date`,     -- 날짜
         `phonenum`  -- 휴대폰번호
      )
      ON DELETE CASCADE;

-- 회원별운동루틴
ALTER TABLE `ROUTINE`
   ADD CONSTRAINT `FK_EXERCISE_TO_ROUTINE` -- 운동종류 -> 회원별운동루틴
      FOREIGN KEY (
         `exercisename` -- 운동이름
      )
      REFERENCES `EXERCISE` ( -- 운동종류
         `exercisename` -- 운동이름
      );

-- 회원체중변화기록
ALTER TABLE `WEIGHTHISTORY`
   ADD CONSTRAINT `FK_MEMBERS_TO_WEIGHTHISTORY` -- 회원 -> 회원체중변화기록
      FOREIGN KEY (
         `phonenum` -- 휴대폰번호
      )
      REFERENCES `MEMBERS` ( -- 회원
         `phonenum` -- 휴대폰번호
      )
      ON DELETE CASCADE;

-- 메모
ALTER TABLE `MEMO`
   ADD CONSTRAINT `FK_MEMBERS_TO_MEMO` -- 회원 -> 메모
      FOREIGN KEY (
         `phonenum` -- 휴대폰번호
      )
      REFERENCES `MEMBERS` ( -- 회원
         `phonenum` -- 휴대폰번호
      )
      ON DELETE CASCADE;

-- 웨이트목표
ALTER TABLE `WORKOUTGOAL`
   ADD CONSTRAINT `FK_MEMBERS_TO_WORKOUTGOAL` -- 회원 -> 웨이트목표
      FOREIGN KEY (
         `phonenum` -- 휴대폰번호
      )
      REFERENCES `MEMBERS` ( -- 회원
         `phonenum` -- 휴대폰번호
      )
      ON DELETE CASCADE;

-- 웨이트목표
ALTER TABLE `WORKOUTGOAL`
   ADD CONSTRAINT `FK_EXERCISE_TO_WORKOUTGOAL` -- 운동종류 -> 웨이트목표
      FOREIGN KEY (
         `exercisename` -- 운동이름
      )
      REFERENCES `EXERCISE` ( -- 운동종류
         `exercisename` -- 운동이름
      );