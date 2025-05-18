FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN ./mvnw -B dependency:go-offline

COPY src src
RUN ./mvnw -B clean package -DskipTests

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar proap-api.jar

ENTRYPOINT ["java", "-jar", "proap-api.jar"]