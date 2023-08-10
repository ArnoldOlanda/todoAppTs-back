SELECT 'CREATE DATABASE todos'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todos')\gexec