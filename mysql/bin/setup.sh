#!/usr/bin/env bash
while ! mysqladmin status --password=$MYSQL_ROOT_PASSWORD --silent; do
  echo "Waiting for MySQL to start"
  sleep 10
done

# create todolist databases
echo "Creating todolist DB for the todolist APP ----"
mysqladmin create todolist --password=$MYSQL_ROOT_PASSWORD
echo "== Done - todolist DB created =="
