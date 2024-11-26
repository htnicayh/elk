# ELK (Elasticsearch - Logstash - Kibana)

<p align="center">
  <img src="https://i.imgur.com/t11iw1X.png" alt="ELK"/>
</p>

## Configuration

### Generate ACCOUNT_SERVICE_TOKEN

```
curl -X POST -u username:password "localhost:9200/_security/service/elastic/kibana/credential/token/token1?pretty"
```

### Define Logstash (logstash.conf)

```
input {
  http {
    port => 5044
  }
}

filter {
  json {
    source => "message"
  }
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    user => "username" // elastic
    password => "password"
    index => "prefix-logs-%{+YYYY.MM.dd}"
  }
  stdout { codec => rubydebug }
}
```

## Process

```
docker-compose up -d
```

### Setup password

```
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive
```
