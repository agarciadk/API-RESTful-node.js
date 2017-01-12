module.exports = {
  port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  server_ip_address: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  db: process.env.MONGO_URL || 'mongodb://localhost:27017/shop',
  SECRET_TOKEN: '1q2w3e4r5t6y;H0sT14'
}
