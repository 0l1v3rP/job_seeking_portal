    FROM postgres

    ENV POSTGRES_DB postgres
    ENV POSTGRES_USER user
    ENV POSTGRES_PASSWORD password

    COPY init.sql /docker-entrypoint-initdb.d/
    
    EXPOSE 5432