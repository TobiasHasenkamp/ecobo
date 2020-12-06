FROM openjdk:15-oracle
ENV ENVIRONMENT=prod
MAINTAINER Tobias Hasenkamp <tobias.hasenkamp@gmail.com>
ADD backend/target/ecoBo.jar app.jar
#EXPOSE 5000
CMD ["sh" , "-c", "java -jar -Dserver.port=$PORT -Djwt.secretkey=$JWT_SECRETKEY -Dspring.data.mongodb.uri=mongodb+srv://$MONGODB_USERNAME:$MONGODB_USER_PASSWORD@cluster0.zatly.mongodb.net/Cluster0?retryWrites=true&w=majority app.jar"]