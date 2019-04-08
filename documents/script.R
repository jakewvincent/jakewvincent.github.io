# This is an ordinary R script.
# If you have external data that you want to read in, make sure you've uploaded it to your directory on Hummingbird.

# Do a computation and make it an object in your R environment.
r_object <- 1*1

# Once your script has run successfully, your remote R session will be terminated. Make sure you don't lose any data that you want!
# You can print R objects using commands in your R script (as follows) and view the output in your output file.

print(r_object)

# You can also save R objects as RDS files that you can then download.
# Save RDS files using the saveRDS() function, part of base R.
# To save my object r_object, I'll direct the function to the object and tell R what to call the file.

saveRDS(r_object, file = "test.rds")

# This file will be saved in your hummingbird directory. You can then download it and load it into the R environment on your local computer using the readRDS() function.