FROM openjdk:15-oracle
ENV ENVIRONMENT=prod
MAINTAINER Tobias Hasenkamp <tobias.hasenkamp@gmail.com>
ADD backend/target/EcoBo.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]