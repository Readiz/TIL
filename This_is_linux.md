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
- which [커맨드 명] : 실행하려는 커맨드 위치가 어디인지 보여줌
  ```bash
  readiz@Readiz-NotePC:~$ which bash
  /usr/bin/bash
  readiz@Readiz-NotePC:~$ which systemd
  /usr/bin/systemd
  ```

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


### Linux Shell **

- Shell이란
  - 사용자가 입력한 명령을 해석해 커널로 전달하거나, 커널의 처리 결과를 사용자에게 전달하는 역할을 함.
- bash Shell
  - bash: Bourne Again SHell. CentOS 등 다양한 Linux 배포판에서 기본적인 Shell로서 기능한다. 의미는 Bourne Shell을 기반으로 Korn Shell과 C Shell의 좋은 점을 합한 것.
    - Alias 기능 (단축어 기능)
    - History 기능 (위, 아래 방향키)
    - 연산 기능
    - Job Control 기능
    - 자동 이름 완성 기능 (Tab)
    - 프롬포트 제어 기능
    - 명령어 편집 기능
- 환경 변수
  - 설정된 환경 변수는 `echo [$환경변수이름]` 하면 볼 수 있음.
  - 주요 환경 변수는 아래와 같음
    - HOME: 사용자의 홈 디렉토리
    - PATH: 실행 파일을 찾는 디렉토리 경로
    - LANG: 기본 언어
    - PWD: 사용자의 현재 작업 디렉토리
    - TERM: 로그인 터미널 타입
    - DISPLAY: X 디스플레이 이름
    - USER: 현재 사용자의 이름
    - LINES: 현재 터미널 라인 수
    - COLUMNS: 현재 터미널의 컬럼 수
    - PS1/PS2: 1차, 2차 명령 프롬포트. 2차는 대개 ">" 이다.
    - BASH: Bash 쉘 경로
    - HOSTNAME / USERNAME
    - OSTYPE: OS 타입 (ex: linux-gnu)
  - 값을 변경하려면 `export [환경변수]=[값]`을 실행하면 됨.
  - `printenv`를 실행하면 주요 환경변수 값들이 출력 됨.
- 리눅스의 Shell Script는 C 언어와 유사한 방법으로 프로그래밍 가능. 왜냐하면 리눅스의 대부분은 C 언어로 작성되었기 때문.
  - 변수, 반복문, 제어문 등이 사용되며 컴파일 필요 없이 텍스트 파일 형태로 바로 Shell에서 실행 가능
  - 이미 리눅스의 많은 부분이 Shell Script로 작성되어 있다.
  - 확장자가 *.sh 일 필요는 없지만 구분을 위해 주로 해당 확장자로 많이 만드는 편임.
  - 간단한 예제
    ````sh
    #!/bin/sh
    echo "사용자 이름: " $USER
    echo "홈 디렉터리: " $HOME
    exit 0
    ````
  - `exit 0`에서 `0`은 성공을 의미함
- 스크립트 실행
  - `sh [스크립트 파일명]`으로 간단하게 실행 가능
  - `chmod +x [스크립트 파일명]`으로 속성 변경 후 `./[스크립트 파일명]`으로 실행 가능
    - `./`을 앞에 붙이는 이유는, `$PATH`에 현재 디렉터리가 등록되어 있지 않기 때문. 실행은 오로지 `$PATH`에 있는 경로만 찾기 때문에, 강제로 위치를 붙여주는 것.
    - root 사용자로 작성했을 경우에는 기본적으로 root 사용자만 사용 가능함. 타 사용자도 사용가능하게 하려면 `/usr/local/bin`으로 스크립트를 복사하고 권한을 755 정도로 주면 된다.
- 스크립트 작성
  - 변수
    - 변수의 경우 C 처럼 미리 선언할 필요는 없고, JS 처럼 그냥 처음 사용하여 할당하면 생성된다.
    - 모든 값은 String 취급이다. 숫자를 넣어도 문자로 생각함.
    - 대소문자를 구분함
    - 대입시 `=` 좌우에 공백이 없어야 한다.
    - 값에 공백이 있을 경우 `"`로 묶어야 한다.
    - 값을 불러올 때는 `$`를 앞에 붙인다.
    - `$` 문자가 들어간 글자를 출력하려면 `\`로 escape 시키거나 작은따옴표(`'`)를 사용하여 묶어준다. (안그러면 변수 취급이므로)
    - 일반적으로 입력된 값에 공백이 들어올 수 있으므로, `"$myvar"`와 같이 큰따옴표로 묶는 방식이 선호된다.
    - 아래는 위 내용을 종합한 예시 코드
    ```sh
    #!/bin/sh
    myvar="Hello World!"
    echo $myvar
    echo "$myvar"
    echo '$myvar'
    echo \$myvar
    echo 값 입력 :
    read myvar
    echo '$myvar' = $myvar
    exit 0
    ```
  - 숫자 계산
    - 변수는 기본적으로 문자열 취급이지만, `expr` 키워드를 사용해서 연산이 가능하다.
    - 수식과 함께 역따옴표(`)로 묶어줘야 한다.
    - 수식에 괄호를 사용하기 위해서는 역슬래시(\\)를 붙여줘야 한다.
      - 괄호 앞 뒤에는 공백을 넣자. (오동작 방지)
      - 기본적으로 expr 사용 시에는 단어마다 띄어쓰기를 사용한다고 생각.
    - 곱하기 기호(*)도 예외적으로 앞에 역슬래시를 붙여줘야 한다.
    ```sh
    #!/bin/sh
    num1=100
    num2=$num1+200
    echo $num2
    num3=`expr $num1 + 200`
    echo $num3
    num4=`expr \( $num1 + 200 \) / 10 \* 2`
    echo $num4
    exit 0
    ```
  - 파라미터 변수
    - $0, $1, $2와 같은 녀석들임
    - 실행하는 명령어의 부분부분을 변수 취급 함
    - `dnf -y install gftp` 라는 명령어가 있다면
      - $0: dnf
      - $1: -y
      - $2: install
      - $3: gftp
  - if와 case
    - 바로 예제를 보자. (`=`이 같음을 표시하는 기호임에 유의!)
    ```bash
    #!/bin/sh
    if [ "$1" = "" ]
    then
      echo "인수를 입력하지 않았습니다."
    else
      echo "인수를 입력하였습니다: " $1
    fi
    exit 0
    ```