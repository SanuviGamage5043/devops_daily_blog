provider "aws" {
  region = "ap-south-1"
}

resource "null_resource" "deploy_blogapp" {
  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install docker.io -y",

      # Stop old containers if running
      "docker stop blogapp-frontend || true",
      "docker rm blogapp-frontend || true",
      "docker stop blogapp-backend || true",
      "docker rm blogapp-backend || true",

      # Run backend container with MongoDB Atlas connection string
      "docker run -d --restart unless-stopped -p 5000:5000 --name blogapp-backend -e MONGO_URL='mongodb+srv://sanuvigamage5043_db_user:y7a018npyvXGyswB@clusterdevops.6vrvfmw.mongodb.net/blogapp_db' sanuvi5043/blogapp-backend:latest",

      # Run frontend container and link to backend
      "docker run -d --restart unless-stopped -p 3000:3000 --name blogapp-frontend --link blogapp-backend:backend sanuvi5043/blogapp-frontend:latest"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"                                 # EC2 default user
      private_key = file("/var/lib/jenkins/.ssh/newblogkey.pem")
      host        = "65.2.128.22"                            # EC2 public IP
    }
  }
}