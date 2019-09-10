#!/bin/bash

#SBATCH --nodes=1						# Only use 1 node
#SBATCH --partition=128x24				# Use the 128GBx24core partition (most of the partitions are of this type)
#SBATCH --job-name=my_job
#SBATCH --mail-type=ALL               	# Mail events (can be NONE,BEGIN,END,FAIL,ALL)
#SBATCH --mail-user=[your_user_name]@ucsc.edu
#SBATCH --ntasks=1                    	# Number of cores (processors), in this case 1. Most R processes are only able to use one core at a time.
#SBATCH --output=%j.out 				# Standard output log will be given the same name as the job
#SBATCH --error=%j.err  				# Standard error log will be given the same name as the job

# Load the software you want to use into your environment
module load R/R-3.5.0

# Command that the scheduler will utter to run your script. Replace --no-save with --save if you want to save your R environment. script.R is the script you want to run.
R --no-save < script.R