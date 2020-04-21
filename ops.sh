#!/usr/bin/env bash
# deps: docker, docker-compose, git

# Print, Ruby style.
p() {
  printf "%s\n" "$1"
}

# Setup DB
setup_db() {
  docker-compose down
  # remove data volumes
  docker volume rm "webTest_mysql-data"
  # mysql
  docker-compose up --build -d mysql
  sleep 5
  docker exec "webTest_mysql_1" /setup-sync.sh
  docker-compose stop mysql
  p "DB setup done."
}

show_help() {
  p ""
  p "Denver help."
  p "------------"
  p "dependencies: docker, docker-compose, git."
  p ""
  p "Setup."
  p "------"
  p "./ops setup (setup the db)"
  p ""
  p "Control."
  p "--------"
  p "./ops up (run all apps/containers)"
  p "./ops down (stop apps/containers)"
  p "./ops rebuild (rebuild everything completely)"
  p "./ops rebuild service (rebuild a single service: ./ops rebuild app-frontend)"
  p "./ops restart (restart all services)"
  p "./ops restart service (restart a single service: ./ops restart app-frontend)"
  p "./ops attach app (Attach to running container. C-p-q to detach)"
  p "./ops log app (Tail app logs.)"
  p "./ops start service (start services: ./ops start app-frontend app-backend ...)"
  p "./ops stop service (stop services: ./ops stop app-frontend app-backend ...)"
  p "./ops status (show the status of all services)"
  p ""
  p "Interact."
  p "---------"
  p "./ops app command (Run a command on an app: ./ops app-frontend bash)"
  p "./ops app noroot command (./ops app-frontend noroot ...)"
  p "./ops mysql console (Get a MySQL console)"
  p ""
  p "Help."
  p "-----"
  p "help: Show the command list."
  p ""
}

case "$1" in
  setup)
    setup_db
    ;;
  up)
    docker-compose up -d
    ;;
  down)
    docker-compose down
    ;;
  status)
    docker-compose ps
    ;;
  start)
    docker-compose up -d "${@:2}"
    ;;
  stop)
    docker-compose stop "${@:2}"
    ;;
  restart)
    case "$2" in
      "")
        docker-compose down
        docker-compose up -d
        ;;
      *)
        docker-compose stop "${@:2}"
        docker-compose up -d "${@:2}"
        ;;
    esac
    ;;
  rebuild)
    case "$2" in
      "")
        docker-compose down --remove-orphans
        docker container prune -f
        docker images -qf "dangling=true" | xargs -r docker rmi
        docker-compose pull
        docker-compose build --pull --no-cache
      ;;
      *)
        docker-compose stop "$2"
        docker-compose build --pull --no-cache "$2"
      ;;
    esac
    ;;
  attach)
    docker-compose restart "${2}"
    docker attach "webTest_${2}_1"
    ;;
  log)
    COMPOSE_HTTP_TIMEOUT=300 docker-compose logs -f --tail "${3:-100}" "${2}"
    ;;
  # Interact.
  app-frontend | app-backend | todo-api | todo-frontend)
    case "$2" in
      noroot)
        trap 'p ""; p "${1} is not running. Please run ./ops up first"' ERR
        docker exec -it --user $(id -u) "webTest_${1}_1" "${@:3}"
        ;;
      *)
        trap 'p ""; p "${1} is not running. Please run ./ops up first"' ERR
        docker exec -it "webTest_${1}_1" "${@:2}"
        ;;
    esac
    ;;
  mysql)
    case "$2" in
      console)
        docker exec -it "webTest_mysql_1" \
        mysql -uroot -proot
        ;;
      *)
        show_help
        ;;
    esac
    ;;
      # Help.
  help)
    show_help
    ;;
  *)
    show_help
    ;;
esac