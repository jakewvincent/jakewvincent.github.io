---
title: Editing your personal or academic website quickly with Git
author: Jake
keywords: git, post-receive hook, website
layout: post
---

At UCSC, personal websites can be hosted on the University's Unix servers (see ITS's [tutorial](https://its.ucsc.edu/web/hosting/personal-pages-tutorial.html) on setting up your web page). Setting up the website for the first time requires uploading all of your website files and folders to the public_html folder in your personal server space. This has to be done using an SFTP (secure file transfer protocol) client of some sort, either one with a GUI like FileZilla, or a command line tool. After the initial upload, updating your website requires uploading new versions of website file(s) using the SFTP client. In my experience, this is not the most streamlined process because after editing and saving the relevant parts of your website, you need to open up your SFTP client, cherry-pick the files you updated, and replace the remote files on the server. Below, I outline a process that allows you to update your website in a more streamlined fashion using [Git](https://en.wikipedia.org/wiki/Git). This process is more streamlined because it doesn't require you to pick out and replace the updated files. Git does that work for you.

Git is a version control system that was invented by Linus Torvalds, the inventor of Linux. Its purpose is to help people who write code (especially collaborative teams) keep track of the changes they make to their code. Each team member has a local copy of the repository (the codebase and its revision history; also called a *repo*), and when local changes are made to the repo, these changes are "pushed" to a remote location that each team member can access and "pull" to keep their local repo up to date.

While Git wasn't necessarily made for handling website updates, you can easily use it for this purpose. Here's how it work: you make changes to the local versions of your website files, you push these changes to a remote location (the web server), and remote users (website visitors) access these files (through their web browser). This is like a collaborative team using Git to track all the changes each team member is making, except it is not collaborative because your remote source files are read-only for your website visitors.

In the rest of this post, I will explain how to follow these steps in order to streamline your website update process:

1. Initialize a local Git repo
2. Initialize a Git repo in your server space that is separate from your public_html folder
3. Set up a post-receive hook to keep the files in your public_html folder updated while keeping your website's version history private
4. Make the server repo a remote repo for your local repo
5. Push your local website repo to the remote repo

To start using Git to keep your website up to date, you need to start two Git repos: one in the local directory where you store your website files, and one in your personal space on the server system where your website will be hosted. The repo is the place where Git keeps track of all the changes you make to your files in that folder. To start these repositories, you need to make sure Git is installed in both locations. To get it on your personal computer, check out [git-scm.org](https://git-scm.org). To see if it's installed on the server where your website is hosted, log into it via ssh, and from the command line enter *git --version*. If it's installed on the server, you should get back a message telling you what version of git is installed. If it's not installed on the server, contact whoever manages the server.

#### 1. Initialize a local Git repo

First start by opening your terminal application and navigating to the directory where you keep your website files (here, I'm assuming that this directory is called *website* and that it's in my home directory). Once there, initialize a Git repo, stage your website files using *add*, and commit them to the repo using *commit*, as shown below. If you are unfamiliar with these commands, check out [Git's documentation](https://git-scm.com/docs) or click the commands below to view their specific doc pages. You may be asked to set up an identity for yourself when you enter the *commit* command.

{% highlight shell %}
~/website$ git init  
~/website$ git add --all  
~/website$ git commit -m "Initial commit"
{% endhighlight %}

Now that you've started your local repo, you'll need to set up the repo on the server.

#### 2. Initialize a Git repo in your server space

Next, ssh into the server where your website is hosted. You'll want to keep your repo somewhere separate from your public_html directory. Let's say I want to make to make a directory called *git* where I'll keep the remote copy of my website repo. In my home directory, I'll make this folder, move into it, and initialize a bare repo called *website.git*.

{% highlight shell %}
~$ mkdir git  
~$ cd git  
~/git$ git init --bare website.git
{% endhighlight %}

#### 3. Set up a post-receive hook to keep the files in your public_html folder updated

Although we've now set up a repo on the server, we need to make sure that the various files that constitute your website find their way into the public_html folder so that your website remains up to date when you push the changes in your local repo to the server. This can be done with what's called a *post-receive hook*. It's a small bash script that Git runs whenever the server receives an update you've pushed, and what we want it to do is store the working files in your repo in the public_html folder and keep them up to date.

Make sure you're still logged in on the server via ssh. Inside your bare repository, you should have a folder called *hooks*. Using the following commands, navigate to it and create a file called "post-receive". You can do this using a text editor with a command line interface like nano or vim. The following assumes that you'll use nano.

{% highlight shell %}
~$ cd ~/git/website.git/hooks  
~/git/website.git/hooks$ nano post-receive
{% endhighlight %}

Once nano is running, you can start typing away. Type in (or copy and paste) the following, and once you've done that, press Ctrl+X to exit. You'll be asked if you want to save the file, and you'll need to type "Y" and hit Enter. Hit Enter again to confirm that you want to save. GIT_WORK_TREE and GIT_DIR are environment variables that git references. By setting your public_html folder as the work tree, git knows to store the most up-to-date files there, and when *git checkout -f* is run, git uses the information you've pushed to the repo on the server to update the files in the work tree. Depending on your exact server setup, you may need to change the paths in the *export* commands below.

{% highlight shell %}
\#!/bin/sh  
export GIT_WORK_TREE=~/public_html/  
export GIT_DIR=~/git/website.git/  
git checkout -f
{% endhighlight %}

Once you've saved the post-receive script, you need to make sure it has execute permissions. Make sure you're still in the directory where your post-receive script is located, and run the following *chmod* command (for "change mode").

{% highlight shell %}
~$ chmod -x post-receive
{% endhighlight %}

Before you can push your local repo to the server, you need to set it as a remote repo in your local setup.

#### 4. Make the server repo a remote repo for your local repo

Now that you have a local repo and have set up a bare repo on the server (including the post-receive hook), you need to tell Git where to push your local repo to. This is done with the *git remote* command. In your terminal application, navigate to your local website directory. To add a remote repo, use the following syntax: *git remote add &lt;name&gt; &lt;url&gt;*, where &lt;name&gt; is the name you'd like to use to refer to the remote repo and &lt;url&gt; is the location of your server space (probably including your user name, the server name, and the directory in your server space where you set up the bare repo). If I want to call the remote repo *ucsc*, if my user name is *user*, and if I'm setting this up on UCSC's Unix servers, I'd issue the following command. Once you've run this, you can run *git remote -v* to make sure you added the remote repo successfully.

{% highlight shell %}
~/website$ git remote add ucsc user@sftp.ic.ucsc.edu:~/git/website.git
{% endhighlight %}

Now you should be ready to push to the remote repo.

#### 5. Push your local website repo to the remote repo

If you've followed all the steps above, you should be able to push your local repo to the remote repo, and the post-receive hook you set up on the server side should put your website files in the public_html folder. Since you already staged and committed your website files to your local repo (using *add* and *commit*, respectively), all you need to do is enter a *push* command. To complete the push, you may have to say "yes" to storing a key, and enter the password you used to ssh into the server earlier. In the command below, I've used "ucsc" because that's what I named my remote, and I've used "master" because this is the default branch name in git.

{% highlight shell %}
~/website$ git push -u ucsc master
{% endhighlight %}

That's it! Now, whenever you need to update your website, all you have to do is edit whatever files you need to edit, save them, and then stage, commit, and push those changes. You can use your commit message to make a note to yourself about what exactly you changed in your files.

{% highlight shell %}
~/website$ git add --all  
~/website$ git commit -m "Updated xyz"  
~/website$ git push -u ucsc master
{% endhighlight %}