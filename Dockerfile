FROM openjdk:15-oracle
MAINTAINER Tobias Hasenkamp <tobias.hasenkamp@gmail.com>
ADD backend/target/ecoBo.jar app.jar
ARG REACT_APP_GEOAPIFY_KEY
ENV REACT_APP_GEOAPIFY_KEY = $REACT_APP_GEOAPIFY_KEY

CMD ["sh" , "-c", "java -jar -Dserver.port=$PORT -Djwt.secretkey=$JWT_SECRETKEY -Dspring.data.mongodb.uri=$MONGO_DB_URI app.jar"]