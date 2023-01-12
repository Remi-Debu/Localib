FROM openjdk:17

ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME

EXPOSE 8080

COPY ./target/localib-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","localib-0.0.1-SNAPSHOT.jar"]