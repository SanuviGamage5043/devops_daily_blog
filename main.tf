provider "aws" {
  region = "ap-south-1"
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "blogapp-eks"
  cluster_version = "1.29"

  vpc_id  = vpc-0c1aa93606cd7db3d
  subnets = [
    "subnet-02f74486285faf2a2"
  ]

  eks_managed_node_groups = {
    default = {
      desired_size   = 2
      min_size       = 1
      max_size       = 3
      instance_types = ["t3.small"]
    }
  }
}
