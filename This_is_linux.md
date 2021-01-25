# This is linux 책 내용 정리
- Written By 우재남

## Part 2 기본 개념과 명령어


### 명령어 정리

- pwd: print working directory
- whoami: 로그인 계정 출력
- ln <파일명> <파일명> : 하드 링크 만들기 (linux 내부적으로 갖는 완전히 동일한 파일 링크를 만듬 -- 완전히 같은 파일인 것처럼 행동함)
- ln -s <파일명> <파일명> : 심볼릭 링크 만들기 (눈에 띄는 링크를 만듬)
- mount -o remount,rw /
  - 읽기 전용 파티션으로 마운트된 (mount 명령어로 확인) 폴더를 읽기/쓰기 모드로 붙일 수 있음.
- yes > /dev/null
  - 무한 루프를 도는 단순한 프로세스 만들기
- ls -l /etc | more
  - 한 페이지 넘어가는 것 편하게 보기
- ps -ef | grep bash
  - 프로세스 특정한 것만 보기
- Redirection 명령어들
  - ls -l > list.txt     (overwrite)
  - ls -l >> list.txt    (append)
  - sort < list.txt      (list 내용을 정렬하여 출력)
  - sort < list.txt > out.txt   (list 내용을 정렬해서 out에 쓰기)
- kill -9 PS_NUM
  - 무조건 종료한다는 의미가 -9. 
- foreground process를 background process로 전환
  - yes > /dev/null
  - Ctrl + Z   (일시 중지 명령어)
  - bg
  - 이러면 백그라운드로 이동하여 계속 실행 됨.
- background process를 foreground process로 전환
  - jobs   (백그라운드 가동 프로세스 확인)
  - fg [작업번호]  (포그라운드로 전환)
- 세미콜론(;): 명령어를 연속으로 실행할 때 사용
- ls -l [검색할 파일 명]: 하위 폴더까지 재귀적으로 찾아줌..
  - ex: ls -l /dev/sd*
- halt -p : 시스템 종료

### 서비스란

- 서비스 = 데몬 은 서버 프로세스를 말함.
  - 클라이언트에 설치되는 웹 서버 데몬, 네임 서버 데몬 등으로 부르기도 함
  - 서비스는 눈에 보이지는 않지만 현재 시스템에서 동작 중인 프로세스임. 백그라운드 프로세스의 일종.
  - 하지만 위에서 배운 jobs를 쓴다고 해서 나오는 녀석은 아님.
- 기존에는 "init" 이라는 최상위 프로세스가 서비스를 직접 관리하는 방식이었지만, 요즘은 systemd가 대세임.
- 서비스는 평상시에도 늘 가동되는 서버 프로세스
- 소켓은 필요할 때만 가동되는 서버 프로세스. --> 서비스 / 소켓 모두 systemd가 관리.
- 대표적인 놈은 httpd, mysqld, vsftpd -> d는 daemon을 의미하는 것.
- 서비스의 실행 스크립트 파일은 /usr/lib/systemd/system/ 디렉터리에 "서비스이름.service"로 확인 가능.
  - Cron 서비스의 경우 crond.service라는 파일로 존재함
- 서비스의 경우 systemd를 사용한다는 가정 하에 systemctl start/stop/restart를 사용할 수 있다.
  - systemctl status <서비스 이름>, systemctl enable/disable <서비스 이름>
