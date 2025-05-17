# Vector Search

Para criar a tabela no Turso, utilize o código abaixo:

```sql
CREATE TABLE content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  url TEXT NOT NULL,
  embedding F32_BLOB (1536) NOT NULL
);

CREATE INDEX content_idx ON content (libsql_vector_idx (embedding));
```
