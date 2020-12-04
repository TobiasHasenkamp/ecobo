FROM openjdk:15-oracle
ENV ENVIRONMENT=prod
MAINTAINER Tobias Hasenkamp <tobias.hasenkamp@gmail.com>
ADD backend/target/EcoBo.jar app.jar
CMD ["sh" , "-c", "java -jar -Dserver.port=$PORT -Djwt.secretkey=$JWT_SECRETKEY -Dspring.data.mongodb.uri=$MONGO_DB_URI app.jar"]