- 소켓은 서비스와 다르게 항상 가동되는 것은 아님. 외부에서 특정 서비스가 요청할 경우 systemd가 실행하는 구조. 요청이 끝나면 소켓도 종료
  - 소켓 위치: /usr/lib/systemd/system/*.socket
  - dbus, ssh, log 등등

### 커널과 모듈들

- 하드웨어 > 커널 > 쉘 > 응용 프로그램
  - 커널은 메모리 위에서 동작하며, 커널이 커지면 메모리도 많이 먹게 되므로 당장에 사용하지 않는 드라이버 등은 "모듈"로 빼게 되었다.
  - 커널은 하드웨어와 밀접한 관련이 있으며 최신 커널일 수록 지원하는 하드웨어도 많다. 보안 개선도 있고..
- 커널의 실체 역시 파일이다.
  - CentOS의 경우 /boot/vmlinuz 아래에 있다.
- 커널 버전 알아보려면 uname -r 쓰면 됨. 그냥 uname은 배포판? 을 출력함.
- 배포는 https://www.kernel.org/
  - 현재(2021/1/21) 최신은 5.11

### X Window

- 폴더는 GUI / 디렉토리는 TUI에서 사용하는 말
- chown -R root.root /usr/local/firefox/
  - Firefox 관련 파일을 모두 root 사용자 소유로 변경

### 하드디스크

- 하드 자체는 /dev/sda, /dev/sdb, /dev/sdc 순으로 붙게 된다.
- 논리적으로는 /dev/sda1, /dev/sda2, ... 요런식으로 분할도 된다.
- /dev/sda1 같은 녀석들은 바로 쓸 수는 없고 반드시 마운트 시켜야 한다.
- 마운트 과정
  - SCSI 0:1 -> /dev/sdb -> /dev/sdb1 -> mkfs.ext4 -> mount -> /mydata -> /etc/fstab에 등록.
  - 명령어 실행 순서
    - fdisk /dev/sdb => SCSI 0:1 하드디스크 스택
    - 파티션 생성 (1개의 파티션만 쓸 지라도)
    - 파티션이 생성되면 /dev/sdb1 이 된다.
    - mkfs -t [파일시스템] [파티션장치] => 파일 시스템을 지정
    - mount /dev/sdb1 /mydata => 마운트 명령
    - 이렇게 만든 mount는 재시작 시 유지되지는 않으므로 추가 설정을 할 필요가 있다.
    - vi /etc/fstab에 아래를 추가
    - /dev/sdb1 /mydata ext4 defaults 0 0
    - /etc/fstab는 리눅스가 부팅될 때마다 읽는 매우 중요한 파일. 글자가 틀릴경우 아예 부팅되지 않을 수 있으므로 주의 필요.

- 보통 /dev/sda1은 SWAP에 mount 되고, /dev/sda2는 '/' 에 마운트 됨
- df 명령어를 사용하면 마운트 현황을 알 수 있음
```text
Filesystem      1K-blocks       Used  Available Use% Mounted on
/dev/sdb        263174212    5290692  244445364   3% /
tools           249105148  164725580   84379568  67% /init
none              6509908          0    6509908   0% /dev
tmpfs             6512308          0    6512308   0% /sys/fs/cgroup
none              6512308         16    6512292   1% /run
C:\             249105148  164725580   84379568  67% /mnt/c
```
- WSL의 경우 파일시스템 자체가 C:\ 등으로 나오기도 함.
- 서버에서는 RAID를 많이 사용함
  - RAID: Redundant Array of Inexpersive/Independent Disks
  - 하드웨어 RAID도 존재는 한다.
  - Linear RAID / RAID 0 : 최소 2게 이상의 HDD 필요. 하지만 저장 방식이 차이가 있다.
    - Linear 방식은 첫번째 HDD 부터 사용, RAID 0는 N개의 HDD를 동시에 사용.
    - 동시에 사용하는 방식을 Stripping 이라고 하며 성능 향상에 도움이 된다.
    - 그러나 당연한 이야기이지만 데이터 복구는 불가능함.
    - Linear RAID는 그나마 차례로 쓰기 때문에 (성능은 낮지만) 하드 손상 시 다른 데이터들은 멀쩡하지만,
      RAID 0의 경우 파일 부분부분 모두 손상되기 때문에 사실상 복구의 가능성은 없다고 봐야 한다.
      하드가 100개라면 손상 확률은 100배가 된다는 뜻.
    - Linear RAID를 제와하고 다른 RAID 들은 동일한 용량의 HDD를 사용하기 마련임.
  - RAID 1: 미러링, 2배의 용량 사용
    - RAID 0과 1은 장단점이 명백..
  - RAID 5: 3개 이상의 HDD가 있어야 사용 가능, 대부분 5개 이상으로 구성함.
    - 오류가 있을 시 Parity를 사용하여 복구 가능
    - 5개 HDD에서 짝수 Parity를 사용한다고 가정 하면, HDD 1개가 망가져도 100% 복구 가능
      - 4개의 HDD는 데이터 저장용, 나머지 1개는 Parity 용.
      - 0010 데이터의 경우 1을 저장, 어느 1 bit가 없더라도 나머지 1개의 bit를 알 수 있다.
      - 저장 효율 80% (5개의 HDD가 있을 시), 이는 RAID 1의 50%를 훨씬 상회하는 수치임.
  - RAID 6: 2개의 Parity를 사용 - 최소 4개 이상의 HDD에서 사용.
    - Parity 알고리즘이 RAID 5보다 약간 더 복잡해져서 성능이 약간 더 떨어지게 된다.
  - RAID 1+0 / RAID 1+6 처럼 Stripping 도 가능.
    - RAID 1+0: 속도 & 신뢰도
    - RAID 1+6: 성능과 비용은 많이 들지만 신뢰도가 훨씬 높다.
  - RAID 구성에는 mdadm 명령어를 사용. (RAID 장치를 생성/관리하는 명령어.. 물론 SW RAID 이다.)
  - mount: RAID 없이 붙임, mdadm: RAID를 사용하여 새 장치를 만듬.. (/dev/md*)
- LVM: 논리 하드디스크 관리자(Logical Volume Manager)
  - 물리 볼륨(/dev/sda1, ...)
  - 볼륨 그룹: 물리 볼륨을 합침
  - 논리 볼륨: 논리적으로 다른 불륨을 나눠서 합칠 수도 있고 그런 개념 (/dev/sda1의 절반 + /dev/sdb1의 절반 등)
