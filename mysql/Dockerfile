FROM mysql:8.0

# mysql config
COPY config.cnf /etc/mysql/conf.d/config.cnf

# scripts
ADD bin/boot.sh /boot.sh

ENTRYPOINT ["/boot.sh"]
CMD ["mysqld"]
