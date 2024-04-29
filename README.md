# Todo Stack Demo

This is a demonstration stack that shows a simple javascript + redis todo application.  To use this application you'll need access to:

1. A Hub on the Cycle platform.
2. A live server in the hub.
3. An environment. 
4. Hosted DNS Zone

If you've never created any of these things, each can be found in the [getting started](https://docs.cycle.io/getting-started/overview) section of our documentation. 

### Create

```bash 
curl -X POST -d '{"todo": "Buy groceries"}' -H "Content-Type: application/json" https://youdomain.com/todos
```

### Read

```bash
curl https://youdomain.com/todos
```

### Update 

```bash 
curl -X PUT -d '{"todo": "Buy new groceries", "completed": true}' -H "Content-Type: application/json" https://youdomain.com/todos/TODO_ID
```

### Delete

```bash
curl -X DELETE https://youdomain.com/todos/TODO_ID
```

