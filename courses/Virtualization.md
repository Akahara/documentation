Dépaquetage de libibverbs-dev:amd64 (28.0-1ubuntu1) ...
Sélection du paquet libopenmpi-dev:amd64 précédemment désélectionné.
#### Vocab

| Acronym | Signification |
| :-: | -- |
| CP/VMM | Virtual machine monitor |
| TLB | Transition lookaside buffer |
| SLAT | Second layer address translation |

**VMM** ::= Equivalence principle (programs should run the same on real hardware and on the VMM) + Performances + Security management

**TLB** ::= Used first when an address is accessed, used if possible instead of the RAM

**SLAT** ::= write access to the RAM from within virtualized apps, before SLAT every write operation would cause a vmexit (they were considered priviledged operations)

**Hypervisor** ::= The software running on the original hardware, a single hypervisor may run multiple VMs

**Von Neumann architecture** ::= standard CPU architecture (core+alu+ram+...)

**Trap** ::= When an app uses priviledged operations (io r/w...), the operation is Trapped by the cpu, the hypervisor is paused (vmexit) and the call is redirected to the hypervisor. It emulates the call and resumes operation (vmresume)

**CPU Emulation** ::= simulate amd on intel and vice versa

**Paravirtualization** ::= Virtualization of peripherals and drivers.

**PCI passthrough** ::= The vm has direct access to the device (a device can only be bound to one vm OR to the original machine), useful for GPUs for example

**SRV-IOV** ::= some peripherals allow for shared resources, useful for network interfaces for example

**PCA/PRA** ::= *plan de continuité/reprise active*, an installation where defective VMs can be moved on other hypervisors to resume activity as soon as they shutdown for any reason

If possible, when a VM is moved from one hypervisor to another, only the logical part is moved, data is stored on a common storage bay.

##### AMDV/VT instructions (asm x64)
- vmxon - enable vm instructions
- vmlaunch - start a vm
- vmresume - after a trap
- vmcall, vmoff...

## Docker

```bash
docker pull <imagename>
docker images # list images
docker run <imagename> <command...>
docker run -v <localdirpath>:<containerdirpath> ... # add a volume (stored on the host /var/lib/docker/volumes)
docker run --volumes-from <containerid> ... # share the volumes of another running container
docker run --name <name> ... # run a container with a name, the name can then be used instead of any 'containerid'
docker run -p <hostport>:<containerport> ... # map ports from host to container
docker run -P ... # automatically export container ports from 'EXPOSE' directives of the Dockerfile
docker run --link <containerid>:<alias> ... # creates an alias in /etc/hosts of the new container (eg. 'ping <alias>' will work)
docker run -it ... # run command with attached tty
docker run -d ... # run detached
docker rename <containerid> <newname> # rename a container
docker ps # list active containers
docker ps -a # list all containers
docker ps --filter='<filter>' # ie. status=exited
docker ps -l # retrieve the latest run container
docker ps -q # short id only
-> docker rm $(docker ps -aq)
docker stop <containerid> # gracefully stop container
docker kill <containerid> # terminate container
docker start <containerid> # restart a stopped container
docker start -a ... # restart and attach
docker rm <containerid> # removes a container but not its volumes
docker rm -v <containerid> # removes a container AND its volumes
docker exec [-it] <containerid> <command...> # execute a command on an already running container
docker logs <containerid> # print container stdout
docker logs -f [--tail 10] <containerid> # watch container stdout
docker inspect <containerid> # list container attributes, grep for IPAddress
docker inspect --format='<pathtoattribute>' <containerid> # ie. {{.NetworkSettings.IPAddress}}, {{.Config.Cmd}} or {{json .Config}}
docker diff <containerid> # list all changes to the container vs its image
docker commit <containerid> <imagename> # imagename~ <username>/<image>:<version>   version~ 1.0
docker built -t <imagename> <pathtoDockerfileDirectory> # generates a new image from a Dockerfile
docker history <imageid> # list executed commands that generated an image
```

```
<Ctrl>+P+Q  -- detach
<Ctrl>+Z    -- detach from "docker compose up"
```

```bash
# extract a file from an image
docker run -v $(pwd):/backup <image> cp <somefile> /backup/
# overengineered way to copy
docker run -v $(pwd):/backup -v <pathtodir>:/tmp/foo ubuntu cp /tmp/foo/<filename> /backup
```

### Dockerfile

```Dockerfile
FROM <imagename>                 # FROM ubuntu:18.04
RUN <cmd...>                     # RUN apt-get update
COPY <localfile> <containerfile> # COPY src src
EXPOSE <ports...>                # EXPOSE 80 8080 443
VOLUME <containerpath>           # VOLUME /data/foo

# CMD is the default "command" to docker run
CMD [ <args>... ] # CMD [ "ping", "-c", "30", "localhost" ]
# ENTRYPOINT will be used, the "command" to docker run will be appended to the entry point command (the value of CMD by default )
ENTRYPOINT [ <args>...] # ENTRYPOINT [ "apt-get" ]
```

### Docker compose

Examples:
```docker-compose.yml
services:
  backend:
    image: panieravide/geovisio:develop
    command: api
    volumes:
      - ./pictures:/data/360app
      - ./models:/data/360models
    ports:
      - 5000:5000
    depends_on:
      - db
    environment:
      - DB_URL=postgres://gvs:gvspwd@db/geovisio
  db:
    image: postgis/postgis:13-3.2
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_USER=gvs
      - POSTGRES_PASSWORD=gvspwd
      - POSTGRES_DB=geovisio
volumes:
  postgres_data:
```

```docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx
    volumes:
      - ./wordpress:/usr/share/nginx/html
      - ./nginx/conf.d/:/etc/nginx/conf.d
    depends_on:
      - php
    links:
      - php
    ports:
      - "8000:80"
  php:
    build:
      context: ./phpfpm
    volumes:
      - ./wordpress:/usr/share/nginx/html
    depends_on:
      - bdd
    links:
      - bdd:mysqldatabase
    environment:
      MYSQL_HOST: mysqldatabase
      MYSQL_USER: mysqlusr
      MYSQL_PASSWORD: mysqlpwd
      MYSQL_DATABASE: wordpressdb
  bdd:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    volumes:
      - bdd_data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: mysqlpwd
      MYSQL_USER: mysqlusr
      MYSQL_PASSWORD: mysqlpwd
      MYSQL_DATABASE: wordpressdb
volumes:
  bdd_data:
```

```bash
## to be executed in the directory containing docker-compose.yml
# start all containers
docker compose up
# (detached)
docker compose up -d
# stop *and remove* containers
docker compose down
# stop containers
docker compose stop
# restart stopped containers
docker compose start
```

When using a local image, there is no need to build using `docker build`, instead `build:` can be used in a service to specify the Dockerfile path.

When specifying volumes in a `docker-compose.yml`, use `volume:` and volume names (ie. not starting with `./`) to create volumes only accessible to containers OR volume paths (ie. starting with `./`, not in `volume:`) to create volumes that are shared with the host. The former are called *volumes* and the latter *bind mounts*.
Volumes can be directories or files.

When there is a `VOLUME` directive in the Dockerfile of an image used in a `docker-compose.yml`, the volume can be "overriden" by `volume:` configuration.

### Notes

For tiny images, use `busybox:latest`.
Beware of permissions when sharing volumes between containers.
Do not forget to un-daemonize processes, if docker starts but receives nothing on stdout it will consider that an error occured and will kill the container.
