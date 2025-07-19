// MongoDB initialization script
// This script creates the application user in the myapp database

db = db.getSiblingDB('myapp');

db.createUser({
  user: 'appuser',
  pwd: 'apppass123',
  roles: [
    {
      role: 'readWrite',
      db: 'myapp'
    }
  ]
});

print('User appuser created successfully in myapp database');
