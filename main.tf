provider "aws" {
  region = "eu-north-1"
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

      # Run backend
      "docker run -d --restart unless-stopped -p 5000:5000 --name blogapp-backend sanuvi5043/blogapp-backend:latest",

      # Run frontend
      "docker run -d --restart unless-stopped -p 3000:3000 --name blogapp-frontend --link blogapp-backend:backend sanuvi5043/blogapp-frontend:latest"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"                                 # EC2 default user
      private_key = file("/home/Sanuvi/Downloads/NewKey.pem")
      host        = "13.205.15.230"                            # EC2 public IP
    }
  }
}
