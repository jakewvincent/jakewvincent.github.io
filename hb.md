---
title: Hummingbird tutorial
layout: default
updated: 2019-04-18
main-img: assets/images/black_walnut.png
main-img-title: Black Walnut, 2012
---

### Using UCSC's high-performance computational cluster (Hummingbird)

- There are lots of resources available at [hb.ucsc.edu](https://www.hb.ucsc.edu).
- You can find the slides from the s/lab presentation [here](/assets/documents/jwv_slab_hb.pdf), and a sample SLURM and R script below (which you can also download by clicking the links below.)

#### Sample SLURM script ([download with comments](/assets/documents/job.slurm))

{% highlight shell %}
#!/bin/bash
#SBATCH --nodes=1  
#SBATCH --partition=128x24  
#SBATCH --job-name=my_job  
#SBATCH --mail-type=ALL  
#SBATCH --mail-user=[your_user_name]@ucsc.edu  
#SBATCH --ntasks=1  
#SBATCH --output=%j.out  
#SBATCH --error=%j.err  
module load R/R-3.5.0  
R --no-save < script.R
{% endhighlight %}

#### Sample R script that saves an object as an RDS file that you can download [<a href="documents/script.R">download with comments</a>]

{% highlight r %}
r_object <- 1*1  
saveRDS(r_object, file = "test.rds")
{% endhighlight %}