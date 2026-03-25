#!/bin/bash

# Terraform setup
terraform init

# Create a new AWS VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create a new subnet
aws ec2 create-subnet --vpc-id $(aws ec2 describe-vpcs --query 'Vpcs[0].VpcId' --output text) --cidr-block 10.0.1.0/24

# Create a new security group
aws ec2 create-security-group --group-name infra-terraform-sg --description "Security group for infra-terraform"

# Add a rule to allow inbound traffic on port 22 (SSH)
aws ec2 authorize-security-group-ingress --group-id $(aws ec2 describe-security-groups --group-names infra-terraform-sg --query 'SecurityGroups[0].GroupId' --output text) --protocol tcp --port 22 --cidr-block 0.0.0.0/0

# Create a new instance
aws ec2 run-instances --image-id ami-abc123 --instance-type t2.micro --security-group-ids $(aws ec2 describe-security-groups --group-names infra-terraform-sg --query 'SecurityGroups[0].GroupId' --output text) --subnet-id $(aws ec2 describe-subnets --query 'Subnets[0].SubnetId' --output text)

# Wait for the instance to be running
aws ec2 wait instance-running --instance-ids $(aws ec2 describe-instances --query 'Reservations[0].Instances[0].InstanceId' --output text)

# Get the public IP of the instance
public_ip=$(aws ec2 describe-instances --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

# Print the public IP of the instance
echo $public_ip