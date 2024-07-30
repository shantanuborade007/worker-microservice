# Use the official Liquibase Docker image
FROM liquibase/liquibase

# Set the working directory
WORKDIR /liquibase

# Copy the Liquibase configuration and changelog files
COPY liquibase.properties /liquibase/
COPY changelog /liquibase/changelog

# Copy the PostgreSQL JDBC driver
COPY postgresql-42.7.3.jar /liquibase/

# Set the classpath for the JDBC driver
ENV CLASSPATH="/liquibase/postgresql-42.7.3.jar"

# Default command to run Liquibase update
CMD ["liquibase", "update"]
