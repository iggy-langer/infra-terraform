import os
from infra_terraform.terraform import Terraform

def main(working_directory, terraform_file):
    terraform = Terraform(working_directory, terraform_file)
    terraform.init()
    terraform.plan()
    terraform.apply()

if __name__ == '__main__':
    working_directory = '/path/to/working/directory'
    terraform_file = 'path/to/terraform/file/main.tf'
    main(working_directory, terraform_file)