FROM mysql:8.0

RUN \
  apt update && apt install -y \
  # build dependencies
  build-essential curl unzip libboost-dev libssl-dev \ 
  libmysqlclient-dev openssh-client \
  # cleanup
  && rm -rf /var/lib/apt/lists/*

# mysql config
COPY config.cnf /etc/mysql/conf.d/config.cnf

# scripts
ADD bin/boot.sh /boot.sh

ENTRYPOINT ["/boot.sh"]
CMD ["mysqld"]
